from django.urls import re_path

from main_app import consumers


websocket_urlpatterns = [
    # адрес можно указывать такой же как и в urls.py
    # за исключением префикса ws
    # префикс так же должен быть указан в javascript
    # он необходим для того чтобы прокси сервер nginx смог отличить
    # http/https от ws/wss протокола
    # так же в javascript необходимо указывать порт daphne после хоста
    # на продакшене (возможно при деплое с помощью docker порт добавлять не надо)
    re_path('ws/game-chat/', consumers.GameChatConsumer.as_asgi()),

    re_path(r'^ws/dev-chat/(?P<room_id>[^/]+)/$', consumers.DevChatConsumer.as_asgi()),
]
