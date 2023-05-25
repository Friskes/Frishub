from django import template
from django.contrib.humanize.templatetags.humanize import NaturalTimeFormatter
from django.db.models.query import QuerySet

from main_app.models import Category, Comments, CustomUser


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
    """Возвращает True если пользователь авторизован, иначе False."""

    if user.is_authenticated:
        return objects.filter(user=user).exists()
    return False

#############################################################################

@register.filter
def translate_datetime(dt, language_code='ru'):
    """Возвращает сокращённый текст времени на основе переданного datetime,
    так же учитывает локализацию используя параметр language_code."""

    str_dt: str = NaturalTimeFormatter.string_for(dt)
    # print(str_dt.split())

    new_list = []
    for text in str_dt.split():

        clean_text = text.replace(',', '')

        if language_code == 'ru':
            if clean_text in {'секунд', 'секунды', 'секунду'}:
                new_list.append('с. ')
            elif clean_text in {'минут', 'минуту', 'минуты'}:
                new_list.append('мин. ')
            elif clean_text in {'hour', 'hours', 'час', 'часа', 'часов'}:
                new_list.append('ч. ')
            elif clean_text in {'day', 'days'}:
                new_list.append('д. ')
            elif clean_text in {'week', 'weeks'}:
                new_list.append('н. ')
            elif clean_text in {'month', 'months'}:
                new_list.append('мес. ')
            elif clean_text in {'year', 'years'}:
                new_list.append('г. ')
            else:
                new_list.append(text)
        elif language_code == 'en':
            if clean_text in {'a'}:
                new_list.append('1')
            elif clean_text in {'an'}:
                new_list.append('1')
            elif clean_text in {'second', 'seconds'}:
                new_list.append('s. ')
            elif clean_text in {'minute', 'minutes'}:
                new_list.append('min. ')
            elif clean_text in {'hour', 'hours'}:
                new_list.append('h. ')
            elif clean_text in {'day', 'days'}:
                new_list.append('d. ')
            elif clean_text in {'week', 'weeks'}:
                new_list.append('w. ')
            elif clean_text in {'month', 'months'}:
                new_list.append('mon. ')
            elif clean_text in {'year', 'years'}:
                new_list.append('y. ')
            else:
                new_list.append(text)

    translated_dt = ''.join(new_list)
    # print(translated_dt)

    return translated_dt

#############################################################################

@register.filter
def child_count(node):
    """Возвращает количество дочерних комментариев у комментария."""

    count = Comments.objects.get(pk=node.id).get_descendants(include_self=False)
    return len(count)

#############################################################################
