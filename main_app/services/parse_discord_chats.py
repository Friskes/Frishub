# https://youtu.be/dR9n1zmw-Go

# https://github.com/websocket-client/websocket-client

# https://websocket-client.readthedocs.io/en/latest/faq.html
# https://websocket-client.readthedocs.io/en/latest/examples.html

# https://instructobit.com/tutorial/101/Reconnect-a-Python-socket-after-it-has-lost-its-connection

from __future__ import annotations

import json
import logging
import threading
import time
from typing import Any

import requests
import websocket
from asgiref.sync import async_to_sync
from channels.layers import InMemoryChannelLayer, get_channel_layer
from FriskesSite import settings

# для этих библиотек важен порядок установки т.к. они импортируются одним именем,
# устанавливать в таком порядке, иначе будет ошибка:
# "TypeError: __init__() missing 3 required positional arguments: 'environ', 'socket', and 'rfile'"
# pip install websocket
# pip install websocket-client
from redis.exceptions import BusyLoadingError

from main_app.models import ServiceInfo
from main_app.services.hcaptcha_bypass import bypass

log = logging.getLogger(__name__)

__all__ = ('sorting_chat_message',)


REQUEST_URL = 'https://discord.com/api/v9/auth/login'
HEADERS_POST = {'content-type': 'application/json'}
PAYLOAD = {'login': settings.DISCORD_LOGIN, 'password': settings.DISCORD_PASSWORD}

DISCORD_ENDPOINT_URL = 'https://discord.com/api/users/@me'


def _check_token(token: str) -> str | None:
    """#### Проверяем работоспособность токена.
    >>> Если токен рабочий возвращаем None
    >>> Если токен нерабочий получаем новый и возвращаем его."""

    # передаём заголовок с user-agent для того что бы сервер думал что данные отправляются с браузера
    headers_get = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
        '(KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
        'authorization': token,
    }

    json_response: dict = requests.get(url=DISCORD_ENDPOINT_URL, headers=headers_get, timeout=5).json()

    if json_response.get('code') == 0:
        return (
            requests.post(url=REQUEST_URL, json=PAYLOAD, headers=HEADERS_POST, timeout=5)
            .json()
            .get('token')
        )
    return None


def _token_verification() -> str | None:
    """Если токен есть в БД проверяем его,
    - Если он рабочий возвращаем его,
    - Если нерабочий нам вернётся новый токен из метода проверки,
    сохраняем его в БД и возвращаем.\n
    Если токена нет в БД, получаем новый токен, сохраняем его в БД и возвращаем."""

    service_info = ServiceInfo.objects.filter(pk=1)

    if service_info and service_info[0].discord_token:
        token = _check_token(service_info[0].discord_token)
        if token:
            service_info.update(discord_token=token)
            return token
        return service_info[0].discord_token

    response: dict = requests.post(url=REQUEST_URL, json=PAYLOAD, headers=HEADERS_POST, timeout=5).json()

    if not response.get('token') and response.get('captcha_sitekey'):
        try:
            captcha_key = bypass(response['captcha_sitekey'])
        except Exception as exc:
            log.error(f'[file parse_discord_chats.py -> def _token_verification]:\n{exc}')
            return None

        response: dict = requests.post(
            url=REQUEST_URL,
            json={**PAYLOAD, 'captcha_key': captcha_key},
            headers=HEADERS_POST,
            timeout=5,
        ).json()

    token = response.get('token')

    if token and service_info:
        service_info.update(discord_token=token)
    elif token:
        service_info.create(discord_token=token)
    return token


class DiscordChatParser:
    """#### Класс для парсинга чата с помощью Discord API."""

    forbidding_flag = True

    def __init__(self):
        """Единоразово создаём экземпляр класса WebSocket,
        устанавливаем соединение с сервером discord,
        единоразово запускаем бесконечный цикл в отдельном потоке для пинга сервера
        и отправляем запрос с токеном для того чтобы сервер думал что мы человек."""

        log.debug('[class DiscordChatParser -> def __init__]')

        self.token = _token_verification()

        if self.forbidding_flag:
            # websocket.enableTrace(True) # вывод отладочных данных в консоль
            self.ws = websocket.WebSocket()

        self.ws.connect('wss://gateway.discord.gg/?v=6&encoding=json')

        if self.forbidding_flag:
            self.forbidding_flag = False

            event_data = self.recieve_json_response()
            self.heartbeat_interval = event_data['d']['heartbeat_interval'] / 1000  # 41.25

            threading._start_new_thread(self.heartbeat, ())

        # при установлении соединения через вебсокет необходимо отправлять запрос
        # с полезной нагрузкой с токеном что бы сервер принял нас за авторизованного клиента
        fake_user_payload = {
            'op': 2,
            'd': {
                'token': self.token,
                'properties': {'$os': 'windows', '$browser': 'chrome', '$device': 'pc'},
            },
        }

        self.send_json_request(fake_user_payload)

    def send_json_request(self, request: dict[str, str | int | dict[str, str]]):
        """#### Отправляем пинг на сервер discord.
        При возникновении исключений обрабатываем их."""

        try:
            self.ws.send(json.dumps(request))
            log.debug(
                f'[class DiscordChatParser -> def send_json_request] Heartbeat Sent Request:\n{request}'
            )

        except BrokenPipeError as exc:
            log.info(f'[class DiscordChatParser -> def send_json_request] BrokenPipeError:\n{exc}')
            self.re_connect()

        except Exception as exc:
            log.info(f'[class DiscordChatParser -> def send_json_request] Exception:\n{exc}')

    def recieve_json_response(self) -> dict[str, str | int | dict[str, Any]]:
        """#### Запрашиваем у discord сервера актуальные данные и возвращаем их.
        При возникновении исключений обрабатываем их."""

        try:
            responce = self.ws.recv()
            if responce:
                try:
                    return json.loads(responce)

                # Expecting value: line 1 column 1 (char 0)
                except json.decoder.JSONDecodeError as exc:
                    log.info(
                        f'[class DiscordChatParser -> def recieve_json_response] '
                        f'JSONDecodeError:\n{exc}\n{responce!r}'
                    )

        # ("Connection to remote host was lost.")
        # ("socket is already closed.")
        except websocket.WebSocketConnectionClosedException as exc:
            log.info(
                f'[class DiscordChatParser -> def recieve_json_response] '
                f'WebSocketConnectionClosedException:\n{exc}'
            )
            self.re_connect()

        # WebSocketProtocolException("rsv is not implemented, yet")
        except websocket.WebSocketProtocolException as exc:
            log.info(
                f'[class DiscordChatParser -> def recieve_json_response] '
                f'WebSocketProtocolException:\n{exc}'
            )
            self.re_connect()

        except Exception as exc:
            log.info(f'[class DiscordChatParser -> def recieve_json_response] Exception:\n{exc}')

    def re_connect(self):
        """Если вебсокет соединение разорвано пробуем подключится заново с интервалом раз в 3 секунды."""

        while not self.ws.connected:
            try:
                self.__init__()
            except Exception as exc:
                log.info(f'[class DiscordChatParser -> def re_connect] Exception:\n{exc}')
                time.sleep(3)

    def heartbeat(self):
        """С интервалом указанным в переменной heartbeat_interval
        отправляем пинг на сервер, говоря ему что мы все ещё используем
        это соединение и нет необходимости принудительно отключать нас."""

        while True:
            time.sleep(self.heartbeat_interval)

            heartbeat_json = {'op': 1, 'd': 'null'}
            self.send_json_request(heartbeat_json)


GUILD_ID = '338966203919892480'

CHANNEL_IDS = {
    'wotlk-x1': '862240989133012992',
    'wotlk_x5_alliance': '862240955108425759',
    'wotlk_x5_horde': '869986269525053521',
    'wotlk_x100_alliance': '862240930052571136',
    'wotlk_x100_horde': '869996139976491059',
    'wotlk-fun': '875065270744518747',
}


def sorting_chat_message(
    event_data: dict[str, str | int | dict[str, Any]],
    server_name: str | None,
    player_nickname: str | bool,
    only_twitch: bool,
) -> str | None:
    """#### Функция сортировки сообщений индивидуально для каждого пользователя."""

    channel_id = event_data['d']['channel_id']  # айди канала на сервере
    # timestamp = event_data['d']['timestamp']   # дата и время отправки сообщения
    content: str = event_data['d']['content']  # сообщение

    if channel_id == CHANNEL_IDS[server_name]:
        # бывает что в content приходит сразу несколько склеенных сообщений,
        # поэтому их необходимо разделить.
        for message in content.split('\n'):
            if player_nickname and f'][**{player_nickname}**]:' not in message:
                continue

            if only_twitch and 'twitch.tv/' not in message:
                continue

            # фильтры для (wotlk-x1, wotlk_x5_alliance,
            # wotlk_x5_horde, wotlk_x100_alliance, wotlk_x100_horde)
            if '[SYSTEM]:' in message:
                continue
            if '<:alliance:' in message:
                message = message[30:]
            if '<:XY:' in message:
                message = message[24:]
            # фильтр для (wotlk-fun)
            if 'АО[' in message:
                message = message[2:]

            # добавить дату в начало сообщения
            # message = '[' + timestamp[:10] + ']' + message

            return message.replace('**', '')


def _event_trigger(data: dict[str, str | int | dict[str, Any]]):
    """Отправляем актуальные данные с discord сервера
    в метод send_message_to_frontend класса GameChatConsumer."""

    # всё тоже самое как в методе receive внутри класса GameChatConsumer, за исключением
    # того что название группы (self.room_group_name) указываем просто строкой
    # а слой канала (self.channel_layer) получаем с помощью функции get_channel_layer
    channel_layer: InMemoryChannelLayer = get_channel_layer()

    try:
        async_to_sync(channel_layer.group_send)(
            'game_chat',  # название группы
            {
                # значением ключа type является название метода в классе GameChatConsumer,
                # data это аргумент который передаётся в метод send_message_to_frontend
                'type': 'send_message_to_frontend',
                'data': data,
            },
        )
    except BusyLoadingError as exc:
        log.info(f'[file parse_discord_chats.py -> def _event_trigger]' f' Exception:\n{exc}')


class AsyncActionGetGameChatData(threading.Thread):
    """#### Потоковый класс для вызова метода recieve_json_response у парсера в\
    бесконечном цикле для того чтобы не копилась очередь сообщений у вебсокета."""

    def run(self):
        while True:
            data = discord_chat_parser.recieve_json_response()
            if data and data.get('t') == 'MESSAGE_CREATE' and data.get('d').get('guild_id') == GUILD_ID:
                _event_trigger(data)


# единоразово создаём экземпляры классов DiscordChatParser
# и AsyncActionGetGameChatData при загрузке сервера
if settings.DISCORD_LOGIN and settings.DISCORD_PASSWORD:
    discord_chat_parser = DiscordChatParser()

    async_action_get_game_chat_data = AsyncActionGetGameChatData()
    async_action_get_game_chat_data.start()
