from django.core.handlers.asgi import ASGIRequest
from django.core.cache import cache
from django.utils.deprecation import MiddlewareMixin


# https://webdevblog.ru/nachalo-raboty-s-middleware-v-django/
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
