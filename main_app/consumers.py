# from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from channels.generic.websocket import WebsocketConsumer, JsonWebsocketConsumer, AsyncJsonWebsocketConsumer
from channels.layers import InMemoryChannelLayer

from asgiref.sync import async_to_sync

from main_app.parse_discord_chats import AsyncActionGetGameChatData, sorting_chat_message

import datetime
import urllib.parse
import time
from copy import deepcopy
from typing import Any
from uuid import uuid4
import json
# import codecs
# from random import randint

import logging
log = logging.getLogger(__name__)


# https://channels.readthedocs.io/en/latest/topics/channel_layers.html
# https://github.com/django/asgiref/blob/main/specs/www.rst#http-connection-scope

#############################################################################

class GameChatConsumer(WebsocketConsumer):
    """#### Потребитель для игрового чата."""

    channel_layer: InMemoryChannelLayer

    def __init__(self):
        super().__init__()

        self.async_action_get_game_chat_data = AsyncActionGetGameChatData()

        self.server_name = None
        self.player_nickname = False
        self.only_twitch = False


    def connect(self):
        """При соединении с вебсокетом запускаем поток для каждого уникального пользователя
        в котором будем в бесконечном цикле запрашивать актуальные данные у сервера Discord."""

        self.room_group_name = "game_chat"

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name,
        )
        self.accept()

        self.async_action_get_game_chat_data.start()


    def disconnect(self, code):
        """При разрыве соединения с вебсокетом отправляем команду в ранее открытый поток
        на прекращение выполнения бесконечного цикла тем самым убивая поток."""

        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name,
        )

        self.async_action_get_game_chat_data.stop()

        # if close_code == 1001:
        #     print('>>> CLOSE_CODE:', close_code, 'Пользователь обновил страницу/долгое время был неактивен.')
        # if close_code == 1006:
        #     print('>>> CLOSE_CODE:', close_code, 'Пользователь вышел со страницы.')


    def receive(self, text_data=None, bytes_data=None):
        """Получаем данные для работы сортировки которые передаёт пользователь,
        и помещаем их в переменные."""

        data: dict = json.loads(text_data)

        if data.get('server_name'):
            self.server_name = data['server_name']

        if data.get('player_nickname'):
            self.player_nickname = data['player_nickname']
        else:
            self.player_nickname = False

        if data.get('only_twitch'):
            self.only_twitch = data['only_twitch']
        else:
            self.only_twitch = False

        # async_to_sync(self.channel_layer.group_send)(
        #     self.room_group_name, {
        #         "type": 'send_message_to_frontend',
        #         "какой-то ключ": "какое-то значение"
        #     },
        # )

        # self.send(text_data=json.dumps({'message': _('Чат сервера: ') + self.server_name}))


    def send_message_to_frontend(self, event):
        """Регистрируем ивент и передаём данные из него в функцию сортировки
        для каждого уникального пользователя отдельно."""

        message = None

        # определяем сортировку чата для каждого экземпляра класса GameChatConsumer
        # (то есть для каждого уникального пользователя отдельно)
        # print(self)
        if self.server_name:
            message = sorting_chat_message(event['data'],
                                           self.server_name,
                                           self.player_nickname,
                                           self.only_twitch)

        if message:
            self.send(text_data=json.dumps({'message': message}))

#############################################################################

# import os
# import stat
# import shutil


# def remove_readonly(func, path, _):
#     '''Clear the readonly bit and reattempt the removal'''
#     os.chmod(path, stat.S_IWRITE)
#     func(path)


# class DevChatHistory:

#     def save_history(self, room_data):
#         with open(f'dev_chat_history_{self.room_id}.json', 'w') as file: # , encoding='utf-8')
#             file.write(room_data)


#     def get_history(self):
#         with open(f'dev_chat_history_{self.room_id}.json', 'r') as file: # , encoding='utf-8')
#             return file.readlines()


#     def delete_history(self):
#         shutil.rmtree(f'dev_chat_history_{self.room_id}.json', onerror=remove_readonly)

#############################################################################

# class DevChatConsumer(JsonWebsocketConsumer):

#     channel_layer: InMemoryChannelLayer

#     rooms_data = {}
#     chat_history = {}

#     time_delta = datetime.timedelta(hours=24)

#     def get_cookie_data(self):
#         """Создаёт переменные:
#         - userid
#         - username
#         - user_color\n
#         из cookie saved_room."""

#         self.saved_userid = None
#         self.saved_username = None
#         self.saved_user_color = None

#         encoded_saved_room = self.scope['cookies'].get('saved_room')
#         if encoded_saved_room:
#             # .replace('%22','"').replace('%2C',',')
#             decoded_saved_room: str = urllib.parse.unquote(encoded_saved_room, encoding='utf-8')
#             saved_room: dict = json.loads(decoded_saved_room)

#             # print('SAVED_ROOM:', json.dumps(saved_room, indent=4, ensure_ascii=False))
#             self.saved_userid = saved_room['userid']
#             self.saved_username = saved_room['username']
#             self.saved_user_color = saved_room['user_color']


#     def rooms_data_handler(self):
#         """#### Создание даты комнаты/истории."""

#         if self.room_id not in self.rooms_data:

#             self.rooms_data[self.room_id] = {
#                 'time_stamp': '',
#                 'room_creator': self.userid,
#                 'chat_text': '',
#                 'lock_room': False,
#                 'active_consumers': {}
#             }
#             self.chat_history[self.room_id] = []


#     def connect_user_data_handler(self):
#         """#### Создание/Обновление даты пользователя."""

#         if self.userid not in self.rooms_data[self.room_id]['active_consumers']:

#             self.rooms_data[self.room_id]['active_consumers'][self.userid] = {
#                 'page_count': 1,
#                 'username': self.saved_username,
#                 'user_color': self.saved_user_color,
#                 'cur_pos': None
#             }
#         else:
#             self.rooms_data[self.room_id]['active_consumers'][self.userid]['page_count'] += 1


#     def disconnect_user_data_handler(self):
#         """Удаление/Обновление даты пользователя."""

#         # если пользователь закрыл единственную вкладку - удаляем пользователя
#         if self.rooms_data[self.room_id]['active_consumers'][self.userid]['page_count'] == 1:

#             del self.rooms_data[self.room_id]['active_consumers'][self.userid]
#         else:
#             # если пользователь закрыл не единственную вкладку - уменьшаем количество открытых вкладок на 1
#             self.rooms_data[self.room_id]['active_consumers'][self.userid]['page_count'] -= 1


#     def time_checking(self):
#         """Обновляет время для текущей комнаты и
#         проверяет все остальные комнаты на предмет устаревания
#         для последующего удаления из rooms_data и chat_history"""

#         current_datetime = timezone.now()
#         self.rooms_data[self.room_id]['time_stamp'] = str(current_datetime)

#         for room_id, room_data in self.rooms_data.copy().items():
#             if ( not self.rooms_data[room_id]['active_consumers'] # если активных клиентов нету
#             # и пройдена временная отметка
#             # 14:00 - 1:00 = 13:00 >= 13:00
#             and current_datetime - self.time_delta
#             >= datetime.datetime.strptime(room_data['time_stamp'], '%Y-%m-%d %H:%M:%S.%f%z') ):
#             # 14:00 - 13:00 = 1:00 >= 1:00
#             # and current_datetime - datetime.datetime.strptime(room_data['time_stamp'], '%Y-%m-%d %H:%M:%S.%f%z')
#             # >= self.time_delta ):
#                 del self.rooms_data[room_id] # удаляем комнату
#                 del self.chat_history[room_id] # так же удаляем комнату в истории


#     def connect(self):
#         """Обрабатывает подключение пользователя, создаёт/удаляет комнату,
#         отслеживает количество открытых вкладок у пользователя,
#         отправляет все необходимые данные на фронт."""

#         # print('\n>>> DEF CONNECT <<<')

#         self.room_id = self.scope["url_route"]["kwargs"]["room_id"]
#         self.room_group_name = f"dev_chat_{self.room_id}"

#         async_to_sync(self.channel_layer.group_add)(self.room_group_name, self.channel_name)

#         # получить headers cookies
#         # decoded_headers = codecs.decode(self.scope['headers'][10][1], 'UTF-8').split('; ')
#         # print('decoded_headers:', decoded_headers)

#         self.get_cookie_data()

#         # print('SAVED_USERID:', self.saved_userid)
#         # при первом входе используем сгенерированный userid и записываем его в saved_room cookies на фронте
#         # при повторных входах всегда используем userid из saved_room cookies
#         if self.saved_userid:
#             self.userid = self.saved_userid
#         else:
#             self.userid = str(uuid4().hex)

#         self.rooms_data_handler()

#         self.connect_user_data_handler()

#         self.time_checking()

#         # https://stackoverflow.com/a/61221741/19276507
#         # cookie = {'Set-Cookie': 'key=value'}
#         # self.accept(subprotocol=(None, cookie)) # добавление cookies в ответ
#         self.accept() # сигнализируем каналам Django о том, что соединение с WebSocket установлено
#         # self.close() # отклоняем соединение

#         self.group_send('room_creator', self.rooms_data[self.room_id]['room_creator'])

#         # при подключении отправляем данные, только пользователю который сейчас подключился (отправителю)
#         self.send_json({"userid": self.userid})
#         self.send_json({"message": self.rooms_data[self.room_id]['chat_text']})

#         # если комната закрыта создателем комнаты,
#         # тогда отправляем историю чата только пользователю который сейчас подключился (отправителю)
#         if self.rooms_data[self.room_id]['lock_room']:
#             self.send_json({"chat_history": self.chat_history[self.room_id]})

#         self.group_send('active_consumers', self.rooms_data[self.room_id]['active_consumers'])

#         # print('ROOMS_DATA:', json.dumps(self.rooms_data, indent=4, ensure_ascii=False))
#         # print()


#     def disconnect(self, code: int):
#         """Обрабатывает отключение пользователя,
#         удаляет пользователя из rooms_data при выходе со всех вкладок,
#         иначе уменьшает количество открытых вкладок,
#         отправляет все необходимые данные на фронт."""

#         # print('>>> DEF DISCONNECT <<<')

#         async_to_sync(self.channel_layer.group_discard)(self.room_group_name, self.channel_name)

#         self.disconnect_user_data_handler()

#         self.group_send('active_consumers', self.rooms_data[self.room_id]['active_consumers'])

#         # print('ROOMS_DATA:', json.dumps(self.rooms_data, indent=4, ensure_ascii=False))
#         # print()


#     def receive_json(self, content: dict, **kwargs):
#         """Принимает сообщения переданные с фронта, обрабатывает их,
#         и отправляет все необходимые данные обратно на фронт."""

#         # print('>>> DEF RECEIVE <<<')

#         message = content.get("message")
#         if message is not None:
#             # print('MESSAGE:', repr(message))

#             self.rooms_data[self.room_id]['chat_text'] = message

#             self.group_send('message', self.rooms_data[self.room_id]['chat_text'])

#             # print('ROOMS_DATA:', json.dumps(self.rooms_data, indent=4, ensure_ascii=False))
#             # print()

#         users_curs_pos = content.get("users_curs_pos")
#         if users_curs_pos:
#             # print('USERS_CURS_POS:', users_curs_pos)
#             # записываю актуальные координаты курсоров пользователей
#             for user_id in users_curs_pos:
#                 self.rooms_data[self.room_id]['active_consumers'][user_id]['cur_pos'] = users_curs_pos[user_id]

#             self.save_history()

#             self.group_send('cursor_data', self.rooms_data[self.room_id]['active_consumers'])

#             # print('ROOMS_DATA:', json.dumps(self.rooms_data, indent=4, ensure_ascii=False))
#             # print()

#         selection_range = content.get("selection_range")
#         if selection_range:
#             # print('SELECTION_RANGE:', selection_range)
#             selection_data = {
#                 self.userid: {
#                     'selection_range': selection_range,
#                     'username': self.rooms_data[self.room_id]['active_consumers'][self.userid]['username'],
#                     'user_color': self.rooms_data[self.room_id]['active_consumers'][self.userid]['user_color']
#                 }
#             }
#             self.group_send('selection_data', selection_data)

#         user_data = content.get("user_data")
#         if user_data:
#             # print('USER_DATA:', user_data)
#             self.rooms_data[self.room_id]['active_consumers'][self.userid]['username'] = user_data['username']
#             self.rooms_data[self.room_id]['active_consumers'][self.userid]['user_color'] = user_data['user_color']

#             self.group_send('active_consumers', self.rooms_data[self.room_id]['active_consumers'])

#             # print('ROOMS_DATA:', json.dumps(self.rooms_data, indent=4, ensure_ascii=False))
#             # print()

#         room_state = content.get("room_state")
#         if room_state and self.chat_history[self.room_id]:

#             if room_state == 'lock':
#                 self.rooms_data[self.room_id]['lock_room'] = True
#                 self.group_send('chat_history', self.chat_history[self.room_id])

#             elif room_state == 'unlock':
#                 self.rooms_data[self.room_id]['lock_room'] = False
#                 self.group_send('chat_history', 'unlock')

#             # print('CHAT_HISTORY:', json.dumps(self.chat_history[self.room_id], indent=4, ensure_ascii=False))
#             # print()


#     # https://stackoverflow.com/questions/52210782/django-channels-group-send-exclude-the-data-sender
#     # вместо channel_name можно использовать userid для отправки вне потребителя
#     def group_send(self, key: str, val: Any):
#         """Обработчик для снижения дублирования кода, передаёт доп. параметр sender_channel_name
#         для пропуска отправителя при групповой отправке."""

#         async_to_sync(self.channel_layer.group_send)(
#             self.room_group_name, {
#                 # "type": "send.message",
#                 "type": "send_message",
#                 key: val,
#                 'sender_channel_name': self.channel_name
#             }
#         )


#     def send_message(self, event: dict):
#         """Принимает ивент и отправляет его всем/[всем кроме отправителя] подключенным потребителям на фронт."""

#         message = event.get("message")
#         if message is not None:
#             # пропускаем отправителя для отправки
#             # (т.к. для обновления чата у себя между вкладками лучше использовать localStorage на фронте)
#             # https://stackoverflow.com/questions/52210782/django-channels-group-send-exclude-the-data-sender/57035230#57035230
#             if self.channel_name != event['sender_channel_name']: # отправить всем, кроме отправителя
#                 self.send_json({"message": message})

#         cursor_data = event.get("cursor_data")
#         if cursor_data:
#             # отправляю информацию о перемещении курсора всем пользователям кроме отправителя
#             if self.channel_name != event['sender_channel_name']:
#                 self.send_json({"cursor_data": cursor_data})

#         selection_data = event.get("selection_data")
#         if selection_data:
#             # отправляю информацию о перемещении курсора всем пользователям кроме отправителя
#             if self.channel_name != event['sender_channel_name']:
#                 self.send_json({"selection_data": selection_data})

#         active_consumers = event.get("active_consumers")
#         if active_consumers:
#             self.send_json({"active_consumers": active_consumers})

#         room_creator = event.get("room_creator")
#         if room_creator:
#             self.send_json({"room_creator": room_creator})

#         chat_history = event.get("chat_history")
#         if chat_history:
#             self.send_json({"chat_history": chat_history})


#     def save_history(self):
#         """Сохраняет историю сообщений/передвижений курсора в chat_history
#         при этом генерируя сообщения пустышки перед первым сообщением каждого пользователя."""

#         # использую глубокое копирование для вложенных данных а именно для active_consumers
#         deep_copied_rooms_data = deepcopy(self.rooms_data[self.room_id])

#         # для снижения объёма данных удаляю не нужные поля
#         del deep_copied_rooms_data['time_stamp']
#         del deep_copied_rooms_data['room_creator']
#         del deep_copied_rooms_data['lock_room']
#         del deep_copied_rooms_data['active_consumers'][self.userid]['page_count']

#         deep_copied_rooms_data['create_time'] = time.time()

#         deep_copied_rooms_data['sender'] = {self.userid: deep_copied_rooms_data['active_consumers'][self.userid]}
#         del deep_copied_rooms_data['active_consumers']

#         # единоразово для каждого уникального пользователя создаю сообщение пустышку для того чтобы была возможность
#         # определять стартовую точку активности пользователя для удаления его курсора
#         exists_user_ids = {list(item['sender'])[0] for item in self.chat_history[self.room_id]}

#         if self.userid not in exists_user_ids:

#             self.chat_history[self.room_id].append({
#                 'chat_text': '',
#                 'create_time': deep_copied_rooms_data['create_time'],
#                 'sender': {
#                     self.userid: {
#                         'username': deep_copied_rooms_data['sender'][self.userid]['username'],
#                         'user_color': '#00000000', # нулевая прозрачность
#                         'cur_pos': None
#                         # 'cur_pos': {'row': 0, 'column': 0} # если не хотим чтобы курсор пропадал
#                     }
#                 }
#             })

#         # print(deep_copied_rooms_data)
#         # сохраняю снимок состояния чата для истории
#         self.chat_history[self.room_id].append(deep_copied_rooms_data)

#         # print('CHAT_HISTORY:', json.dumps(self.chat_history[self.room_id], indent=4, ensure_ascii=False))
#         # print()

#############################################################################

class DevChatConsumer(AsyncJsonWebsocketConsumer):

    channel_layer: InMemoryChannelLayer

    rooms_data = {}
    chat_history = {}

    time_delta = datetime.timedelta(hours=24)

    async def get_cookie_data(self):
        """Создаёт переменные:
        - userid
        - username
        - user_color\n
        из cookie saved_room."""

        self.saved_userid = None
        self.saved_username = None
        self.saved_user_color = None

        encoded_saved_room = self.scope['cookies'].get('saved_room')
        if encoded_saved_room:
            # .replace('%22','"').replace('%2C',',')
            decoded_saved_room: str = urllib.parse.unquote(encoded_saved_room, encoding='utf-8')
            saved_room: dict = json.loads(decoded_saved_room)

            # print('SAVED_ROOM:', json.dumps(saved_room, indent=4, ensure_ascii=False))
            self.saved_userid = saved_room['userid']
            self.saved_username = saved_room['username']
            self.saved_user_color = saved_room['user_color']


    async def rooms_data_handler(self):
        """#### Создание даты комнаты/истории."""

        if self.room_id not in self.rooms_data:

            self.rooms_data[self.room_id] = {
                'time_stamp': '',
                'room_creator': self.userid,
                'chat_text': '',
                'lock_room': False,
                'active_consumers': {}
            }
            self.chat_history[self.room_id] = []


    async def connect_user_data_handler(self):
        """#### Создание/Обновление даты пользователя."""

        if self.userid not in self.rooms_data[self.room_id]['active_consumers']:

            self.rooms_data[self.room_id]['active_consumers'][self.userid] = {
                'page_count': 1,
                'username': self.saved_username,
                'user_color': self.saved_user_color,
                'cur_pos': None
            }
        else:
            self.rooms_data[self.room_id]['active_consumers'][self.userid]['page_count'] += 1


    async def disconnect_user_data_handler(self):
        """Удаление/Обновление даты пользователя."""

        # если пользователь закрыл единственную вкладку - удаляем пользователя
        if self.rooms_data[self.room_id]['active_consumers'][self.userid]['page_count'] == 1:

            del self.rooms_data[self.room_id]['active_consumers'][self.userid]
        else:
            # если пользователь закрыл не единственную вкладку - уменьшаем количество открытых вкладок на 1
            self.rooms_data[self.room_id]['active_consumers'][self.userid]['page_count'] -= 1


    async def time_checking(self):
        """Обновляет время для текущей комнаты и
        проверяет все остальные комнаты на предмет устаревания
        для последующего удаления из rooms_data и chat_history"""

        current_datetime = timezone.now()
        self.rooms_data[self.room_id]['time_stamp'] = str(current_datetime)

        for room_id, room_data in self.rooms_data.copy().items():
            if ( not self.rooms_data[room_id]['active_consumers'] # если активных клиентов нету
            # и пройдена временная отметка
            # 14:00 - 1:00 = 13:00 >= 13:00
            and current_datetime - self.time_delta
            >= datetime.datetime.strptime(room_data['time_stamp'], '%Y-%m-%d %H:%M:%S.%f%z') ):
            # 14:00 - 13:00 = 1:00 >= 1:00
            # and current_datetime - datetime.datetime.strptime(room_data['time_stamp'], '%Y-%m-%d %H:%M:%S.%f%z')
            # >= self.time_delta ):
                del self.rooms_data[room_id] # удаляем комнату
                del self.chat_history[room_id] # так же удаляем комнату в истории


    async def connect(self):
        """Обрабатывает подключение пользователя, создаёт/удаляет комнату,
        отслеживает количество открытых вкладок у пользователя,
        отправляет все необходимые данные на фронт."""

        # print('\n>>> DEF CONNECT <<<')

        self.room_id = self.scope["url_route"]["kwargs"]["room_id"]
        self.room_group_name = f"dev_chat_{self.room_id}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        # получить headers cookies
        # decoded_headers = codecs.decode(self.scope['headers'][10][1], 'UTF-8').split('; ')
        # print('decoded_headers:', decoded_headers)

        await self.get_cookie_data()

        # print('SAVED_USERID:', self.saved_userid)
        # при первом входе используем сгенерированный userid и записываем его в saved_room cookies на фронте
        # при повторных входах всегда используем userid из saved_room cookies
        if self.saved_userid:
            self.userid = self.saved_userid
        else:
            self.userid = str(uuid4().hex)

        await self.rooms_data_handler()

        await self.connect_user_data_handler()

        await self.time_checking()

        # https://stackoverflow.com/a/61221741/19276507
        # cookie = {'Set-Cookie': 'key=value'}
        # await self.accept(subprotocol=(None, cookie)) # добавление cookies в ответ
        await self.accept() # сигнализируем каналам Django о том, что соединение с WebSocket установлено
        # await self.close() # отклоняем соединение

        await self.group_send('room_creator', self.rooms_data[self.room_id]['room_creator'])

        # при подключении отправляем данные, только пользователю который сейчас подключился (отправителю)
        await self.send_json({"userid": self.userid})
        await self.send_json({"message": self.rooms_data[self.room_id]['chat_text']})

        # если комната закрыта создателем комнаты,
        # тогда отправляем историю чата только пользователю который сейчас подключился (отправителю)
        if self.rooms_data[self.room_id]['lock_room']:
            await self.send_json({"chat_history": self.chat_history[self.room_id]})

        await self.group_send('active_consumers', self.rooms_data[self.room_id]['active_consumers'])

        # print('ROOMS_DATA:', json.dumps(self.rooms_data, indent=4, ensure_ascii=False))
        # print()


    async def disconnect(self, code: int):
        """Обрабатывает отключение пользователя,
        удаляет пользователя из rooms_data при выходе со всех вкладок,
        иначе уменьшает количество открытых вкладок,
        отправляет все необходимые данные на фронт."""

        # print('>>> DEF DISCONNECT <<<')

        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

        await self.disconnect_user_data_handler()

        await self.group_send('active_consumers', self.rooms_data[self.room_id]['active_consumers'])

        # print('ROOMS_DATA:', json.dumps(self.rooms_data, indent=4, ensure_ascii=False))
        # print()


    async def receive_json(self, content: dict, **kwargs):
        """Принимает сообщения переданные с фронта, обрабатывает их,
        и отправляет все необходимые данные обратно на фронт."""

        # print('>>> DEF RECEIVE <<<')

        message = content.get("message")
        if message is not None:
            # print('MESSAGE:', repr(message))

            self.rooms_data[self.room_id]['chat_text'] = message

            await self.group_send('message', self.rooms_data[self.room_id]['chat_text'])

            # print('ROOMS_DATA:', json.dumps(self.rooms_data, indent=4, ensure_ascii=False))
            # print()

        users_curs_pos = content.get("users_curs_pos")
        if users_curs_pos:
            # print('USERS_CURS_POS:', users_curs_pos)
            # записываю актуальные координаты курсоров пользователей
            for user_id in users_curs_pos:
                self.rooms_data[self.room_id]['active_consumers'][user_id]['cur_pos'] = users_curs_pos[user_id]

            await self.save_history()

            await self.group_send('cursor_data', self.rooms_data[self.room_id]['active_consumers'])

            # print('ROOMS_DATA:', json.dumps(self.rooms_data, indent=4, ensure_ascii=False))
            # print()

        selection_range = content.get("selection_range")
        if selection_range:
            # print('SELECTION_RANGE:', selection_range)
            selection_data = {
                self.userid: {
                    'selection_range': selection_range,
                    'username': self.rooms_data[self.room_id]['active_consumers'][self.userid]['username'],
                    'user_color': self.rooms_data[self.room_id]['active_consumers'][self.userid]['user_color']
                }
            }
            await self.group_send('selection_data', selection_data)

        user_data = content.get("user_data")
        if user_data:
            # print('USER_DATA:', user_data)
            self.rooms_data[self.room_id]['active_consumers'][self.userid]['username'] = user_data['username']
            self.rooms_data[self.room_id]['active_consumers'][self.userid]['user_color'] = user_data['user_color']

            await self.group_send('active_consumers', self.rooms_data[self.room_id]['active_consumers'])

            # print('ROOMS_DATA:', json.dumps(self.rooms_data, indent=4, ensure_ascii=False))
            # print()

        room_state = content.get("room_state")
        if room_state and self.chat_history[self.room_id]:

            if room_state == 'lock':
                self.rooms_data[self.room_id]['lock_room'] = True
                await self.group_send('chat_history', self.chat_history[self.room_id])

            elif room_state == 'unlock':
                self.rooms_data[self.room_id]['lock_room'] = False
                await self.group_send('chat_history', 'unlock')

            # print('CHAT_HISTORY:', json.dumps(self.chat_history[self.room_id], indent=4, ensure_ascii=False))
            # print()


    # https://stackoverflow.com/questions/52210782/django-channels-group-send-exclude-the-data-sender
    # вместо channel_name можно использовать userid для отправки вне потребителя
    async def group_send(self, key: str, val: Any):
        """Обработчик для снижения дублирования кода, передаёт доп. параметр sender_channel_name
        для пропуска отправителя при групповой отправке."""

        await self.channel_layer.group_send(
            self.room_group_name, {
                # "type": "send.message",
                "type": "send_message",
                key: val,
                'sender_channel_name': self.channel_name
            }
        )


    async def send_message(self, event: dict):
        """Принимает ивент и отправляет его всем/[всем кроме отправителя] подключенным потребителям на фронт."""

        message = event.get("message")
        if message is not None:
            # пропускаем отправителя для отправки
            # (т.к. для обновления чата у себя между вкладками лучше использовать localStorage на фронте)
            # https://stackoverflow.com/questions/52210782/django-channels-group-send-exclude-the-data-sender/57035230#57035230
            if self.channel_name != event['sender_channel_name']: # отправить всем, кроме отправителя
                await self.send_json({"message": message})

        cursor_data = event.get("cursor_data")
        if cursor_data:
            # отправляю информацию о перемещении курсора всем пользователям кроме отправителя
            if self.channel_name != event['sender_channel_name']:
                await self.send_json({"cursor_data": cursor_data})

        selection_data = event.get("selection_data")
        if selection_data:
            # отправляю информацию о перемещении курсора всем пользователям кроме отправителя
            if self.channel_name != event['sender_channel_name']:
                await self.send_json({"selection_data": selection_data})

        active_consumers = event.get("active_consumers")
        if active_consumers:
            await self.send_json({"active_consumers": active_consumers})

        room_creator = event.get("room_creator")
        if room_creator:
            await self.send_json({"room_creator": room_creator})

        chat_history = event.get("chat_history")
        if chat_history:
            await self.send_json({"chat_history": chat_history})


    async def save_history(self):
        """Сохраняет историю сообщений/передвижений курсора в chat_history
        при этом генерируя сообщения пустышки перед первым сообщением каждого пользователя."""

        # использую глубокое копирование для вложенных данных а именно для active_consumers
        deep_copied_rooms_data = deepcopy(self.rooms_data[self.room_id])

        # для снижения объёма данных удаляю не нужные поля
        del deep_copied_rooms_data['time_stamp']
        del deep_copied_rooms_data['room_creator']
        del deep_copied_rooms_data['lock_room']
        del deep_copied_rooms_data['active_consumers'][self.userid]['page_count']

        deep_copied_rooms_data['create_time'] = time.time()

        deep_copied_rooms_data['sender'] = {self.userid: deep_copied_rooms_data['active_consumers'][self.userid]}
        del deep_copied_rooms_data['active_consumers']

        # единоразово для каждого уникального пользователя создаю сообщение пустышку для того чтобы была возможность
        # определять стартовую точку активности пользователя для удаления его курсора
        exists_user_ids = {list(item['sender'])[0] for item in self.chat_history[self.room_id]}

        if self.userid not in exists_user_ids:

            self.chat_history[self.room_id].append({
                'chat_text': '',
                'create_time': deep_copied_rooms_data['create_time'],
                'sender': {
                    self.userid: {
                        'username': deep_copied_rooms_data['sender'][self.userid]['username'],
                        'user_color': '#00000000', # нулевая прозрачность
                        'cur_pos': None
                        # 'cur_pos': {'row': 0, 'column': 0} # если не хотим чтобы курсор пропадал
                    }
                }
            })

        # print(deep_copied_rooms_data)
        # сохраняю снимок состояния чата для истории
        self.chat_history[self.room_id].append(deep_copied_rooms_data)

        # print('CHAT_HISTORY:', json.dumps(self.chat_history[self.room_id], indent=4, ensure_ascii=False))
        # print()

#############################################################################
