from django.utils import timezone
from django.core.handlers.asgi import ASGIRequest
# from django.core.exceptions import MiddlewareNotUsed

from main_app.models import VisitorRecord

import datetime


# https://webdevblog.ru/nachalo-raboty-s-middleware-v-django/

time_delta = datetime.timedelta(minutes=5, seconds=0)

def online_users_now_middleware(get_response):
    """Получение общего количества онлайн авторизованных пользователей
    вместе с неавторизованными за последние 5 минут."""

    # здесь происходит единовременная инициализация при запуске сервера

    def middleware(request: ASGIRequest):

        # код написанный ДО вызова get_response(request) будет выполнятся ДО вызова представления views.py
        # код написанный ПОСЛЕ вызова get_response(request) будет выполнятся ПОСЛЕ вызова представления views.py

        # Идентификация пользователя по CSRF токену
        # current_user_ip = request.META.get('CSRF_COOKIE')

        # Идентификация пользователя по IP адресу
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            current_user_ip = x_forwarded_for.split(',')[0]
        else:
            current_user_ip = request.META.get('REMOTE_ADDR')

        if not current_user_ip:
            return get_response(request) # принудительно завершаем выполнение middleware

        current_datetime = timezone.now()

        all_db_obj = VisitorRecord.objects.all()

        flag = False
        for db_obj in all_db_obj:
            if current_user_ip == db_obj.user_ip:
                flag = True
                ip_db_obj = VisitorRecord.objects.filter(user_ip=current_user_ip)
                ip_db_obj.update(user_ip=current_user_ip, last_user_activity_time=current_datetime)
                break
            else:
                flag = False

        if not flag:
            VisitorRecord.objects.create(user_ip=current_user_ip, last_user_activity_time=current_datetime)

        all_db_obj = VisitorRecord.objects.all()

        for db_obj in all_db_obj:
            if current_datetime - time_delta >= db_obj.last_user_activity_time:
                db_obj.delete()

        all_db_obj = VisitorRecord.objects.all()

        # передать переменную с названием users_online_count
        # с количеством объектов в область видимости html разметки
        # внутри объекта request
        request.__class__.users_online_count = all_db_obj.count()

        # middleware выполняется ДО выполнения views.py
        return get_response(request)


    # def process_exception(request, exception):
    #     pass # Обрабатываем возкникшие исключения
    # middleware.process_exception = process_exception

    return middleware



# middleware в ООП стиле
# class MyCustomMiddleware:
#     # Метод __init__() вызывается только один раз при запуске веб-сервера.
#     def __init__(self, get_response):
#         # с помощью кастомного исключения можно по какому либо условию пропустить данный плагин.
#         # raise MiddlewareNotUsed('плагин: MyCustomMiddleware - Пропущен.')
#         self.get_response = get_response

#     # Метод __call__() вызывается для каждого запроса.
#     def __call__(self, request):

#         # код написанный ДО вызова self.get_response(request) будет выполнятся ДО вызова представления views.py
#         response = self.get_response(request)
#         # код написанный ПОСЛЕ вызова self.get_response(request) будет выполнятся ПОСЛЕ вызова представления views.py

#         return response



###### Получение количества авторизованных пользователей онлайн #######
#######################################################################
# Для вывода информации на страницу можно использовать теги шаблонов: #
# Множество объектов пользователей: {{ request.online_now }}          #
# Текущее количество пользователей: {{ request.online_now.count }}    #
# Айди объектов пользователей:      {{ request.online_now_ids }}      #
#######################################################################

# from django.core.cache import cache
# from django.conf import settings
# from ..models import CustomUser

# ONLINE_THRESHOLD = getattr(settings, 'ONLINE_THRESHOLD', 60 * 15)
# ONLINE_MAX = getattr(settings, 'ONLINE_MAX', 50)


# def get_online_now(self):
#     return CustomUser.objects.filter(id__in=self.online_now_ids or [])


# class OnlineAuthUsersNowMiddleware:
#     """
#     Maintains a list of users who have interacted with the website recently.
#     Their user IDs are available as ``online_now_ids`` on the request object,
#     and their corresponding users are available (lazily) as the
#     ``online_now`` property on the request object.
#     """

#     def __init__(self, get_response):
#         self.get_response = get_response


#     def __call__(self, request):

#         # First get the index
#         uids = cache.get('online-now', [])

#         # Perform the multiget on the individual online uid keys
#         online_keys = ['online-%s' % (u,) for u in uids]
#         fresh = cache.get_many(online_keys).keys()
#         online_now_ids = [int(k.replace('online-', '')) for k in fresh]

#         # If the user is authenticated, add their id to the list
#         if request.user.is_authenticated:
#             uid = request.user.id

#             # If their uid is already in the list, we want to bump it
#             # to the top, so we remove the earlier entry.
#             if uid in online_now_ids:
#                 online_now_ids.remove(uid)

#             online_now_ids.append(uid)

#             if len(online_now_ids) > ONLINE_MAX:
#                 del online_now_ids[0]

#         # Attach our modifications to the request object
#         request.__class__.online_now_ids = online_now_ids
#         request.__class__.online_now = property(get_online_now)

#         # Set the new cache
#         cache.set('online-%s' % (request.user.pk,), True, ONLINE_THRESHOLD)
#         cache.set('online-now', online_now_ids, ONLINE_THRESHOLD)

#         response = self.get_response(request)
#         return response
