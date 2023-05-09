from django.utils.translation import gettext_lazy as _
from django.shortcuts import redirect, render, get_object_or_404
from django.contrib.auth import login
# from django.contrib.auth.models import User
# from .models import CustomUserProfile
from .models import CustomUser, HomeNews, Comments, Guides, Category, LikeDislike
from django.urls import reverse_lazy
from django.contrib.auth.views import (
    LoginView, LogoutView, PasswordResetView,
    PasswordResetConfirmView, PasswordChangeView,
    PasswordResetDoneView, PasswordResetCompleteView
)
from .utils import DataMixin, RedirectAuthUser
from django.views.generic import CreateView, FormView, ListView, DetailView, View
from django.views.generic.base import TemplateView
from .forms import (
    RegisterForm, LoginForm, PasswordResetCustomForm, PasswordResetConfirmForm,
    ContactMeForm, AccountSettingsForm, PasswordChangeCustomForm, AccountEmailForm,
    CommentsForm
)
from django.http import JsonResponse, HttpResponse
from math import floor
from django.contrib.auth.mixins import LoginRequiredMixin
# https://django.fun/ru/docs/django/4.0/ref/contrib/messages/
from django.contrib import messages
# from django.utils import dateformat
# from django.core.files.storage import FileSystemStorage
from django.core.mail import send_mail
from FriskesSite import settings
from .parse_twitch_streams import twitch_stream_parser
import json
from typing import Union
from django.contrib.contenttypes.models import ContentType
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from uuid import uuid4
import urllib.parse
from django.core.handlers.asgi import ASGIRequest
from django.core.cache import cache

# Create your views here.

#############################################################################

# class TestView(TemplateView):

#     # метод dispatch срабатывает перед отправкой ответа клиенту
#     def dispatch(self, request, *args, **kwargs):
#         response = super().dispatch(request, *args, **kwargs)
#         response.set_cookie(key='my_key', value='my_value') # добавление cookies в ответ
#         # response.delete_cookie(key='my_key') # удаление cookies из ответа
#         return response


#     # метод render_to_response срабатывает перед отправкой ответа клиенту
#     def render_to_response(self, context, **response_kwargs):
#         response = super(StreamsView, self).render_to_response(context, **response_kwargs)
#         response.set_cookie(key='my_key', value='my_value') # добавление cookies в ответ
#         # response.delete_cookie(key='my_key') # удаление cookies из ответа
#         return response


#     def post(self, request, *args, **kwargs):
#         response = super().post(request, *args, **kwargs)
#         response.set_cookie(key='my_key', value='my_value') # добавление cookies в ответ
#         # response.delete_cookie(key='my_key') # удаление cookies из ответа
#         return response


#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['response'].set_cookie(key='my_key', value='my_value') # добавление cookies в ответ
#         # context['response'].delete_cookie(key='my_key') # удаление cookies из ответа
#         return context

#############################################################################

class HomeView(DataMixin, TemplateView):

    template_name = 'main_app/home.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)

        home_news = HomeNews.objects.all()
        context.update({'home_news': home_news})

        return context

#############################################################################

# https://django.fun/docs/django/ru/4.0/topics/class-based-views/
# https://docs.djangoproject.com/en/4.1/topics/class-based-views/
# https://django.fun/docs/django/ru/4.0/ref/class-based-views/
# https://docs.djangoproject.com/en/4.1/topics/pagination/
# https://docs.djangoproject.com/en/4.1/ref/paginator/
class GuidesListView(DataMixin, ListView):
    # в классе ListView уже встроена пагинация
    # При использовании класса ListView в шаблон автоматически передаётся объект paginator и page_obj
    paginate_by: int = 99 # определяем свойство в котором указываем макс количество элементов на одной странице

    model = Guides

    template_name = 'main_app/guides_list.html'

    # указываем кастомное название переменной которая будет представлять из себя объект экземпляра модели Guides
    context_object_name = 'guides' # по дефолту 'object_list'

    def get_queryset(self):
        """Возвращаем в шаблон только опубликованные гайды из модели Guides
        для пользователей которые не являются админами.
        - Для админов возвращаем все гайды без сортировки."""

        # Метод select_related служит для того что бы сделать <жадную> (полную) загрузку данных.

        # До указания метода, при запросе бралась лишь часть необходимых данных и в дальнейшем
        # происходило множество побочных SQL запросов для получения дополнительных данных.

        # параметр 'category' указан потому что category это поле из модели Guides
        # которое является внешним ключём (ForeignKey), он связывает вторичную модель
        # Guides с первичной моделью Category

        if self.request.user.is_superuser:
            return Guides.objects.filter().select_related('category')
        else:
            return Guides.objects.filter(is_published=True).select_related('category')

#############################################################################

class GuideView(DataMixin, FormView, DetailView):

    form_class = CommentsForm

    model = Guides

    template_name = 'main_app/guide.html'

    # имя 'guide_slug' равно тому что написано в маршруте в urls.py
    slug_url_kwarg: str = 'guide_slug' # по дефолту 'slug'

    context_object_name = 'guide'

    def form_valid(self, form):
        """Сохраняем валидный комментарий пользователя в БД."""

        data = form.cleaned_data
        slug = self.request.META.get('PATH_INFO').split('/')[-2]
        guide = Guides.objects.get(slug=slug)

        mptt_comments = Comments(guide=guide, author=self.request.user, parent=data['parent'], content=data['content'])
        mptt_comments.save()

        return super(GuideView, self).form_valid(form)


    def get_success_url(self):
        slug = self.request.META.get('PATH_INFO').split('/')[-2]
        return reverse_lazy('guide', kwargs={'guide_slug': slug})


    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)

        if self.request.user.is_superuser:
            guide = Guides.objects.get(slug=self.kwargs['guide_slug'])
        else:
            guide = get_object_or_404(Guides, slug=self.kwargs['guide_slug'], is_published=True)

        # При использовании связанной модели MPTTModel в шаблон автоматически передаётся
        # объект node являющийся экземпляром модели Comments и объект children
        comments_set = guide.comments.filter(is_published=True)

        page = self.request.GET.get('page', 1)
        paginator = Paginator(comments_set, 999)

        try:
            comments = paginator.page(page)
        except PageNotAnInteger:
            comments = paginator.page(1)
        except EmptyPage:
            comments = paginator.page(paginator.num_pages)

        context.update({'guide': guide,
                        'comments': comments,
                        'comments_set': comments_set,
                        })

        return context

#############################################################################

class VotesView(View):

    model = None # Модель данных которая передаётся из urls.py
    vote_type = None # Тип оценки которая передаётся из urls.py

    def post(self, request: ASGIRequest, pk):

        # GenericForeignKey не поддерживает метод get_or_create
        obj: Union[Guides, Comments] = self.model.objects.get(pk=pk)

        try:
            likedislike: LikeDislike = LikeDislike.objects.get(content_type=ContentType.objects.get_for_model(obj), object_id=obj.id, user=request.user)
            if likedislike.vote is not self.vote_type:
                likedislike.vote = self.vote_type
                likedislike.save(update_fields=['vote'])
            else:
                likedislike.delete()

        except LikeDislike.DoesNotExist:
            obj.votes.create(user=request.user, vote=self.vote_type)

        return HttpResponse(
            json.dumps({
                "like_count": obj.votes.likes().count(),
                "dislike_count": obj.votes.dislikes().count(),
            }),
            content_type="application/json"
        )

#############################################################################

class FilteringGuidesView(DataMixin, ListView):

    paginate_by: int = 99

    model = Guides

    template_name = 'main_app/guides_list.html'

    context_object_name = 'guides'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)

        category = Category.objects.get(slug=self.kwargs['category_slug'])
        context.update({'category_selected': category.pk})

        return context


    def get_queryset(self):
        """Возвращаем в шаблон только опубликованные гайды с категорий выбранной пользователем."""

        # Обращаемся из вторичной модели Guides через поле category которое ссылается
        # на первичную модель которая содержит поле slug и берём все записи
        # у которых slug равен переданному слагу из html шаблона
        # category__slug == <название-поля-вторичной-модели-которое-ссылается-на-первичную-модель>__<название-поля-первичной-модели>
        # print(Guides.objects.filter(category__slug='pevicy'))
        # # похожий синтаксис для примера:
        # print(Guides.objects.filter(category__name='Певицы'))
        # print(Guides.objects.filter(category__id=2))
        # print(Guides.objects.filter(category__in=[2]))
        # # можно применить фильтр к названиям категорий заканчивающимся на 'сы'
        # print(Guides.objects.filter(category__name__endswith='сы'))

        # ключ для kwargs 'category_slug' равен тому что написано в маршруте в urls.py
        if self.request.user.is_superuser:
            return Guides.objects.filter(category__slug=self.kwargs['category_slug']).select_related('category')
        else:
            return Guides.objects.filter(category__slug=self.kwargs['category_slug'], is_published=True).select_related('category')

#############################################################################

class GameChatView(DataMixin, TemplateView):

    template_name = 'main_app/game_chat.html'

#############################################################################

class DevChatView(DataMixin, View):
    """- Представление которое генерирует uuid4
    и использует его для создания уникального url адреса для веб-сокет комнаты."""

    def get(self, request, *args, **kwargs):
        self.object = None

        return redirect('dev_chat_room', uuid4())

#############################################################################

class DevChatRoomView(DataMixin, TemplateView):

    template_name = 'main_app/dev_chat_room.html'

#############################################################################

class StreamsView(DataMixin, TemplateView):

    template_name = 'main_app/streams.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        """- Запрашиваем у twitch API актуальный список онлайн стримеров,
        записываем в сессию актуальное количество онлайн стримеров для того
        чтобы другие страницы могли использовать обновлённые данные,
        так же передаём актуальное количество стримеров в шаблон.
        - Получаем выбранные пользователем игровые классы из файла куки,
        если у пользователя выбран хотя бы один класс, отправляем эти данные
        в метод фильтрации, либо отдаём список в шаблон без фильтрации."""

        context = super().get_context_data(**kwargs)

        twitch_streams = twitch_stream_parser.get_twitch_stream_data()
        twitch_stream_count = len(twitch_streams)

        # обновляем актуальную информацию о количестве стримеров для всех страниц (без учёта фильтрации)
        cache.set('twitch_stream_count', twitch_stream_count, 120) # секунды

        # получение cookies из запроса
        encoded_text_data: str = self.request.COOKIES.get('game_classes_selected_data')

        if encoded_text_data and len(encoded_text_data) > 2:
            decoded_text_data: str = urllib.parse.unquote(encoded_text_data, encoding='utf-8') # .replace('%22','"').replace('%2C',',')
            game_classes = json.loads(decoded_text_data)

            twitch_streams = self.filter_streams(game_classes, twitch_streams)

        context.update({'twitch_stream_count': twitch_stream_count, 'twitch_streams': twitch_streams})

        return context


    def post(self, request: ASGIRequest, *args, **kwargs):
        """Получаем выбранные пользователем игровые классы,
        запрашиваем у twitch API актуальный список онлайн стримеров
        и передаём эти данные в метод фильтрации если пользователь выбрал
        хотя бы один класс, либо отдаём список в шаблон без фильтрации."""

        self.object = None

        game_classes = request.POST.keys()

        twitch_streams = twitch_stream_parser.get_twitch_stream_data()

        if len(game_classes) == 0:
            context = {'twitch_streams': twitch_streams}
        else:
            filtered_twitch_streams = self.filter_streams(game_classes, twitch_streams)

            context = {'twitch_streams': filtered_twitch_streams}

        # передаём в ответ ajax полностью отрендеренный кусок html кода с новым контекстом и заменяем им старый код
        return render(request, template_name='main_app/streams_container.html', context=context)


    def filter_streams(self, game_classes: dict, twitch_streams: dict) -> list:
        """Отфильтровываем стримеров по их игровому классу"""

        filtered_twitch_streams = []

        for game_class in game_classes:

            for stream in twitch_streams:

                if stream.get('game_classes').get(game_class):
                    filtered_twitch_streams.append(stream)

        return filtered_twitch_streams

#############################################################################

class ArenaPointCalculatorView(DataMixin, TemplateView):

    template_name = 'main_app/ap_calculator.html'

    def calculate_arena_points(self, bracket: str, rating: Union[str, int], server_type: bool) -> int:
        """Рассчитываем по формуле количество очков арены которое игрок
        получит за рейтинг в указанном брекете на выбранном сервере."""

        if rating == '0': return 0
        rating = int(rating)

        if server_type:
            if rating <= 1500:
                points = 0.22 * rating + 14
            elif rating > 1500:
                points = 1511.26 / (1 + 1639.28 * (2.71828 ** (-0.00412 * rating)))
        else:
            if rating >= 150:
                points = 1022 / (1 + 123 * (2.71828 ** (-0.00412 * rating))) + 580
            elif rating <= 150:
                return 0

        if bracket == 'bracket2x2':
            points *= 0.76
        elif bracket == 'bracket3x3':
            points *= 0.88

        if server_type:
            return floor(points)
        else:
            return round(points)


    def post(self, request: ASGIRequest, *args, **kwargs):
        """- Получаем рейтинг с названием брекета и выбранный сервер
        от пользователя и передаём в метод расчёта очков арены.
        - Затем возвращаем результат в шаблон в json формате
        который примет ajax скрипт."""

        self.object = None

        data = {}
        for key, value in request.POST.items():
            if key == 'server_type':
                continue
            server_type = json.loads(request.POST.get('server_type'))

            points = self.calculate_arena_points(bracket=key,
                                                 rating=value,
                                                 server_type=server_type)
            data.update({key: points})

        return JsonResponse(data)

#############################################################################
################################ Авторизация ################################
#############################################################################

class RegisterView(DataMixin, RedirectAuthUser, CreateView):

    redirect_auth_user_url = 'home'

    form_class = RegisterForm

    template_name: str = 'auth/register.html'

    def get_success_url(self):
        """При прохождении валидации формы, автоматически входим в аккаунт
        по данным указанным при регистрации, и выводим сообщение."""

        login(self.request, user=self.object)

        username = self.request.user.get_username()
        messages.success(self.request, username + _(', вы успешно зарегистрированы в системе!'))

        return reverse_lazy('account')


    # При попытке просмотреть ошибки, в методе post с помощью form.errors или form.is_valid()
    # запрос на проверку reCAPTCHA отправлялся 2 раза подряд, что ломало прохождение капчи.
    # Метод form_invalid отрабатывает уже после метода проверки капчи clean() в классе ReCaptchaField
    # и не вызывает дублирование запроса к google API.
    def form_invalid(self, form):
        self.errors_handler(form.errors)

        return self.render_to_response(self.get_context_data(form=form))

#############################################################################

class TermsOfUseView(DataMixin, TemplateView):

    template_name = 'auth/terms_of_use.html'

#############################################################################

class LoginCustomView(DataMixin, RedirectAuthUser, LoginView):

    redirect_auth_user_url = 'home'

    form_class = LoginForm

    template_name = 'auth/login.html'

    def get_success_url(self):

        username = self.request.user.get_username()
        messages.success(self.request, _('Добро пожаловать, ') + username + '!')
        return reverse_lazy('account')


    def form_valid(self, form):
        """Если пользователь не указал в форме флаг <запомнить меня>
        запоминаем его в системе на одну сессию до закрытия браузера."""

        remember_me = form.cleaned_data.get('remember_me')
        if not remember_me:
            # https://docs.djangoproject.com/en/4.2/topics/http/sessions/
            # https://developer.mozilla.org/ru/docs/Learn/Server-side/Django/Sessions
            # по дефолту время жизни SESSION_COOKIE_AGE составляет 2 недели (1209600 секунд)
            # но если пользователь при входе в аккаунт не активировал флаг 'remember_me'
            # мы запоминаем его до первого выхода из браузера
            self.request.session.set_expiry(0)

        return super(LoginCustomView, self).form_valid(form)


    def form_invalid(self, form):
        self.errors_handler(form.errors)

        return self.render_to_response(self.get_context_data(form=form))

#############################################################################

class LogoutCustomView(DataMixin, LoginRequiredMixin, LogoutView):

    login_url = reverse_lazy('home')

    def get(self, request, *args, **kwargs):
        self.object = None

        self.username = request.user.get_username()

        return super().get(request, *args, **kwargs)


    def get_success_url(self):
        messages.success(self.request, _('До скорой встречи, ') + self.username + '!')

        return reverse_lazy('home')

#############################################################################

class PasswordResetCustomView1(DataMixin, RedirectAuthUser, PasswordResetView):

    redirect_auth_user_url = 'home'

    form_class = PasswordResetCustomForm

    template_name = 'auth/password_reset1.html'

    def get_success_url(self):
        messages.info(self.request, _('Письмо успешно отправлено.'))
        return reverse_lazy('password_reset2')


    def form_invalid(self, form):
        self.errors_handler(form.errors)

        return self.render_to_response(self.get_context_data(form=form))


    def form_valid(self, form):
        """Сохраняем адрес электронной почты в сессию (до первого выхода из браузера) для повторного
        использования в дублирующем представлении по отправке почты."""

        email = form.cleaned_data.get('email')

        self.request.session.set_expiry(0)
        self.request.session['email'] = email

        return super(PasswordResetCustomView1, self).form_valid(form)

#############################################################################

class PasswordResetCustomView2(DataMixin, RedirectAuthUser, PasswordResetView):

    redirect_auth_user_url = 'home'

    template_name = 'auth/password_reset2.html'

    def get_success_url(self):
        messages.info(self.request, _('Письмо успешно отправлено.'))
        return reverse_lazy('password_reset_done')


    def get(self, request, *args, **kwargs):
        """Если пользователь пытается зайти на страницу для повторной отправки почты
        не использовав перед этим первую страницу, перенаправляем его на первую."""

        self.object = None

        if not 'email' in request.session.keys():
            return redirect('password_reset1')

        return super().get(request, *args, **kwargs)


    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)

        email = self.request.session.get('email')
        context.update({'email_value': email})

        return context

#############################################################################

class PasswordResetDoneCustomView(DataMixin, RedirectAuthUser, PasswordResetDoneView):

    redirect_auth_user_url = 'home'

    template_name = 'auth/password_reset_done.html'

#############################################################################

# https://docs.djangoproject.com/en/4.1/topics/auth/default/
class PasswordResetConfirmCustomView(DataMixin, RedirectAuthUser, PasswordResetConfirmView):

    redirect_auth_user_url = 'home'

    form_class = PasswordResetConfirmForm

    template_name='auth/password_reset_confirm.html'

    # автоматическая аутентификация пользователя после успешного сброса пароля
    # post_reset_login = True

    def get_success_url(self):
        messages.success(self.request, _('Новый пароль успешно сохранён!'))
        return reverse_lazy('password_reset_complete')


    def form_invalid(self, form):
        self.errors_handler(form.errors)

        return self.render_to_response(self.get_context_data(form=form))

#############################################################################

class PasswordResetCompleteCustomView(DataMixin, RedirectAuthUser, PasswordResetCompleteView):

    redirect_auth_user_url = 'home'

    template_name = 'auth/password_reset_complete.html'

#############################################################################

class ContactMeView(DataMixin, CreateView):

    form_class = ContactMeForm

    template_name = 'auth/contact_me.html'

    def get_success_url(self):
        messages.success(self.request, _('Сообщение успешно отправлено!'))
        return reverse_lazy('contact_me')


    def form_valid(self, form):
        """При отправке пользователем формы обратной связи,
        отправляем сами себе с серверной почты на серверную почту
        сообщение с содержанием заполненным пользователем."""

        data = form.data
        user_email = data["email"]
        message_head = f'Сообщение с формы обратной связи сайта frishub.ru от отправителя: {user_email}'
        message_body = data['message']

        # функция работы с почтой встроенная в django
        send_mail(
            subject=message_head, # Тема сообщения
            message=message_body, # Содержание сообщения
            from_email=settings.EMAIL_HOST_USER, # Наша серверная почта
            recipient_list=[settings.EMAIL_HOST_USER], # Список получателей сообщения
        )
        return super(ContactMeView, self).form_valid(form)


    def form_invalid(self, form):
        self.errors_handler(form.errors)

        return self.render_to_response(self.get_context_data(form=form))

#############################################################################
################################## Аккаунт ##################################
#############################################################################

class AccountView(DataMixin, LoginRequiredMixin, TemplateView):

    login_url = reverse_lazy('home')

    template_name: str = 'account/account.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)

        server_email = settings.EMAIL_HOST_USER
        context.update({'server_email': server_email})

        return context

#############################################################################

class AccountSettingsView(DataMixin, LoginRequiredMixin, FormView):

    login_url = reverse_lazy('home')

    form_class = AccountSettingsForm
    template_name: str = 'account/account_settings.html'

    # https://docs.djangoproject.com/en/4.1/topics/forms/modelforms/#providing-initial-values
    # передача value в поле формы по его имени
    # initial = {'first_name': 'Арсений'}

    def get_success_url(self):
        messages.success(self.request, _('Настройки успешно сохранены!'))
        return reverse_lazy('account_settings')


    def get(self, request, *args, **kwargs):
        """При входе на страницу настроек учётной записи, автоматически
        заполняем поля, информацией которую пользователь указывал ранее."""

        self.object = None

        self.initial = {'first_name': request.user.first_name, 'last_name': request.user.last_name,
                        'birth_date': request.user.birth_date, 'gender': request.user.gender,
                        'game_class': request.user.game_class, 'discord_username': request.user.discord_username,
                        'battlenet_username': request.user.battlenet_username, 'twitch_link': request.user.twitch_link}

        return super().get(request, *args, **kwargs)


    # [Оставил метод для примера]
    def post(self, request, *args, **kwargs):
        self.object = None
        # метод getlist() возвращает данные в формате списка
        # print(request.POST.getlist('game_class'))
        return super().post(request, *args, **kwargs)


    def form_invalid(self, form):
        self.errors_handler(form.errors)

        return self.render_to_response(self.get_context_data(form=form))


    # [Оставил метод для примера] Ручное формирование даты/времени и передача в виде контекста
    # def get_context_data(self, *, object_list=None, **kwargs):
    #     context = super().get_context_data(**kwargs)

    #     # https://pythobyte.com/how-to-format-dates-in-python-96950/
    #     # python_dt_format = "%d(%A).%m(%B).%Y | %H:%M:%S"
    #     # date_joined = self.request.user.date_joined.strftime(python_dt_format)

    #     # https://docs.djangoproject.com/en/4.1/ref/templates/builtins/#std:templatefilter-date
    #     # django_dt_format = "d(l).m(E).Y | H:i:s"
    #     django_dt_format = "d.m(E).Y"
    #     date_joined = dateformat.format(self.request.user.date_joined, django_dt_format).title()

    #     context.update({'date_joined': date_joined})

    #     return context


    # [Оставил метод для примера], его заменяет метод delete()
    # def delete_avatar_file(self):
        # если был загружен новый файл аватара, или пришла команда на удаление текущего аватара
        # удаляем текущий файл аватара, для того чтобы не засорять память на сервере
        # if self.request.FILES or self.request.POST.get('DELETE_AVATAR'):
        #     fss = FileSystemStorage()
        #     old_file_path = self.request.user.avatar.name
        #     # exists возвращает True если путь равен пустой строке ''
        #     # поэтому надо исключить подобный сценарий
        #     if old_file_path != '' and fss.exists(old_file_path):
        #         fss.delete(old_file_path)


    def form_valid(self, form):
        """- Если пользователь загрузил новое изображение, сохраняем его и записываем путь к нему в БД.
        - Если пользователь нажал кнопку удалить старое изображение, удаляем его и путь к нему из БД."""

        # удаляю файл изображения перед сохранением формы
        # т.к. при сохранении формы в хранилище сохраняется файл
        delete_avatar = self.request.POST.get('DELETE_AVATAR')

        if self.request.FILES or delete_avatar:
            # метод delete() у класса ImageFieldFile удаляет текущий файл из хранилища
            self.request.user.avatar.delete()

        # self.delete_avatar_file()

        # указываем пользователя в форме в параметре instance для того что бы
        # перезаписать поля у текущего пользователя а не создавать нового пользователя
        form = AccountSettingsForm(self.request.POST,
                                                self.request.FILES,
                                                instance=self.request.user)
        form.save()

        if delete_avatar:
            # стираю путь к изображению из БД после сохранения формы
            # т.к. при сохранении формы в БД записывается путь
            self.request.user.avatar = ''

            messages.success(self.request, _('Изображение успешно удалено.'))
            return redirect('account_settings')

        return super(AccountSettingsView, self).form_valid(form)

#############################################################################

class PasswordChangeCustomView(DataMixin, LoginRequiredMixin, PasswordChangeView):

    login_url = reverse_lazy('home')

    form_class = PasswordChangeCustomForm
    template_name: str = 'account/account_password.html'

    def get_success_url(self):
        messages.success(self.request, _('Новый пароль успешно сохранён!'))
        return reverse_lazy('account')


    def form_invalid(self, form):
        self.errors_handler(form.errors)

        return self.render_to_response(self.get_context_data(form=form))

#############################################################################

class AccountEmailView(DataMixin, LoginRequiredMixin, FormView):

    login_url = reverse_lazy('home')

    form_class = AccountEmailForm
    template_name: str = 'account/account_email.html'

    def get_success_url(self):
        messages.success(self.request, _('Новый почтовый адрес успешно сохранён!'))
        return reverse_lazy('account')


    def form_invalid(self, form):
        self.errors_handler(form.errors)

        return self.render_to_response(self.get_context_data(form=form))


    def form_valid(self, form):
        """Перезаписываем новый адрес электронной почты в БД."""

        old_email = self.request.user.email
        new_email = form.cleaned_data.get('new_email')

        user_obj = CustomUser.objects.filter(email=old_email)
        user_obj.update(email=new_email)

        return super(AccountEmailView, self).form_valid(form)

#############################################################################

class AccountDeleteView(DataMixin, LoginRequiredMixin, TemplateView):

    login_url = reverse_lazy('home')

    template_name: str = 'account/account_delete.html'

    def post(self, request: ASGIRequest, *args, **kwargs):
        """Удаляем поле пользователя из БД, перенаправляем на домашнюю страницу и выводим сообщение."""

        self.object = None
        context = self.get_context_data(**kwargs)

        if request.POST.get('DELETE_ACCOUNT'):
            username = request.user.username
            user_obj = CustomUser.objects.get(username=username)
            user_obj.delete()
            messages.info(request, username + _(', очень жаль что вы от нас уходите. ') + '&#128575;')
            return redirect('home')

        return self.render_to_response(context)

#############################################################################
