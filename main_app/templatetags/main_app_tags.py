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
    if sorter:
        categorys = Category.objects.order_by(sorter)
    else:
        categorys = Category.objects.all()

    return {'categorys': categorys, 'category_selected': category_selected}

#############################################################################

@register.filter
def user_in(objects: QuerySet, user: CustomUser):
    if user.is_authenticated:
        return objects.filter(user=user).exists()
    return False

#############################################################################

@register.filter
def translate_datetime(dt, language_code='ru'):
    str_dt: str = NaturalTimeFormatter.string_for(dt)
    # print(str_dt.split())

    new_list = []
    for text in str_dt.split():

        if language_code == 'ru':
            if text == 'секунд' or text == 'секунд,' or text == 'секунды' or text == 'секунды,' or text == 'секунду' or text == 'секунду,':
                new_list.append('с. ')
            elif text == 'минут' or text == 'минут,' or text == 'минуту' or text == 'минуту,' or text == 'минуты' or text == 'минуты,':
                new_list.append('мин. ')
            elif ( text == 'hour' or text == 'hour,' or text == 'hours' or text == 'hours,' or text == 'час' or text == 'час,'
            or text == 'часа' or text == 'часа,' or text == 'часов' or text == 'часов,' ):
                new_list.append('ч. ')
            elif text == 'day' or text == 'day,' or text == 'days' or text == 'days,':
                new_list.append('д. ')
            elif text == 'week' or text == 'week,' or text == 'weeks' or text == 'weeks,':
                new_list.append('н. ')
            elif text == 'month' or text == 'month,' or text == 'months' or text == 'months,':
                new_list.append('мес. ')
            elif text == 'year' or text == 'year,' or text == 'years' or text == 'years,':
                new_list.append('г. ')
            else:
                new_list.append(text)
        elif language_code == 'en':
            if text == 'a' or text == 'a,':
                new_list.append('1')
            elif text == 'an' or text == 'an,':
                new_list.append('1')
            elif text == 'second' or text == 'second,' or text == 'seconds' or text == 'seconds,':
                new_list.append('s. ')
            elif text == 'minute' or text == 'minute,' or text == 'minutes' or text == 'minutes,':
                new_list.append('min. ')
            elif text == 'hour' or text == 'hour,' or text == 'hours' or text == 'hours,':
                new_list.append('h. ')
            elif text == 'day' or text == 'day,' or text == 'days' or text == 'days,':
                new_list.append('d. ')
            elif text == 'week' or text == 'week,' or text == 'weeks' or text == 'weeks,':
                new_list.append('w. ')
            elif text == 'month' or text == 'month,' or text == 'months' or text == 'months,':
                new_list.append('mon. ')
            elif text == 'year' or text == 'year,' or text == 'years' or text == 'years,':
                new_list.append('y. ')
            else:
                new_list.append(text)

    translated_dt = ''.join(new_list)
    # print(translated_dt)

    return translated_dt

#############################################################################

@register.filter
def child_count(node):
    count = Comments.objects.get(pk=node.id).get_descendants(include_self=False)
    return len(count)

#############################################################################
