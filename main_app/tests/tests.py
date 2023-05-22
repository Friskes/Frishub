from django.test import TestCase, SimpleTestCase, LiveServerTestCase, Client, TransactionTestCase
from django.utils.crypto import get_random_string

# https://pytest-django.readthedocs.io/en/latest/tutorial.html
# pip install pytest
# pip install pytest-django
import pytest

import asyncio
from asgiref.sync import sync_to_async, async_to_sync

from channels.testing import WebsocketCommunicator, ChannelsLiveServerTestCase

from FriskesSite.asgi import application
from FriskesSite import settings

from uuid import uuid4
import string
from typing import List, Union
from random import randint


# Create your tests here.

#############################################################################

class UtilsForTest:

    user_counter = 0

    @sync_to_async
    def get_random_hex_color(self):
        return '#%06x' % randint(0, 256**3-1)


    @sync_to_async
    def get_userid(self) -> str:
        return str(uuid4().hex)
        # return get_random_string(32, string.ascii_lowercase + string.digits)


    @sync_to_async
    def get_username(self) -> str:
        self.user_counter += 1
        return 'User' + str(self.user_counter)


    async def gen_communicators(self, count: int=1, userid: str=None, username: str=None, start_url: str=None,
        room_id: str=None) -> Union[WebsocketCommunicator, List[WebsocketCommunicator]]:
        """- без указания количества пользователей - генерируется один пользователь
        - при указании id пользователя - генерируется один пользователь с указанным id
        - при указании id комнаты - генерируется одна комната с указанным id
        - если id не указан, он генерируется случайным образом"""

        if start_url is None: raise TypeError('Параметр start_url является обязательным.')

        communicators = []
        for _ in range(count):

            if userid is None: userid = await self.get_userid()

            if username is None: username = await self.get_username()

            if room_id is None: room_id = str(uuid4())

            saved_room = {'userid': userid, 'username': username, 'user_color': await self.get_random_hex_color()}
            raw_saved_room = str(saved_room).replace(" ", "").replace("'", "%22").replace(",", "%2C")
            headers = [(b'cookie',
                        f'saved_room={raw_saved_room}'.encode('ascii')
                      )]

            communicator = WebsocketCommunicator(
                application=application,
                path=start_url + room_id,
                # path='/dev-chat/fb133adc-7f3f-41b4-a8d0-d5089a7a82c1',
                headers=headers
            )

            communicator.scope['userid'] = userid
            communicator.scope['username'] = username
            communicator.scope['room_id'] = room_id
            communicator.scope['user_color'] = saved_room['user_color']

            if count == 1: return communicator

            communicators.append(communicator)
        return communicators

#############################################################################

# https://channels.readthedocs.io/en/latest/topics/testing.html

# pytest -v -s main_app/tests/tests.py::TestDevChat
# pytest -v -s main_app/tests/tests.py::TestDevChat::test_basic_functionality

# для того чтобы добавить что то в headers необходимо использовать ChannelsLiveServerTestCase либо TransactionTestCase
class TestDevChat(ChannelsLiveServerTestCase, UtilsForTest):
    serve_static = True
# class TestDevChat(TransactionTestCase, UtilsForTest):

    actual_chat_text_data = {"message": ""}
    actual_cur_pos_data = {"users_curs_pos": {}}

    async def test_basic_functionality(self):
        # тест запускается на каком то непонятном хосте, поэтому разрешаем любые
        settings.ALLOWED_HOSTS += ['*']
        # print(self.live_server_url)

        # send_json_to - Эмулирует отправку даты с фронтенда которая придёт в метод receive потребителя
        # receive_json_from - Перехватывает дату которая приходит в метод receive потребителя

        ##################################################################################################################
        # Создание первого пользователя
        self._1_ = await self.gen_communicators(start_url='/dev-chat/')

        # Подключение первого пользователя
        connected, subprotocol = await self._1_.connect()
        assert connected is True

        # Отправка и получение данных после подключения
        # После подключения, клиенту отправляются 4 сообщения
        response: dict = await self._1_.receive_json_from()
        assert response == {'userid': self._1_.scope['userid']}

        response: dict = await self._1_.receive_json_from()
        assert response == {'message': ''}

        response: dict = await self._1_.receive_json_from()
        assert response == {'room_creator': self._1_.scope['userid']}

        response: dict = await self._1_.receive_json_from()
        assert response == {'active_consumers': {
            self._1_.scope['userid']: {'page_count': 1, 'username': self._1_.scope['username'],
                                       'user_color': self._1_.scope['user_color'], 'cur_pos': None}
            }}

        # Эмуляция ввода текста первым пользователем (текст отправляется всем кроме отправителя)
        text = "def my_func(a, b):\n    return a**b\nprint(my_func(2, 2))\n"
        cur_pos = [{'row': 0, 'column': 1},{'row': 0, 'column': 2},{'row': 0, 'column': 3},{'row': 0, 'column': 4},
                   {'row': 0, 'column': 5},{'row': 0, 'column': 6},{'row': 0, 'column': 7},{'row': 0, 'column': 8},
                   {'row': 0, 'column': 9},{'row': 0, 'column': 10},{'row': 0, 'column': 11},{'row': 0, 'column': 12},
                   {'row': 0, 'column': 13},{'row': 0, 'column': 14},{'row': 0, 'column': 15},{'row': 0, 'column': 16},
                   {'row': 0, 'column': 17},{'row': 0, 'column': 18},{'row': 1, 'column': 0},{'row': 1, 'column': 1},
                   {'row': 1, 'column': 2},{'row': 1, 'column': 3},{'row': 1, 'column': 4},{'row': 1, 'column': 5},
                   {'row': 1, 'column': 6},{'row': 1, 'column': 7},{'row': 1, 'column': 8},{'row': 1, 'column': 9},
                   {'row': 1, 'column': 10},{'row': 1, 'column': 11},{'row': 1, 'column': 12},{'row': 1, 'column': 13},
                   {'row': 1, 'column': 14},{'row': 1, 'column': 15},{'row': 2, 'column': 0},{'row': 2, 'column': 1},
                   {'row': 2, 'column': 2},{'row': 2, 'column': 3},{'row': 2, 'column': 4},{'row': 2, 'column': 5},
                   {'row': 2, 'column': 6},{'row': 2, 'column': 7},{'row': 2, 'column': 8},{'row': 2, 'column': 9},
                   {'row': 2, 'column': 10},{'row': 2, 'column': 11},{'row': 2, 'column': 12},{'row': 2, 'column': 13},
                   {'row': 2, 'column': 14},{'row': 2, 'column': 15},{'row': 2, 'column': 16},{'row': 2, 'column': 17},
                   {'row': 2, 'column': 18},{'row': 2, 'column': 19},{'row': 2, 'column': 20},{'row': 3, 'column': 0}]
        await self.write_text(text, cur_pos, self._1_)
        ##################################################################################################################

        ##################################################################################################################
        # Создание второго пользователя в этой же комнате
        self._2_ = await self.gen_communicators(start_url='/dev-chat/', room_id=self._1_.scope['room_id'])

        # Подключение второго пользователя
        connected, subprotocol = await self._2_.connect()
        assert connected is True

        # Отправка и получение данных после подключения
        # После подключения, клиенту отправляются 4 сообщения
        response: dict = await self._2_.receive_json_from()
        assert response == {'userid': self._2_.scope['userid']}

        response: dict = await self._2_.receive_json_from()
        assert response == self.actual_chat_text_data

        response: dict = await self._2_.receive_json_from()
        # _1_ является создателем комнаты
        assert response == {'room_creator': self._1_.scope['userid']}

        response: dict = await self._2_.receive_json_from()
        assert response == {'active_consumers': {
            self._1_.scope['userid']: {'page_count': 1, 'username': self._1_.scope['username'],
                                       'user_color': self._1_.scope['user_color'], 'cur_pos': {'row': 3, 'column': 0}},
            self._2_.scope['userid']: {'page_count': 1, 'username': self._2_.scope['username'],
                                       'user_color': self._2_.scope['user_color'], 'cur_pos': None}
            }}

        # Получение данных первым пользователем после того как зашёл второй пользователь
        response: dict = await self._1_.receive_json_from(timeout=1)
        assert response == {'room_creator': self._1_.scope['userid']}

        response: dict = await self._1_.receive_json_from(timeout=1)
        assert response == {'active_consumers': {
            self._1_.scope['userid']: {'page_count': 1, 'username': self._1_.scope['username'],
                                       'user_color': self._1_.scope['user_color'], 'cur_pos': {'row': 3, 'column': 0}},
            self._2_.scope['userid']: {'page_count': 1, 'username': self._2_.scope['username'],
                                       'user_color': self._2_.scope['user_color'], 'cur_pos': None}
            }}

        # Эмуляция ввода текста вторым пользователем (текст отправляется всем кроме отправителя)
        text = "\nfunction my_func(a, b) {\n    return a**b;\n}\nconsole.log(my_func(2, 2));\n"
        cur_pos = [{'row': 4, 'column': 0},{'row': 4, 'column': 1},{'row': 4, 'column': 2},{'row': 4, 'column': 3},
                   {'row': 4, 'column': 4},{'row': 4, 'column': 5},{'row': 4, 'column': 6},{'row': 4, 'column': 7},
                   {'row': 4, 'column': 8},{'row': 4, 'column': 9},{'row': 4, 'column': 10},{'row': 4, 'column': 11},
                   {'row': 4, 'column': 12},{'row': 4, 'column': 13},{'row': 4, 'column': 14},{'row': 4, 'column': 15},
                   {'row': 4, 'column': 16},{'row': 4, 'column': 17},{'row': 4, 'column': 18},{'row': 4, 'column': 19},
                   {'row': 4, 'column': 20},{'row': 4, 'column': 21},{'row': 4, 'column': 22},{'row': 4, 'column': 23},
                   {'row': 4, 'column': 24},{'row': 5, 'column': 0},{'row': 5, 'column': 1},{'row': 5, 'column': 2},
                   {'row': 5, 'column': 3},{'row': 5, 'column': 4},{'row': 5, 'column': 5},{'row': 5, 'column': 6},
                   {'row': 5, 'column': 7},{'row': 5, 'column': 8},{'row': 5, 'column': 9},{'row': 5, 'column': 10},
                   {'row': 5, 'column': 11},{'row': 5, 'column': 12},{'row': 5, 'column': 13},{'row': 5, 'column': 14},
                   {'row': 5, 'column': 15},{'row': 5, 'column': 16},{'row': 6, 'column': 0},{'row': 6, 'column': 1},
                   {'row': 7, 'column': 0},{'row': 7, 'column': 1},{'row': 7, 'column': 2},{'row': 7, 'column': 3},
                   {'row': 7, 'column': 4},{'row': 7, 'column': 5},{'row': 7, 'column': 6},{'row': 7, 'column': 7},
                   {'row': 7, 'column': 8},{'row': 7, 'column': 9},{'row': 7, 'column': 10},{'row': 7, 'column': 11},
                   {'row': 7, 'column': 12},{'row': 7, 'column': 13},{'row': 7, 'column': 14},{'row': 7, 'column': 15},
                   {'row': 7, 'column': 16},{'row': 7, 'column': 17},{'row': 7, 'column': 18},{'row': 7, 'column': 19},
                   {'row': 7, 'column': 20},{'row': 7, 'column': 21},{'row': 7, 'column': 22},{'row': 7, 'column': 23},
                   {'row': 7, 'column': 24},{'row': 7, 'column': 25},{'row': 7, 'column': 26},{'row': 7, 'column': 27},
                   {'row': 8, 'column': 0}]
        await self.write_text(text, cur_pos, self._2_, self._1_)
        ##################################################################################################################

        ##################################################################################################################
        await self._1_.disconnect()

        # После отключения любого из пользователей, всем другим приходит active_consumers
        response: dict = await self._2_.receive_json_from()
        assert response == {'active_consumers': {
            self._2_.scope['userid']: {'page_count': 1, 'username': self._2_.scope['username'],
                                       'user_color': self._2_.scope['user_color'], 'cur_pos': {'row': 8, 'column': 0}},
            }}

        self._1_ = await self.gen_communicators(userid=self._1_.scope['userid'],
                                                username=self._1_.scope['username'],
                                                start_url='/dev-chat/',
                                                room_id=self._1_.scope['room_id'])

        # Повторное подключение первого пользователя
        connected, subprotocol = await self._1_.connect()
        assert connected is True

        response: dict = await self._2_.receive_json_from()
        assert response == {'room_creator': self._1_.scope['userid']}

        response: dict = await self._2_.receive_json_from()
        assert response == {'active_consumers': {
            self._2_.scope['userid']: {'page_count': 1, 'username': self._2_.scope['username'],
                                       'user_color': self._2_.scope['user_color'], 'cur_pos': {'row': 8, 'column': 0}},
            self._1_.scope['userid']: {'page_count': 1, 'username': self._1_.scope['username'],
                                       'user_color': self._1_.scope['user_color'], 'cur_pos': None}
            }}

        response: dict = await self._1_.receive_json_from()
        assert response == {'userid': self._1_.scope['userid']}

        response: dict = await self._1_.receive_json_from()
        assert response == self.actual_chat_text_data

        response: dict = await self._1_.receive_json_from()
        assert response == {'room_creator': self._1_.scope['userid']}

        response: dict = await self._1_.receive_json_from()
        assert response == {'active_consumers': {
            self._2_.scope['userid']: {'page_count': 1, 'username': self._2_.scope['username'],
                                       'user_color': self._2_.scope['user_color'], 'cur_pos': {'row': 8, 'column': 0}},
            self._1_.scope['userid']: {'page_count': 1, 'username': self._1_.scope['username'],
                                       'user_color': self._1_.scope['user_color'], 'cur_pos': None}
            }}
        ##################################################################################################################

        ##################################################################################################################
        # Первый пользователь блокирует комнату
        room_state = {'room_state': 'lock'}
        await self._1_.send_json_to(data=room_state)

        # всем приходит история чата
        # история слишком огромная поэтому проверяю только факт получения
        response: dict = await self._1_.receive_json_from()
        assert list(response.keys()) == ['chat_history']

        response: dict = await self._2_.receive_json_from()
        assert list(response.keys()) == ['chat_history']
        ##################################################################################################################

        ##################################################################################################################
        # Создание третьего пользователя в этой же комнате
        self._3_ = await self.gen_communicators(start_url='/dev-chat/', room_id=self._1_.scope['room_id'])

        connected, subprotocol = await self._3_.connect()
        assert connected is True

        response: dict = await self._1_.receive_json_from()
        assert response == {'room_creator': self._1_.scope['userid']}

        response: dict = await self._1_.receive_json_from()
        assert response == {'active_consumers': {
            self._2_.scope['userid']: {'page_count': 1, 'username': self._2_.scope['username'],
                                       'user_color': self._2_.scope['user_color'], 'cur_pos': {'row': 8, 'column': 0}},
            self._1_.scope['userid']: {'page_count': 1, 'username': self._1_.scope['username'],
                                       'user_color': self._1_.scope['user_color'], 'cur_pos': None},
            self._3_.scope['userid']: {'page_count': 1, 'username': self._3_.scope['username'],
                                       'user_color': self._3_.scope['user_color'], 'cur_pos': None}
            }}

        response: dict = await self._2_.receive_json_from()
        assert response == {'room_creator': self._1_.scope['userid']}

        response: dict = await self._2_.receive_json_from()
        assert response == {'active_consumers': {
            self._2_.scope['userid']: {'page_count': 1, 'username': self._2_.scope['username'],
                                       'user_color': self._2_.scope['user_color'], 'cur_pos': {'row': 8, 'column': 0}},
            self._1_.scope['userid']: {'page_count': 1, 'username': self._1_.scope['username'],
                                       'user_color': self._1_.scope['user_color'], 'cur_pos': None},
            self._3_.scope['userid']: {'page_count': 1, 'username': self._3_.scope['username'],
                                       'user_color': self._3_.scope['user_color'], 'cur_pos': None}
            }}

        response: dict = await self._3_.receive_json_from()
        assert response == {'userid': self._3_.scope['userid']}

        response: dict = await self._3_.receive_json_from()
        assert response == self.actual_chat_text_data

        response: dict = await self._3_.receive_json_from()
        assert list(response.keys()) == ['chat_history']

        response: dict = await self._3_.receive_json_from()
        assert response == {'room_creator': self._1_.scope['userid']}

        response: dict = await self._3_.receive_json_from()
        assert response == {'active_consumers': {
            self._2_.scope['userid']: {'page_count': 1, 'username': self._2_.scope['username'],
                                       'user_color': self._2_.scope['user_color'], 'cur_pos': {'row': 8, 'column': 0}},
            self._1_.scope['userid']: {'page_count': 1, 'username': self._1_.scope['username'],
                                       'user_color': self._1_.scope['user_color'], 'cur_pos': None},
            self._3_.scope['userid']: {'page_count': 1, 'username': self._3_.scope['username'],
                                       'user_color': self._3_.scope['user_color'], 'cur_pos': None}
            }}
        ##################################################################################################################

        # Отключение от сервера
        await self._1_.disconnect()
        await self._2_.disconnect()
        await self._3_.disconnect()


    async def write_text(self, text: str, cursor_pos: List[dict],
        sender: WebsocketCommunicator, *recipients: WebsocketCommunicator):

        for i in range(len(text)):
            self.actual_chat_text_data['message'] += text[i]
            self.actual_cur_pos_data['users_curs_pos'][sender.scope['userid']] = cursor_pos[i]

            await sender.send_json_to(data=self.actual_chat_text_data)
            await sender.send_json_to(data=self.actual_cur_pos_data)

            for recipient in recipients:
                response: dict = await recipient.receive_json_from(timeout=1)
                assert response == self.actual_chat_text_data

                response: dict = await recipient.receive_json_from(timeout=1)
                for userid, cur_pos in self.actual_cur_pos_data['users_curs_pos'].items():
                    assert cur_pos == response['cursor_data'][userid]['cur_pos']

            # при слишком низких значениях может пропускать часть символов и приводить к ошибкам.
            await asyncio.sleep(0.03)

#############################################################################
