from django import template
from django.db.models.query import QuerySet
from django.urls import reverse
from django.utils.html import format_html

from main_app.models import Category, CustomUser, DressingRoom

import humanize

from re import findall


register = template.Library()

#############################################################################

# тег inclusion_tag для возврата содержимого целого html файла
# в параметре name можно указать имя тега отличное от названия функции для использования в шаблоне
@register.inclusion_tag(filename='main_app/filtered_guides_list.html', name='filtering_guides')
def filtered_guides_list(sorter=None, category_selected=0):
    """Фильтрует список гайдов если передан параметр sorter, иначе возвращает сразу все."""

    if sorter:
        categorys = Category.objects.order_by(sorter)
    else:
        categorys = Category.objects.all()

    return {'categorys': categorys, 'category_selected': category_selected}

#############################################################################

@register.filter
def user_in(objects: QuerySet, user: CustomUser):
    """Возвращает True если пользователь авторизован и уже оставил оценку, иначе False."""

    if user.is_authenticated:
        return objects.filter(user=user).exists()
    return False

#############################################################################

@register.filter
def translate_datetime(dt, language_code='ru'):
    """Возвращает сокращённый текст времени на основе переданного datetime,
    так же учитывает локализацию используя параметр language_code."""

    _t = humanize.i18n.activate('ru_RU') if language_code == 'ru' else humanize.i18n.deactivate()

    relative_time = humanize.naturaltime(dt.astimezone().replace(tzinfo=None))

    time_words = relative_time.split()

    if len(time_words) < 3: return relative_time

    if time_words[1][:3] in {'мин', 'мес', 'min', 'mon'}:
        medium_word = time_words[1][:3]
    else:
        medium_word = time_words[1][:1]

    first_word = time_words[0] + ' ' if time_words[0].isalpha() else time_words[0]

    return first_word + medium_word + '. ' + time_words[2]

#############################################################################

@register.filter
def child_count(node):
    """Возвращает количество дочерних комментариев у комментария."""

    count = 0
    for children_comment in node.get_descendants():
        if children_comment.is_published:
            count += 1
    return count

#############################################################################

@register.filter
def get_race_img_by_dress_room_url(url: str) -> str:
    """Принимает url dressing room комнаты и пытается получить из БД расу привязаную к этой комнате
    если получается то возвращает url иконки расы, иначе возвращает дефолтную иконку."""

    room_id = findall(r"/dressing-room/([A-Za-z0-9\-]+)", url)
    if not room_id:
        return '/static/main_app/images/close.png'

    dressing_room = DressingRoom.objects.filter(room_id=room_id[0])
    if not dressing_room or dressing_room[0].race in dressing_room.model.RACES_WITHOUT_ICON:
        return '/static/main_app/images/close.png'

    race = dressing_room.model.RACES.get(dressing_room[0].race).lower()
    gender = dressing_room.model.GENDERS.get(dressing_room[0].gender).lower()

    return f'{dressing_room.model.DEFAULT_ICON_URL}race_{race}_{gender}.jpg'

#############################################################################

@register.simple_tag
def get_verbose_name(instance: object, field_name: str) -> str:
    """Возвращает verbose_name полученный по объекту класса и названию его поля."""

    return type(instance)._meta.get_field(field_name).verbose_name

#############################################################################

# Переопределение дефолтного тега для добавления api_name == 'all_list'
# Requires vanilla-js framework - http://vanilla-js.com/
@register.simple_tag
def register_custom_notify_callbacks(badge_class='live_notify_badge',  # pylint: disable=too-many-arguments,missing-docstring
                                     menu_class='live_notify_list',
                                     refresh_period=15,
                                     callbacks='',
                                     api_name='list',
                                     fetch=5,
                                     nonce=None,
                                     mark_as_read=False
                                     ):
    refresh_period = int(refresh_period) * 1000

    if api_name == 'all_list':
        api_url = reverse('notifications:live_all_notification_list')
    elif api_name == 'list':
        api_url = reverse('notifications:live_unread_notification_list')
    elif api_name == 'count':
        api_url = reverse('notifications:live_unread_notification_count')
    else:
        return ""
    definitions = """
        notify_badge_class='{badge_class}';
        notify_menu_class='{menu_class}';
        notify_api_url='{api_url}';
        notify_fetch_count='{fetch_count}';
        notify_unread_url='{unread_url}';
        notify_mark_all_unread_url='{mark_all_unread_url}';
        notify_refresh_period={refresh};
        notify_mark_as_read={mark_as_read};
    """.format(
        badge_class=badge_class,
        menu_class=menu_class,
        refresh=refresh_period,
        api_url=api_url,
        unread_url=reverse('notifications:unread'),
        mark_all_unread_url=reverse('notifications:mark_all_as_read'),
        fetch_count=fetch,
        mark_as_read=str(mark_as_read).lower()
    )

    # add a nonce value to the script tag if one is provided
    nonce_str = ' nonce="{nonce}"'.format(nonce=nonce) if nonce else ""

    script = '<script type="text/javascript"{nonce}>'.format(nonce=nonce_str) + definitions
    for callback in callbacks.split(','):
        script += "register_notifier(" + callback + ");"
    script += "</script>"
    return format_html(script)

#############################################################################
