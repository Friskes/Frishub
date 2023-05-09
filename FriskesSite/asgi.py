"""
ASGI config for FriskesSite project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'FriskesSite.settings')


# дефолтное приложение
# application = get_asgi_application()


django_asgi_app = get_asgi_application()

from channels.auth import AuthMiddlewareStack # добавляет в scope: user, url_route
# from channels.sessions import SessionMiddlewareStack # добавляет в scope: session
from channels.routing import ProtocolTypeRouter, URLRouter
# ограничивает хосты с которых можно открыть веб-сокет соединение теми которые указаны в ALLOWED_HOSTS
from channels.security.websocket import AllowedHostsOriginValidator
from main_app.routing import websocket_urlpatterns

# вебсокет приложение
application = ProtocolTypeRouter({
    "http": django_asgi_app,
    # передаём url адреса из файла routing.py в класс URLRouter
    "websocket": AllowedHostsOriginValidator(
                     AuthMiddlewareStack(
                        #  SessionMiddlewareStack(
                             URLRouter(
                                 websocket_urlpatterns
                             )
                        #  )
                     )
                 ),
})
