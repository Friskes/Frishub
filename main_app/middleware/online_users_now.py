from django.core.handlers.asgi import ASGIRequest
from django.core.cache import cache
from django.utils.deprecation import MiddlewareMixin
# from django.core.exceptions import MiddlewareNotUsed


# https://webdevblog.ru/nachalo-raboty-s-middleware-v-django/

# middleware в функциональном стиле
# def my_custom_middleware(get_response):

#     # здесь происходит единовременная инициализация при запуске сервера

#     def middleware(request):

#         # код написанный ДО вызова get_response(request) будет выполнятся ДО вызова представления views.py
#         return get_response(request)
#         # код написанный ПОСЛЕ вызова get_response(request) будет выполнятся ПОСЛЕ вызова представления views.py

#     def process_exception(request, exception):
#         pass # Обрабатываем возкникшие исключения
#     middleware.process_exception = process_exception

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

    seconds_alive = 60*5 # 5мин.

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
        user_ips_with_prefix = [f'online-user-ip-{user_ip}' for user_ip in cached_user_ips]

        # получаем пользователей которые есть в кэше по префиксу + ip
        fresh_user_ips = cache.get_many(user_ips_with_prefix).keys()

        # убираем префикс
        online_now_user_ips = [user_ip.replace('online-user-ip-', '') for user_ip in fresh_user_ips]

        # добавляем текущего пользователя если его нету в списке
        if current_user_ip not in online_now_user_ips:
            online_now_user_ips.append(current_user_ip)

        # передать переменную с названием users_online_count
        # с количеством пользователей в область видимости html разметки
        # внутри объекта request
        request.__class__.users_online_count = len(online_now_user_ips)

        cache.set(f'online-user-ip-{current_user_ip}', True, self.seconds_alive)
        cache.set('online-now-user-ips', online_now_user_ips, self.seconds_alive)
