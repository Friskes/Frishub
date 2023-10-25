from __future__ import annotations

from django.utils.translation import gettext_lazy as _
from django.shortcuts import redirect, render, get_object_or_404
from django.contrib.auth import login
from django.urls import reverse_lazy, reverse
from django.views.generic import CreateView, FormView, ListView, DetailView, View
from django.views.generic.base import TemplateView
from django.http import (
    JsonResponse, HttpResponse, Http404,
    HttpResponseRedirect, HttpResponsePermanentRedirect
)
from django.contrib.auth.mixins import LoginRequiredMixin
# https://django.fun/ru/docs/django/4.0/ref/contrib/messages/
from django.contrib import messages
from django.utils import timezone#, dateformat
# from django.core.files.storage import FileSystemStorage
from django.contrib.contenttypes.models import ContentType
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.handlers.asgi import ASGIRequest
from django.core.exceptions import BadRequest, PermissionDenied
from django.views.decorators.csrf import csrf_exempt
from django.db.models.query import QuerySet
# from django.contrib.auth.models import User
from django.contrib.auth.views import (
    LoginView, LogoutView, PasswordResetView,
    PasswordResetConfirmView, PasswordChangeView,
    PasswordResetDoneView, PasswordResetCompleteView
)

# pip install django-proxy
from proxy.views import proxy_view

import main_app.tasks as tasks
from main_app.utils import DataMixin, RedirectAuthUser
from main_app.models import (
    CustomUser, HomeNews, Comments, Guides,
    Category, LikeDislike, DressingRoom, Notification
)
from main_app.services.calculate_arena_points import get_arena_points
from main_app.services.streams_context import get_streams_context, get_game_classes_from_cookie
from main_app.forms import (
    RegisterForm, LoginForm, PasswordResetCustomForm, PasswordResetConfirmForm,
    ContactMeForm, AccountSettingsForm, PasswordChangeCustomForm, AccountEmailForm,
    CommentsForm
)

from notifications.signals import notify

from FriskesSite import settings
from FriskesSite.env import CELERY_FLOWER_ADDRESS, CELERY_FLOWER_PORT, CELERY_FLOWER_URL_PREFIX

from celery.result import AsyncResult

import json
from typing import Any, Union, Dict, List, Tuple
from uuid import uuid4
import datetime as dt
import requests
from os.path import exists, isfile
from pathlib import Path

import logging
log = logging.getLogger(__name__)


# Create your views here.

#############################################################################

# https://stackoverflow.com/a/75329234/19276507
@csrf_exempt
def flower_proxy_view(request: ASGIRequest, path: str):
    """Представление позволяющее открывать панель flower
    как обычную страницу django (только для супер пользователя)."""

    if not request.user.is_superuser: raise PermissionDenied
    return proxy_view(
        request,
        f"http://{CELERY_FLOWER_ADDRESS}:{CELERY_FLOWER_PORT}/{CELERY_FLOWER_URL_PREFIX}/{path}",
        {}
    )

#############################################################################

def bad_request(request, exception):
    """Обработка ошибки 400"""

    error_message = _('Сервер не смог понять некорректный запрос.')
    if type(exception) is BadRequest and str(exception):
        error_message = str(exception)

    return render(request=request, template_name='errors/error_page.html', status=400, context={
        'code': 400,
        'title': _('Неверный запрос.'),
        'error_message': error_message
    })


def permission_denied(request, exception):
    """Обработка ошибки 403"""

    error_message = _('Доступ к этой странице запрещён или ограничен по ряду причин.')
    if type(exception) is PermissionDenied and str(exception):
        error_message = str(exception)

    return render(request=request, template_name='errors/error_page.html', status=403, context={
        'code': 403,
        'title': _('Отказано в доступе.'),
        'error_message': error_message
    })


def page_not_found(request, exception):
    """Обработка ошибки 404"""

    error_message = _('К сожалению страница не существует, либо была перемещена.')
    if type(exception) is Http404 and str(exception):
        error_message = str(exception)

    return render(request=request, template_name='errors/error_page.html', status=404, context={
        'code': 404,
        'title': _('Страница не найдена.'),
        'error_message': error_message
    })


def server_error(request):
    """Обработка ошибки 500"""

    return render(request=request, template_name='errors/error_page.html', status=500, context={
        'code': 500,
        'title': _('Внутренняя ошибка сервера.'),
        'error_message': _('Внутренняя ошибка сайта, вернитесь на главную страницу, \
            отчёт об ошибке уже направлен администрации сайта.')
    })

#############################################################################

# [Оставил класс для примера]
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

#############################################################################

class HomeView(DataMixin, TemplateView):
    """#### Представление обрабатывающее домашнюю страницу."""

    template_name = 'main_app/home.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)

        home_news = HomeNews.objects.all()
        context.update({'home_news': home_news})

        return context

#############################################################################

class ZamimgProxyView(View):
    def get(self, request, *args, **kwargs):
        """Проксирует запрос к zamimg API через этот сервер,
        т.к. zamimg сервер не установил Cross-Origin Resource Sharing заголовки,
        для возможности отправки запроса со стороны клиента используя JavaScript.
        https://developer.mozilla.org/ru/docs/Web/HTTP/CORS
        И кэширует файлы локально для уменьшения трассы запроса и ускорения работы."""

        STATIC_ROOT = settings.BASE_DIR / 'static'
        full_path = f'{STATIC_ROOT}/main_app/json/modelviewer/{kwargs.get("modelviewer_path")}'

        # if not isfile(full_path):
        if not exists(full_path):

            headers_get = {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
                    AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
            }
            zamimg_url = f'https://wow.zamimg.com/modelviewer/{kwargs.get("modelviewer_path")}'

            response = requests.get(zamimg_url, headers=headers_get, timeout=5)

            path_to_file, file_name = full_path.rsplit('/', maxsplit=1)
            path_obj = Path(path_to_file)
            path_obj.mkdir(parents=True, exist_ok=True)

            with open(f'{path_to_file}/{file_name}', 'wb+') as file:
                file.write(response.content)
            return HttpResponse(response.content)

        with open(full_path, 'rb') as file:
            return HttpResponse(file.read())

#############################################################################

# https://django.fun/docs/django/ru/4.0/topics/class-based-views/
# https://docs.djangoproject.com/en/4.1/topics/class-based-views/
# https://django.fun/docs/django/ru/4.0/ref/class-based-views/
# https://docs.djangoproject.com/en/4.1/topics/pagination/
# https://docs.djangoproject.com/en/4.1/ref/paginator/
class GuidesListView(DataMixin, ListView):
    """#### Представление обрабатывающее страницу списка гайдов."""

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

        if self.request.user.is_superuser or self.request.user.is_staff:
            return Guides.objects.all()

        return Guides.objects.filter(is_published=True)

#############################################################################

class GuideView(DataMixin, FormView, DetailView):
    """#### Представление обрабатывающее страницу гайда."""

    form_class = CommentsForm

    model = Guides

    template_name = 'main_app/guide.html'

    # имя 'guide_slug' равно тому что написано в маршруте в urls.py
    slug_url_kwarg: str = 'guide_slug' # по дефолту 'slug'

    context_object_name = 'guide'

    def post(self, request, *args, **kwargs):
        """Снимает с публикации переданный комментарий если он не является главным родителем
        если является тогда снимает с публикации переданный комментарий и всех его детей."""

        # print(dict(request.POST.items())) # возвращает данные в формате словаря
        # print(request.POST.getlist('unpublication')) # возвращает данные в формате списка
        node_id = request.POST.get('unpublication')

        if not node_id:
            return super().post(request, *args, **kwargs)

        if not request.user.is_superuser: raise PermissionDenied

        mptt_comment: Comments = Comments.objects.get(pk=node_id)

        if not mptt_comment.parent:
            for children_comment in mptt_comment.get_descendants(include_self=True):
                children_comment.is_published = False
                children_comment.save()
        else:
            mptt_comment.is_published = False
            mptt_comment.save()

        # Пропускаем проверку формы на инвалидность тем самым
        # при перезагрузке браузера не получаем повторную отправку формы
        return HttpResponsePermanentRedirect(
            reverse('guide', kwargs={'guide_slug': kwargs['guide_slug']})
        )


    def form_valid(self, form):
        """Сохраняем валидный комментарий пользователя в БД."""

        data = form.cleaned_data
        slug = self.request.META.get('PATH_INFO').split('/')[-2]
        guide = Guides.objects.get(slug=slug)

        mptt_comments = Comments(
            guide=guide,
            author=self.request.user,
            parent=data['parent'],
            content=data['content']
        )
        mptt_comments.save()

        self._send_notify(data, mptt_comments.pk, guide)

        return super(GuideView, self).form_valid(form)


    def _send_notify(self, data, comment_pk, guide: Guides):
        """Отправляет уведомление пользователю которому ответили на комментарий."""

        if not data['parent']: return
        # Если это ответ на комментарий тогда отправляем уведомление адресату

        recipient_user = CustomUser.objects.get(username=data['parent'])

        word_ending = 'а' if self.request.user.gender == 'female' else ''

        notify_obj = notify.send(
            self.request.user,
            recipient=recipient_user,
            verb=f"Ответил{word_ending} на ваш комментарий к гайду: «{guide.title}»<br>\
                Ответ: «{data['content'][:45]}{'...' if len(data['content']) > 45 else ''}»",
            notify_href=f"{reverse('guide', args=(guide.slug,))}#{comment_pk}"
        )
        notify_obj: Notification = notify_obj[0][1][0]

        # Если уведомление не будет прочитано за указанный countdown
        # тогда отправляем это уведомление пользователю по почте
        if recipient_user.subscribe_notify:
            tasks.send_email_if_notify_unread.apply_async(countdown=60,
                kwargs={
                    'pk': notify_obj.pk,
                    'recipient_email': recipient_user.email,
                    'actor_username': self.request.user.username,
                    'href': f"""{self.request.META['HTTP_ORIGIN']}{reverse('api_mark_as_read',
                    args=(notify_obj.pk, notify_obj.actor_object_id,
                    notify_obj.recipient_id, guide.slug, comment_pk))}"""
                }
            )


    def get_success_url(self):
        slug = self.request.META.get('PATH_INFO').split('/')[-2]
        return reverse_lazy('guide', kwargs={'guide_slug': slug})


    def get_context_data(self, *, object_list=None, **kwargs):
        # https://stackoverflow.com/a/34460881/19276507
        self.object = self.get_object()

        context = super().get_context_data(**kwargs)

        if self.request.user.is_superuser or self.request.user.is_staff:
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
    """#### Представление обрабатывающее API установки оценок LIKE/DISLIKE."""

    model = None # Модель данных которая передаётся из urls.py
    vote_type = None # Тип оценки которая передаётся из urls.py

    def post(self, request: ASGIRequest, pk):
        """Принимает primary key и получает объект из переданной модели,
        создаёт/обновляет количество оценок и возвращает в ответе количество оценок."""

        self.request = request

        # GenericForeignKey не поддерживает метод get_or_create
        obj: Union[Guides, Comments] = self.model.objects.get(pk=pk)

        try:
            likedislike: LikeDislike = LikeDislike.objects.get(
                content_type=ContentType.objects.get_for_model(obj),
                object_id=obj.id,
                user=self.request.user
            )
            if likedislike.vote is not self.vote_type:
                likedislike.vote = self.vote_type
                likedislike.save(update_fields=['vote'])
            else:
                likedislike.delete()

        except LikeDislike.DoesNotExist:
            obj.votes.create(user=self.request.user, vote=self.vote_type)

            self._send_notify(obj)

        return HttpResponse(
            json.dumps({
                "like_count": obj.votes.likes().count(),
                "dislike_count": obj.votes.dislikes().count(),
            }),
            content_type="application/json"
        )


    def _send_notify(self, comment: Comments):
        """Отправляет уведомление пользователю которому оценили комментарий."""

        if not isinstance(comment, Comments): return

        notify_obj = notify.send(
            self.request.user,
            recipient=comment.author,
            verb=f"{LikeDislike.VOTES[max(0, self.vote_type)][1]} ваш комментарий к гайду: «{comment.guide.title}»",
            notify_href=f"{reverse('guide', args=(comment.guide.slug,))}#{comment.pk}"
        )
        notify_obj: Notification = notify_obj[0][1][0]

        # Если уведомление не будет прочитано за указанный countdown
        # тогда отправляем это уведомление пользователю по почте
        if comment.author.subscribe_notify:
            tasks.send_email_if_notify_unread.apply_async(countdown=60,
                kwargs={
                    'pk': notify_obj.pk,
                    'recipient_email': comment.author.email,
                    'actor_username': self.request.user.username,
                    'href': f"""{self.request.META['HTTP_ORIGIN']}{reverse('api_mark_as_read',
                    args=(notify_obj.pk, notify_obj.actor_object_id,
                    notify_obj.recipient_id, comment.guide.slug, comment.pk))}"""
                }
            )

#############################################################################

class NotifyMarkAsReadView(View):
    """#### Представление помечающее уведомление как прочитанное
    #### и перенаправляющее к источнику этого уведомления (комментарию)."""

    def get(self, request, *args, **kwargs):

        notify_obj = get_object_or_404(Notification, pk=kwargs['notify_pk'])

        if (int(notify_obj.actor_object_id) != int(kwargs['actor_object_id'])
        or int(notify_obj.recipient_id) != int(kwargs['recipient_id'])):
            raise Http404

        notify_obj.mark_as_read()

        return redirect(reverse('guide', args=(kwargs['guide_slug'],)) + f"#{kwargs['comment_pk']}")

#############################################################################

class FilteringGuidesView(DataMixin, ListView):
    """#### Представление сортирующее список гайдов по категории переданной в url."""

    paginate_by: int = 99

    model = Guides

    template_name = 'main_app/guides_list.html'

    context_object_name = 'guides'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)

        category = get_object_or_404(Category, slug=self.kwargs['category_slug'])
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
            return Guides.objects.filter(category__slug=self.kwargs['category_slug'])

        return Guides.objects.filter(category__slug=self.kwargs['category_slug'], is_published=True)

#############################################################################

class GameChatView(DataMixin, TemplateView):
    """#### Представление обрабатывающее игровой чат."""

    template_name = 'main_app/game_chat.html'

#############################################################################

class DevChatView(DataMixin, View):
    """#### Представление которое генерирует uuid4\
    и использует его для создания уникального url адреса для веб-сокет комнаты."""

    def get(self, request, *args, **kwargs):

        return redirect('dev_chat_room', uuid4())

#############################################################################

class DevChatRoomView(DataMixin, TemplateView):
    """#### Представление обрабатывающее страницу чата разработчиков."""

    template_name = 'main_app/dev_chat_room.html'

#############################################################################

class StreamsView(DataMixin, TemplateView):
    """#### Представление обрабатывающее страницу стримов."""

    template_name = 'main_app/streams.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        """- Пробуем получить из кэша стримеров если они там есть, иначе
        запрашиваем у twitch API актуальный список онлайн стримеров.
        - Записываем стримеров в кэш для того чтобы другие страницы могли использовать обновлённые данные,
        так же передаём актуальное количество стримеров в шаблон.
        - Получаем выбранные пользователем игровые классы из файла куки,
        если у пользователя выбран хотя бы один класс, отправляем эти данные
        в метод фильтрации, либо отдаём список в шаблон без фильтрации."""

        context = super().get_context_data(**kwargs)

        encoded_text_data = self.request.COOKIES.get('streams_selected_classes')
        game_classes = get_game_classes_from_cookie(encoded_text_data)

        streams_context = get_streams_context(game_classes)
        context.update(streams_context)

        return context


    def post(self, request: ASGIRequest, *args, **kwargs):
        """Получаем выбранные пользователем игровые классы,
        пробуем получить из кэша стримеров если они там есть, иначе
        запрашиваем у twitch API актуальный список онлайн стримеров,
        записываем их в кэш и передаём эти данные в метод фильтрации
        если пользователь выбрал хотя бы один класс,
        либо отдаём список в шаблон без фильтрации."""

        game_classes = request.POST.keys()
        streams_context = get_streams_context(game_classes)

        # передаём в ответ ajax полностью отрендеренный кусок html кода с новым контекстом и заменяем им старый код
        return render(request, template_name='main_app/streams_container.html', context=streams_context)

#############################################################################

# https://habr.com/ru/companies/otus/articles/503380/
@csrf_exempt
def get_task_status_view(request: ASGIRequest, task_id: str):
    """Опрашивает celery на предмет наличия результата выполнения задания,
    возвращает эти данные в json формате."""

    async_result = AsyncResult(task_id)
    task_data = {
        "task_status": async_result.status,
        "task_result": async_result.result
    }
    return JsonResponse(task_data, status=200)

#############################################################################

class DressingRoomView(DataMixin, View):
    """#### Представление которое генерирует uuid4\
    и использует его для создания уникального url адреса для примерочной страницы."""

    def get(self, request, *args, **kwargs):

        return redirect('unique_dressing_room', uuid4())

#############################################################################

class UniqueDressingRoomView(DataMixin, TemplateView):
    """#### Представление обрабатывающее примерочную страницу."""

    template_name = 'main_app/dressing_room.html'

    time_delta = dt.timedelta(days=365)

    def _time_checking(self):
        """Обновляет время для текущей комнаты и
        проверяет все остальные комнаты на предмет устаревания
        для последующего удаления."""

        current_datetime = self.timezone_now
        self.dressing_room.update(last_update_time=current_datetime)

        dressing_rooms = DressingRoom.objects.all().only('creator', 'last_update_time')

        for room in dressing_rooms:
            if current_datetime - self.time_delta >= room.last_update_time:
                # Если пользователь не прикреплён к модели удаляем модель
                if not room.creator:
                    room.delete()


    def _get_my_saved_rooms(self, creator: Dict[str, Union[str, CustomUser]]
                           ) -> Tuple[List[Dict[str, str]], QuerySet]:
        """Создание даты для отображения списка созданных комнат у текущего пользователя."""

        dressing_rooms = DressingRoom.objects.filter(**creator)
        my_saved_rooms = []

        for room in dressing_rooms:
            my_saved_rooms.append(self.create_my_saved_rooms(
                room.last_update_time, room.room_id, room.game_patch,
                room.allow_edit, room.race, room.gender
            ))

        if not self.dressing_room:
            my_saved_rooms.append(self.create_my_saved_rooms(self.timezone_now, self.room_id))

        my_saved_rooms.sort(
            key=lambda room: dt.datetime.strptime(room['last_update_time'], '%d-%m-%Y %H:%M:%S'),
            reverse=True
        )
        return my_saved_rooms, dressing_rooms


    def create_my_saved_rooms(self, last_update_time: dt.datetime, room_id: str, game_patch: str = 'wrath', 
                              allow_edit: bool = False, race: int = 1, gender: int = 1) -> dict[str, Any]:
        return {
            'room_id': room_id, 'game_patch': game_patch, 'allow_edit': allow_edit, 'race': race, 'gender': gender,
            'last_update_time': timezone.localtime(last_update_time).strftime('%d-%m-%Y %H:%M:%S')
        }


    def create_character_data(self, allow_edit: bool = False, game_patch: str = 'wrath', race: int = 1, 
            gender: int = 1, items: str = '', face: str = '0,0,0,0,0', mount: str = '0') -> dict[str, Any]:
        return {
            'room_creator': self.is_room_creator, 'allow_edit': allow_edit, 'game_patch': game_patch,
            'race': race, 'gender': gender, 'items': items, 'face': face, 'mount': mount
        }


    def get_context_data(self, *, object_list=None, **kwargs):
        """Создаёт запись в БД с новой страницей и добавляет character_data в контекст шаблона."""

        context = super().get_context_data(**kwargs)

        self.timezone_now = timezone.now()

        # self.room_id = str(self.request.resolver_match.kwargs.get('room_id')) # <class 'uuid.UUID'>
        self.room_id = str(kwargs.get('room_id')) # <class 'uuid.UUID'>

        self.dressing_room = DressingRoom.objects.filter(room_id=self.room_id)

        cookie_creator_id = self.request.COOKIES.get('dress_room_creator_id')

        # Получаем все комнаты (если они существуют) которые привязаны к текущему Cookie либо пользователю
        if self.request.user.is_anonymous:
            my_saved_rooms, dressing_rooms = self._get_my_saved_rooms({'room_creator_id': cookie_creator_id})
        else:
            my_saved_rooms, dressing_rooms = self._get_my_saved_rooms({'creator': self.request.user})

        # Если эта комната записана в БД
        if self.dressing_room:
            self.creator_id = self.dressing_room[0].room_creator_id

            self.is_room_creator = self.creator_id == cookie_creator_id

            # Если пользователь авторизован
            if not self.request.user.is_anonymous:
                # Если в этой комнате не записан создатель
                if not self.dressing_room[0].creator:
                    # Если creator_id из БД равен creator_id из Cookie
                    if self.is_room_creator:
                        # Записываем текущего пользователя как создателя этой комнаты
                        # т.к. id из его Cookie равен id записанному в БД
                        self.dressing_room.update(creator=self.request.user)
                # Иначе если какой либо пользователь записан в этой комнате
                # сравниваем его с текущим пользователем который послал GET запрос
                # и понимаем является ли он создателем этой комнаты
                else:
                    self.is_room_creator = self.dressing_room[0].creator == self.request.user

            self._time_checking()

            character_data = self.create_character_data(
                self.dressing_room[0].allow_edit, self.dressing_room[0].game_patch,
                self.dressing_room[0].race, self.dressing_room[0].gender,
                self.dressing_room[0].items, self.dressing_room[0].face, self.dressing_room[0].mount
            )
        else:
            if len(my_saved_rooms) > 1:
                self.creator_id = dressing_rooms[0].room_creator_id
            else:
                self.creator_id = str(uuid4().hex)
            self.is_room_creator = True

            default_create_config = {
                'room_id': self.room_id,
                'room_creator_id': self.creator_id,
                'allow_edit': False,
                'last_update_time': self.timezone_now,
                'game_patch': 'wrath',
                'race': 1,
                'gender': 1,
                'items': '',
                'face': '0,0,0,0,0',
                'mount': '0'
            }
            if not self.request.user.is_anonymous:
                default_create_config['creator'] = self.request.user

            self.dressing_room.create(**default_create_config)

            character_data = self.create_character_data()

        character_data.update({'my_saved_rooms': my_saved_rooms})

        context.update({'character_data': json.dumps(character_data)})

        return context


    def render_to_response(self, context, **response_kwargs):
        """Создаёт либо обновляет cookie у создателя комнаты."""

        response = super(UniqueDressingRoomView, self).render_to_response(context, **response_kwargs)

        # https://docs.djangoproject.com/en/4.2/ref/request-response/#django.http.HttpResponse.set_cookie
        if self.is_room_creator:
            response.set_cookie(
                key='dress_room_creator_id',
                value=self.creator_id,
                # max_age=self.time_delta,
                expires=self.timezone_now + self.time_delta,
                # Если указать домен при установке cookie тогда он
                # будет расшарен на все субдомены, в том числе 'www'
                # https://stackoverflow.com/a/69854675/19276507
                # https://stackoverflow.com/a/23086139/19276507
                domain=settings.PARENT_DOMAIN,
                # Если устанавливать Cookies без указания конкретного пути
                # то этот Cookie будет работать на обе локализации одновременно
                # path=self.request.path
            )

        return response


    def post(self, request: ASGIRequest, *args, **kwargs):
        """Получает character_data с фронта и на её основе обновляет запись в БД."""

        room_id = str(kwargs.get('room_id'))

        self.dressing_room = DressingRoom.objects.filter(room_id=room_id)

        if not self.dressing_room: raise Http404

        creator_id = request.COOKIES.get('dress_room_creator_id')
        # Если пользователь авторизован и в этой комнате записан создатель
        if not request.user.is_anonymous and self.dressing_room[0].creator:
            # Если создатель этой комнаты равен текущему пользователю
            if self.dressing_room[0].creator == request.user:
                # Тогда получаем creator_id из БД вместо Cookie
                creator_id = DressingRoom.objects.filter(creator=request.user)\
                                    .only('room_creator_id')[0].room_creator_id

        # print(f'room_creator_id: {self.dressing_room[0].room_creator_id}',
        #       f'creator_id: {creator_id}',
        #       f'allow_edit: {self.dressing_room[0].allow_edit}', sep='\n')

        # Если creator_id этой комнаты не равен creator_id текущего пользователя из Cookie либо БД
        # возбуждаем исключение "Доступ запрещён"
        if ( self.dressing_room[0].room_creator_id != creator_id
        and not self.dressing_room[0].allow_edit ):
            raise PermissionDenied

        # data: dict = [json.loads(key) for key in request.POST.keys()][0]
        data: dict = json.loads(request.body)

        if data.get('delete_room'):
            dressing_room = DressingRoom.objects.get(room_id=data['delete_room'])
            dressing_room.delete()
            return JsonResponse({'status': 'data was successfully deleted'})

        # Если не создатель комнаты пытается изменить поле allow_edit запрещаем ему доступ
        if ( self.dressing_room[0].room_creator_id != creator_id
        and self.dressing_room[0].allow_edit != data['allow_edit'] ):
            raise PermissionDenied

        # Если пользователь изменил патч, обнуляем настройки внешности
        if self.dressing_room[0].game_patch != data['game_patch']:
            data['face'] = ''

        self.dressing_room.update(**data)

        return JsonResponse({'status': 'data was successfully saved'})

#############################################################################

class ArenaPointCalculatorView(DataMixin, TemplateView):
    """#### Представление обрабатывающее страницу калькулятора очков арены."""

    template_name = 'main_app/ap_calculator.html'

    def post(self, request: ASGIRequest, *args, **kwargs):
        """- Получаем рейтинг с названием брекета и выбранный сервер
        от пользователя и передаём в функцию расчёта очков арены.
        - Затем возвращаем результат в шаблон в json формате
        который примет ajax скрипт."""

        bracket_ratings = request.POST.items()
        server_type = request.POST.get('server_type')

        bracket_points = get_arena_points(bracket_ratings, server_type)

        return JsonResponse(bracket_points)

#############################################################################
################################ Авторизация ################################
#############################################################################

class RegisterView(DataMixin, RedirectAuthUser, CreateView):
    """#### Представление обрабатывающее страницу регистрации."""

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
    """#### Представление обрабатывающее страницу условий использования."""

    template_name = 'auth/terms_of_use.html'

#############################################################################

class LoginCustomView(DataMixin, RedirectAuthUser, LoginView):
    """#### Представление обрабатывающее страницу авторизации."""

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
    """#### Представление обрабатывающее выход из аккаунта."""

    raise_exception = True
    permission_denied_message = _("Вы уже вышли из аккаунта.")

    def get(self, request, *args, **kwargs):

        self.username = request.user.get_username()

        return super().get(request, *args, **kwargs)


    def get_success_url(self):
        messages.success(self.request, _('До скорой встречи, ') + self.username + '!')

        return reverse_lazy('home')

#############################################################################

class PasswordResetCustomView1(DataMixin, RedirectAuthUser, PasswordResetView):
    """#### Первое представление обрабатывающее сброс пароля."""

    redirect_auth_user_url = 'home'

    form_class = PasswordResetCustomForm

    html_email_template_name = 'emails/password_reset_email.html'

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
    """#### Второе представление обрабатывающее сброс пароля."""

    redirect_auth_user_url = 'home'

    form_class = PasswordResetCustomForm

    html_email_template_name = 'emails/password_reset_email.html'

    template_name = 'auth/password_reset2.html'

    def get_success_url(self):
        messages.info(self.request, _('Письмо успешно отправлено.'))
        return reverse_lazy('password_reset_done')


    def get(self, request, *args, **kwargs):
        """Если пользователь пытается зайти на страницу для повторной отправки почты
        не использовав перед этим первую страницу, перенаправляем его на первую."""

        if 'email' not in request.session.keys():
            return redirect('password_reset1')

        return super().get(request, *args, **kwargs)


    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)

        email = self.request.session.get('email')
        context.update({'email_value': email})

        return context

#############################################################################

class PasswordResetDoneCustomView(DataMixin, RedirectAuthUser, PasswordResetDoneView):
    """#### Представление обрабатывающее информационную страницу\
    об отправке письма для сброса пароля."""

    redirect_auth_user_url = 'home'

    template_name = 'auth/password_reset_done.html'

#############################################################################

# https://docs.djangoproject.com/en/4.1/topics/auth/default/
class PasswordResetConfirmCustomView(DataMixin, RedirectAuthUser, PasswordResetConfirmView):
    """#### Представление обрабатывающее страницу с формой для ввода нового пароля."""

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
    """#### Представление обрабатывающее страницу с сообщением об успешной смене пароля."""

    redirect_auth_user_url = 'home'

    template_name = 'auth/password_reset_complete.html'

#############################################################################

class ContactMeView(DataMixin, CreateView):
    """#### Представление обрабатывающее страницу с формой для отправки обратной связи."""

    form_class = ContactMeForm

    template_name = 'auth/contact_me.html'

    def get_success_url(self):
        messages.success(self.request, _('Сообщение успешно отправлено!'))
        return reverse_lazy('contact_me')


    def form_valid(self, form):
        """При отправке пользователем формы обратной связи,
        отправляем сами себе с серверной почты на серверную почту
        сообщение с содержанием заполненным пользователем."""

        tasks.contact_me_send_mail_task.delay(
            f'Сообщение с формы обратной связи сайта frishub.ru от отправителя: {form.data["email"]}',
            form.data['message'],
            settings.EMAIL_HOST_USER,
            [settings.EMAIL_HOST_USER]
        )
        return super(ContactMeView, self).form_valid(form)


    def form_invalid(self, form):
        self.errors_handler(form.errors)

        return self.render_to_response(self.get_context_data(form=form))

#############################################################################
################################## Аккаунт ##################################
#############################################################################

class AccountView(DataMixin, LoginRequiredMixin, TemplateView):
    """#### Представление обрабатывающее главную страницу аккаунта."""

    # перенаправляет неавторизованного пользователя на указанную страницу
    # (при выключенном raise_exception)
    # login_url = reverse_lazy('home')
    # redirect_field_name = ""

    # возбуждает исключение PermissionDenied при попытке входа неавторизованного пользователя
    raise_exception = True
    # кастомное сообщение для исключения PermissionDenied
    permission_denied_message = _("Для получения доступа к странице %s, \
        войдите в свой аккаунт.") % '"/account"'

    template_name: str = 'account/account.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)

        server_email = settings.EMAIL_HOST_USER
        context.update({'server_email': server_email})

        return context

#############################################################################

class AccountSettingsView(DataMixin, LoginRequiredMixin, FormView):
    """#### Представление обрабатывающее страницу с настройками аккаунта."""

    raise_exception = True
    permission_denied_message = _("Для получения доступа к странице %s, \
        войдите в свой аккаунт.") % '"/account/settings"'

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

        self.initial = {
            'first_name': request.user.first_name, 'last_name': request.user.last_name,
            'birth_date': request.user.birth_date, 'gender': request.user.gender,
            'game_class': request.user.game_class, 'discord_username': request.user.discord_username,
            'battlenet_username': request.user.battlenet_username, 'twitch_link': request.user.twitch_link,
            'dress_room_link': request.user.dress_room_link, 'subscribe_newsletter': request.user.subscribe_newsletter,
            'subscribe_notify': request.user.subscribe_notify
        }

        return super().get(request, *args, **kwargs)


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
    """#### Представление обрабатывающее страницу смены пароля внутри аккаунта."""

    raise_exception = True
    permission_denied_message = _("Для получения доступа к странице %s, \
        войдите в свой аккаунт.") % '"/account/password"'

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
    """#### Представление обрабатывающее страницу смены почты внутри аккаунта."""

    raise_exception = True
    permission_denied_message = _("Для получения доступа к странице %s, \
        войдите в свой аккаунт.") % '"/account/email"'

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
    """#### Представление обрабатывающее страницу удаления аккаунта."""

    raise_exception = True
    permission_denied_message = _("Для получения доступа к странице %s, \
        войдите в свой аккаунт.") % '"/account/delete"'

    template_name: str = 'account/account_delete.html'

    def post(self, request: ASGIRequest, *args, **kwargs):
        """Удаляем поле пользователя из БД, перенаправляем на домашнюю страницу и выводим сообщение."""

        context = self.get_context_data(**kwargs)

        if request.POST.get('DELETE_ACCOUNT'):
            username = request.user.username
            user_obj = CustomUser.objects.get(username=username)
            user_obj.delete()
            messages.info(request, username + _(', очень жаль что вы от нас уходите. ') + '&#128575;')
            return redirect('home')

        return self.render_to_response(context)

#############################################################################
