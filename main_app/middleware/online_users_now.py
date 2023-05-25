from django.core.handlers.asgi import ASGIRequest
from django.core.cache import cache
from django.utils.deprecation import MiddlewareMixin
# from django.core.exceptions import MiddlewareNotUsed
# from django.utils import timezone

# from main_app.models import VisitorRecord

# import datetime


# https://webdevblog.ru/nachalo-raboty-s-middleware-v-django/

# def online_users_now_middleware(get_response):
#     """Получение общего количества онлайн авторизованных пользователей
#     вместе с неавторизованными за последние 5 минут."""

#     # здесь происходит единовременная инициализация при запуске сервера
#     time_delta = datetime.timedelta(minutes=5, seconds=0)

#     def middleware(request: ASGIRequest):

#         # код написанный ДО вызова get_response(request) будет выполнятся ДО вызова представления views.py
#         # код написанный ПОСЛЕ вызова get_response(request) будет выполнятся ПОСЛЕ вызова представления views.py

#         # Идентификация пользователя по CSRF токену
#         # current_user_ip = request.META.get('CSRF_COOKIE')

#         # Идентификация пользователя по IP адресу
#         x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
#         if x_forwarded_for:
#             current_user_ip = x_forwarded_for.split(',')[0]
#         else:
#             current_user_ip = request.META.get('REMOTE_ADDR')

#         if not current_user_ip:
#             return get_response(request) # принудительно завершаем выполнение middleware

#         current_datetime = timezone.now()

#         all_db_obj = VisitorRecord.objects.all()

#         flag = False
#         for db_obj in all_db_obj:
#             if current_user_ip == db_obj.user_ip:
#                 flag = True
#                 ip_db_obj = VisitorRecord.objects.filter(user_ip=current_user_ip)
#                 ip_db_obj.update(user_ip=current_user_ip, last_user_activity_time=current_datetime)
#                 break
#             else:
#                 flag = False

#         if not flag:
#             VisitorRecord.objects.create(user_ip=current_user_ip, last_user_activity_time=current_datetime)

#         all_db_obj = VisitorRecord.objects.all()

#         for db_obj in all_db_obj:
#             if current_datetime - time_delta >= db_obj.last_user_activity_time:
#                 db_obj.delete()

#         all_db_obj = VisitorRecord.objects.all()

#         # передать переменную с названием users_online_count
#         # с количеством объектов в область видимости html разметки
#         # внутри объекта request
#         request.__class__.users_online_count = all_db_obj.count()

#         # middleware выполняется ДО выполнения views.py
#         return get_response(request)


#     # def process_exception(request, exception):
#     #     pass # Обрабатываем возкникшие исключения
#     # middleware.process_exception = process_exception

#     return middleware



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



# https://docs.djangoproject.com/en/4.2/topics/cache/
# https://djangosnippets.org/snippets/10617/
# https://gist.github.com/dfalk/1472104
class OnlineUsersNowMiddleware(MiddlewareMixin):
    """#### Middleware подсчитывающая количество авторизованных + анонимных пользователей."""

    seconds_alive = 60*10 # 10мин.

    def process_request(self, request: ASGIRequest):
        """Вызывается до работы View"""

        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            current_user_ip = x_forwarded_for.split(',')[0]
        else:
            current_user_ip = request.META.get('REMOTE_ADDR')

        if not current_user_ip:
            return # принудительно завершаем выполнение middleware

        # список ip всех пользователей
        cached_user_ips = cache.get('online-now-user-ips', [])
        # добавляем префикс к ip пользователей
        user_ips_with_prefix = [f'online-user-ip-{(user_ip,)}' for user_ip in cached_user_ips]
        # получаем пользователей которые есть в кэше по префиксу + ip
        fresh_user_ips = cache.get_many(user_ips_with_prefix).keys()
        # убираем префикс
        online_now_user_ips = [user_ip.replace('online-user-ip-', '') for user_ip in fresh_user_ips]

        # добавляем текущего пользователя если его нету в списке
        if current_user_ip not in online_now_user_ips:
            online_now_user_ips.append(current_user_ip)

        request.__class__.users_online_count = len(online_now_user_ips)

        cache.set(f'online-user-ip-{(current_user_ip,)}', True, self.seconds_alive)
        cache.set('online-now-user-ips', online_now_user_ips, self.seconds_alive)
