from django.urls import re_path

from main_app import consumers


websocket_urlpatterns = [
    # адрес можно указывать точно такой же как и в urls.py
    re_path('game-chat', consumers.GameChatConsumer.as_asgi()),

    re_path(r'^dev-chat/(?P<room_id>[^/]+)$', consumers.DevChatConsumer.as_asgi()),
]
