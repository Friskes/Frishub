from django.contrib import messages
from django.utils.translation import gettext_lazy as _
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.debug import sensitive_post_parameters
from django.http import HttpResponseRedirect
from django.urls import reverse#, resolve
from django.core.handlers.asgi import ASGIRequest
from django.forms.utils import ErrorDict
from django.core.cache import cache

import main_app.tasks as tasks

from FriskesSite import settings


#############################################################################

class DataMixin:
    """#### """

    def __init__(self):
        # дефолтное время для всех сообщений которые идут в обход метода errors_handler
        self.toast_message_time = 4


    def get_context_data(self, *, object_list=None, **kwargs):
        """Добавляем в контекст шаблонов динамическое время отображения сообщений.
        Так же при открытии любой страницы, асинхронно с помощью celery task
        запрашиваем у twitch API актуальный список онлайн стримеров для,
        записи в кэш на 60сек. и передачи их количества в контекст. При дальнейших вызовах
        значение будет браться из кэша если он ещё существует без вызова twitch API."""

        self.request: ASGIRequest

        context: dict = super().get_context_data(**kwargs)

        context.update({'debug_mode': settings.DEBUG})

        context.update({'toast_message_time': self.toast_message_time})

        # сравниваю текущее имя представления с именем представления который указан в urls.py для StreamsView
        # resolve(self.request.path_info).view_name
        if self.request.resolver_match.view_name != 'streams':

            twitch_streams = cache.get('twitch_streams')
            if twitch_streams is None:
                twitch_stream_count = 0
                task_id = tasks.twitch_stream_count_task.delay().id
            else:
                twitch_stream_count = len(twitch_streams)
                task_id = ""
            context.update({
                'twitch_stream_count': twitch_stream_count,
                'twitch_stream_count_task_id': task_id
            })

        return context


    def errors_handler(self, form_errors: ErrorDict):
        """Обработчик ошибок формы, разбивает ошибки для читаемого вида в одну строку,
        подсчитывает количество символов в строке для определения
        времени отображения сообщения и выводит сообщение с ошибками."""

        # for key, value in list(form_errors.items()):
        #     for error in value:
        #         messages.warning(request, error)

        all_errors = ''
        count = 0

        for field in form_errors:
            error = form_errors[field].as_text()

            if field == 'captcha':
                error = _('* Поле reCAPTCHA является обязательным для заполнения.')

            if count == 0:
                all_errors += error
            else:
                all_errors += '\n' + error
            count += 1


        self.toast_message_time = round(len(all_errors) / 10)

        error = all_errors.replace('\n', '<br><br>').replace('*', '⚠️')
        messages.warning(self.request, error)

#############################################################################

class RedirectAuthUser:
    """#### Класс перенаправления авторизованных пользователей на страницу указанную в свойстве:
    >>> redirect_auth_user_url"""

    redirect_auth_user_url = None

    @method_decorator(sensitive_post_parameters())
    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def dispatch(self, request: ASGIRequest, *args, **kwargs):

        if self.redirect_auth_user_url and request.user.is_authenticated:

            return HttpResponseRedirect(reverse(self.redirect_auth_user_url))

        return super().dispatch(request, *args, **kwargs)

#############################################################################
