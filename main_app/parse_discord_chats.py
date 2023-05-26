# https://youtu.be/dR9n1zmw-Go

# https://github.com/websocket-client/websocket-client

# https://websocket-client.readthedocs.io/en/latest/faq.html
# https://websocket-client.readthedocs.io/en/latest/examples.html

# https://instructobit.com/tutorial/101/Reconnect-a-Python-socket-after-it-has-lost-its-connection

# устанавливать в таком порядке:
# pip install websocket
# pip install websocket-client
import websocket

import json
import threading
import time
from datetime import datetime as dt

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from channels.layers import InMemoryChannelLayer

from main_app.services.services import request_post, request_get
from main_app.models import ServiceInfo
from FriskesSite import settings

from typing import Union, Dict
from ssl import SSLError

# import logging
# logging.basicConfig(level=logging.INFO, filename="py_log.log", filemode="w", format="%(asctime)s %(levelname)s %(message)s")


#############################################################################

REQUEST_URL = 'https://discord.com/api/v9/auth/login'
HEADERS_POST = {'content-type': 'application/json'}
PAYLOAD = {
    'login': settings.DISCORD_LOGIN,
    'password': settings.DISCORD_PASSWORD
}

DISCORD_ENDPOINT_URL = 'https://discord.com/api/users/@me'


def check_token(token: str) -> Union[str, None]:
    """#### Проверяем работоспособность токена.
    >>> Если токен рабочий возвращаем None
    >>> Если токен нерабочий получаем новый и возвращаем его."""

    # передаём заголовок с user-agent для того что бы сервер думал что данные отправляются с браузера
    headers_get = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
            AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
        'authorization': token
    }

    json_response = request_get(DISCORD_ENDPOINT_URL, headers_get)

    if json_response.get('code') == 0:
        new_token = request_post(REQUEST_URL, HEADERS_POST, PAYLOAD).get('token')
        return new_token
    return None


def token_verification() -> Union[str, None]:
    """Если токен есть в БД проверяем его,
    - Если он рабочий возвращаем его,
    - Если нерабочий нам вернётся новый токен из метода проверки,
    сохраняем его в БД и возвращаем.\n
    Если токена нет в БД, получаем новый токен, сохраняем его в БД и возвращаем."""

    service_info = ServiceInfo.objects.filter(pk=1)

    if service_info and service_info[0].discord_token:

        token = check_token(service_info[0].discord_token)
        if token:
            service_info.update(discord_token=token)
            return token
        return service_info[0].discord_token

    token = request_post(REQUEST_URL, HEADERS_POST, PAYLOAD).get('token')

    if token and service_info:
        service_info.update(discord_token=token)
    elif token:
        service_info.create(discord_token=token)
    return token

#############################################################################

class DiscordChatParser:
    """#### Класс для парсинга чата с помощью Discord API."""

    forbidding_flag = True

    def __init__(self):
        """Единоразово создаём экземпляр класса WebSocket,
        устанавливаем соединение с сервером discord,
        единоразово запускаем бесконечный цикл в отдельном потоке для пинга сервера
        и отправляем запрос с токеном для того чтобы сервер думал что мы человек."""

        # print(f'>>> {dt.now().strftime("%H:%M:%S")} DiscordChatParser __init__ <<<')

        self.token = token_verification()

        if self.forbidding_flag:
            # websocket.enableTrace(True) # вывод отладочных данных в консоль
            self.ws = websocket.WebSocket()

        self.ws.connect('wss://gateway.discord.gg/?v=6&encoding=json')

        if self.forbidding_flag:
            self.forbidding_flag = False

            event_data = self.recieve_json_response()
            self.heartbeat_interval = event_data['d']['heartbeat_interval'] / 1000 # 41.25

            threading._start_new_thread(self.heartbeat, ())

        # при установлении соединения через вебсокет необходимо отправлять запрос
        # с полезной нагрузкой с токеном что бы сервер принял нас за авторизованного клиента
        fake_user_payload = {
            "op": 2,
            "d": {
                "token": self.token,
                "properties": {
                    "$os": "windows",
                    "$browser": "chrome",
                    "$device": "pc"
                }
            }
        }

        self.send_json_request(fake_user_payload)


    def send_json_request(self, request: dict):
        """#### Отправляем пинг на сервер discord.
        При возникновении исключений обрабатываем их."""

        try:
            self.ws.send(json.dumps(request))
            # print(f'>>> {dt.now().strftime("%H:%M:%S")} Heartbeat Sent Request:', request)

        except websocket.WebSocketConnectionClosedException as e:
            # print(f'>>> {dt.now().strftime("%H:%M:%S")} Исключение (send_json_request) WebSocketConnectionClosedException:', e)
            pass

        except ConnectionResetError as e:
            print(f'>>> {dt.now().strftime("%H:%M:%S")} Исключение (send_json_request) ConnectionResetError:', e)

        except SSLError as e:
            print(f'>>> {dt.now().strftime("%H:%M:%S")} Исключение (send_json_request) SSLError:', e)

        except websocket.WebSocketTimeoutException as e:
            print(f'>>> {dt.now().strftime("%H:%M:%S")} Исключение (send_json_request) WebSocketTimeoutException:', e)

        except websocket.WebSocketProtocolException as e:
            print(f'>>> {dt.now().strftime("%H:%M:%S")} Исключение (send_json_request) WebSocketProtocolException:', e)

        except BrokenPipeError as e:
            print(f'>>> {dt.now().strftime("%H:%M:%S")} Исключение (send_json_request) BrokenPipeError:', e)


    def recieve_json_response(self) -> Dict[dict, list]:
        """#### Запрашиваем у discord сервера актуальные данные и возвращаем их.
        При возникновении исключений обрабатываем их."""

        try:
            responce = self.ws.recv()
            if responce:

                try:
                    # if json.loads(responce).get('t') == 'READY':
                    #     print('>>> READY:', json.loads(responce).get('d').keys())

                    # if json.loads(responce).get('t') == 'SESSIONS_REPLACE':
                    #     print('>>> SESSIONS_REPLACE:', json.loads(responce).get('d')[0])

                    # responce = str(responce).strip("'<>() ").replace('\'', '\"')
                    return json.loads(responce)

                # Expecting value: line 1 column 1 (char 0)
                except json.decoder.JSONDecodeError as e:
                    print(f'>>> {dt.now().strftime("%H:%M:%S")} Исключение (recieve_json_response) JSONDecodeError:', e)
                    print(f'^^^ {dt.now().strftime("%H:%M:%S")}', repr(responce))

        # ("Connection to remote host was lost.")
        # ("socket is already closed.")
        except websocket.WebSocketConnectionClosedException as e:
            # print(f'>>> {dt.now().strftime("%H:%M:%S")} Исключение (recieve_json_response) WebSocketConnectionClosedException:', e)
            self.re_connect()

        # ConnectionResetError: [WinError 10054] Удаленный хост принудительно разорвал существующее подключение
        except ConnectionResetError as e:
            print(f'>>> {dt.now().strftime("%H:%M:%S")} Исключение (recieve_json_response) ConnectionResetError:', e)

        # WebSocketProtocolException("rsv is not implemented, yet")
        except websocket.WebSocketProtocolException as e:
            print(f'>>> {dt.now().strftime("%H:%M:%S")} Исключение (recieve_json_response) WebSocketProtocolException:', e)
            self.re_connect()

        # ssl.SSLError: [SSL: WRONG_VERSION_NUMBER] wrong version number (_ssl.c:2629)
        except SSLError as e:
            print(f'>>> {dt.now().strftime("%H:%M:%S")} Исключение (recieve_json_response) SSLError:', e)

        # cannot decode:
        except websocket.WebSocketPayloadException as e:
            print(f'>>> {dt.now().strftime("%H:%M:%S")} Исключение (recieve_json_response) WebSocketPayloadException:', e)

        # [Errno 32] Broken pipe
        except BrokenPipeError as e:
            print(f'>>> {dt.now().strftime("%H:%M:%S")} Исключение (recieve_json_response) BrokenPipeError:', e)

        # 'utf-8' codec can't decode byte 0xd4 in position 0: invalid continuation byte
        except UnicodeDecodeError as e:
            print(f'>>> {dt.now().strftime("%H:%M:%S")} Исключение (recieve_json_response) UnicodeDecodeError:', e)


    def re_connect(self):
        """Если вебсокет соединение разорвано пробуем подключится заново с интервалом раз в 3 секунды."""

        while not self.ws.connected:
            try:
                self.__init__()
            except Exception as e:
                time.sleep(3)


    def heartbeat(self):
        """С интервалом указанным в переменной heartbeat_interval
        отправляем пинг на сервер, говоря ему что мы все ещё используем
        это соединение и нет необходимости принудительно отключать нас."""

        while True:
            time.sleep(self.heartbeat_interval)

            HEARTBEAT_JSON = {
                "op": 1,
                "d": "null"
            }
            self.send_json_request(HEARTBEAT_JSON)


# единоразово создаём экземпляр класса DiscordChatParser при загрузке сервера
if settings.DISCORD_LOGIN and settings.DISCORD_PASSWORD:
    discord_chat_parser = DiscordChatParser()

#############################################################################

channel_ids = {
    'wotlk-x1': '862240989133012992',
    'wotlk_x5_alliance': '862240955108425759',
    'wotlk_x5_horde': '869986269525053521',
    'wotlk_x100_alliance': '862240930052571136',
    'wotlk_x100_horde': '869996139976491059',
    'wotlk-fun': '875065270744518747',
}


def sorting_chat_message(event_data: dict,
                         server_name: str,
                         player_nickname: bool,
                         only_twitch: bool) -> Union[str, None]:
    """#### Функция сортировки сообщений индивидуально для каждого пользователя."""

    # print(event_data['d'])
    guild_id = event_data['d']['guild_id']     # айди сервера
    channel_id = event_data['d']['channel_id'] # айди канала на сервере
    # timestamp = event_data['d']['timestamp']   # дата и время отправки сообщения
    content: str = event_data['d']['content']       # сообщение

    if guild_id == '338966203919892480' and channel_id == channel_ids[server_name]:

        # бывает что в content приходит сразу несколько склеенных сообщений, поэтому их необходимо разделить.
        for message in content.split('\n'):

            if player_nickname:
                if f"][**{player_nickname}**]:" not in message:
                    continue

            if only_twitch:
                if 'twitch.tv/' not in message:
                    continue

            # фильтры для (wotlk-x1, wotlk_x5_alliance, wotlk_x5_horde, wotlk_x100_alliance, wotlk_x100_horde)
            if '[SYSTEM]:' in message:
                continue
            if '<:alliance:' in message:
                message = message[30:]
            if '<:XY:' in message:
                message = message[24:]
            # фильтр для (wotlk-fun)
            if 'АО[' in message:
                message = message[2:]

            message = message.replace('**', '')

            # добавить дату в начало сообщения
            # message = '[' + timestamp[:10] + ']' + message

            return message

#############################################################################

def event_trigger(data: dict):
    """Отправляем актуальные данные с discord сервера
    в метод send_message_to_frontend класса GameChatConsumer."""

    # всё тоже самое как в методе receive внутри класса GameChatConsumer, за исключением того что
    # название группы (self.room_group_name) указываем просто строкой
    # а слой канала (self.channel_layer) получаем с помощью функции get_channel_layer
    channel_layer: InMemoryChannelLayer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(
        'game_chat', { # название группы
            # значением ключа type является название метода в классе GameChatConsumer,
            # data это аргумент который передаётся в метод send_message_to_frontend
            'type': 'send_message_to_frontend',
            'data': data
        },
    )

#############################################################################

class AsyncActionGetGameChatData(threading.Thread):
    """#### Потоковый класс для вызова запроса на получение данных с discord сервера в бесконечном цикле.
    >>> Остановить цикл можно вызвав метод stop() у экземпляра класса."""

    def __init__(self):
        super().__init__()

        self.forbidding_flag = True


    def run(self):

        while self.forbidding_flag and settings.DISCORD_LOGIN and settings.DISCORD_PASSWORD:
            data = discord_chat_parser.recieve_json_response()
            if data and data.get('t') == 'MESSAGE_CREATE':
                event_trigger(data)


    def stop(self):
        self.forbidding_flag = False

#############################################################################
