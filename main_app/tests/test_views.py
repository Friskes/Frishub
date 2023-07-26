from django.test import TestCase, SimpleTestCase, Client, TransactionTestCase
from django.urls import reverse
from django.contrib import auth
from django.http.cookie import SimpleCookie
# from http.cookies import SimpleCookie

from unittest import TestCase as UnitTestCase

from main_app.models import DressingRoom, CustomUser

import json


# https://developer.mozilla.org/ru/docs/Learn/Server-side/Django/Testing
# https://docs.djangoproject.com/en/4.1/topics/testing/tools/

# python manage.py test main_app.tests.test_views              # запустить файл
# python manage.py test main_app.tests.test_views.Test1        # запустить класс
# python manage.py test main_app.tests.test_views.Test1.test_1 # запустить метод

# команда test может принимать параметр: --verbosity 2
# покажет более расширенный вывод в консоли, доступны значения (0, 1, 2) (по умолчанию 1)

# запуск с помощью модуля pytest
# pytest -v -s main_app/tests/test_views.py::Test1::test_1

#############################################################################

# python manage.py test main_app.tests.test_views.TestHomeView
class TestHomeView(TestCase):

    def test_status(self):
        response = self.client.get(reverse('home'))

        self.assertTemplateUsed(response, 'main_app/home.html')
        self.assertEqual(response.status_code, 200)

#############################################################################

# python manage.py test main_app.tests.test_views.TestLoginCustomView
class TestLoginCustomView(UnitTestCase): # у unittest необходимо вручную создавать экземпляр класса Client

    def setUp(self):
        self.client = Client()

    def test_login(self):
        response = self.client.get(reverse('login'))

        self.assertEqual(response.status_code, 200)
        self.assertTrue(self.client.login(username='admin', password='admin'))

#############################################################################

# python manage.py test main_app.tests.test_views.TestDevChatRoomView
class TestDevChatRoomView(TestCase):

    def test_redirect(self):
        room_id = '08db0135-b041-4824-98ff-4461a4105e5b'
        response = self.client.get(reverse('redirect_dev_chat_room', args=(room_id,)))

        self.assertRedirects(response, reverse('dev_chat_room', args=(room_id,)), status_code=301)

#############################################################################

# python manage.py test main_app.tests.test_views.TestArenaPointCalculatorView
class TestArenaPointCalculatorView(TestCase):
    def test_post_request(self):
        post_data = {'bracket2x2': '2222', 'bracket3x3': '0', 'bracket5x5': '0', 'server_type': 'true'}
        response = self.client.post(reverse('ap_calculator'), data=post_data)

        self.assertEqual(response.status_code, 200)
        resp_data = {'bracket2x2': 978, 'bracket3x3': 0, 'bracket5x5': 0}
        self.assertEqual(response.json(), resp_data)

#############################################################################

# python manage.py test main_app.tests.test_views.TestUniqueDressingRoomView
class TestUniqueDressingRoomView(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.room_id = '08db0135-b041-4824-98ff-4461a4105e5b'
        cls.non_existent_room_id = 'f5da3b90-8f99-41d5-b4f1-8bf5c717ac3a'
        cls.non_creator_id = '8f94963bf50748d6b5d7b8bf7d0d7c2a'
        cls.context_1 = json.dumps({
            "room_creator": True,
            "allow_edit": False,
            "game_patch": "wrath",
            "race": 1,
            "gender": 1,
            "items": "",
            "face": "0,0,0,0,0",
            "mount": "0",
            "my_saved_rooms": []
        })
        cls.context_2 = json.dumps({
            "room_creator": True,
            "allow_edit": False,
            "game_patch": "wrath",
            "race": 2,
            "gender": 0,
            "items": "",
            "face": "0,1,3,0,2",
            "mount": "0",
            "my_saved_rooms": []
        })
        cls.context_3 = json.dumps({
            "room_creator": False,
            "allow_edit": False,
            "game_patch": "wrath",
            "race": 2,
            "gender": 0,
            "items": "",
            "face": "0,1,3,0,2",
            "mount": "0",
            "my_saved_rooms": []
        })
        cls.context_4 = json.dumps({
            "room_creator": False,
            "allow_edit": True,
            "game_patch": "live",
            "race": 2,
            "gender": 0,
            "items": "",
            "face": "",
            "mount": "0",
            "my_saved_rooms": []
        })
        cls.post_data_1 = {'allow_edit': False, 'game_patch': 'wrath',
        'race': 2, 'gender': 0, 'items': '', 'face': '0,1,3,0,2', 'mount': '0'}
        cls.post_data_2a = {'allow_edit': True, 'game_patch': 'live',
        'race': 2, 'gender': 0, 'items': '', 'face': '0,1,3,0,2', 'mount': '0'}
        cls.post_data_2b = {'allow_edit': True, 'game_patch': 'live',
        'race': 2, 'gender': 0, 'items': '', 'face': '', 'mount': '0'}
        cls.post_data_3 = {'allow_edit': False, 'game_patch': 'live',
        'race': 2, 'gender': 0, 'items': '', 'face': '', 'mount': '0'}
        cls.user1_username = cls.user1_password = 'user1'
        cls.user2_username = cls.user2_password = 'user2'
        cls.user1_email, cls.user2_email = 'user1@gmail.com', 'user2@gmail.com'
        # https://stackoverflow.com/a/33294746/19276507
        # cls.user1 = CustomUser.objects.create(username=cls.user1_username, email=cls.user1_email)
        # cls.user1.set_password(cls.user1_password)
        # cls.user1.save()
        # cls.user1 = CustomUser.objects.create_superuser(cls.user1_username, cls.user1_email, cls.user1_password)
        cls.user1 = CustomUser.objects.create_user(cls.user1_username, cls.user1_email, cls.user1_password)
        cls.user2 = CustomUser.objects.create_user(cls.user2_username, cls.user2_email, cls.user2_password)
        cls.client2: Client = cls.client_class()


    def test_main(self):
        ##### Создание комнаты будучи не авторизованным #####
        _, self.cookie_1 = self.assert_get_request(self.client, self.room_id, self.context_1)
        self.assertIsNotNone(self.cookie_1)

        fields_data = {'room_id': self.room_id, 'room_creator_id': self.cookie_1,
        'allow_edit': False, 'game_patch': 'wrath', 'race': 1, 'gender': 1,
        'items': '', 'face': '0,0,0,0,0', 'mount': '0', 'creator': None}
        self.assert_db_fields(self.user1.pk, fields_data)

        self.assert_post_request(self.client, self.non_existent_room_id, 404) # Http404

        self.client.cookies = SimpleCookie({'dress_room_creator_id': self.non_creator_id})
        self.assert_post_request(self.client, self.room_id, 403) # PermissionDenied
        self.client.cookies = SimpleCookie({'dress_room_creator_id': self.cookie_1})


        ##### Изменение данных комнаты будучи не авторизованным #####
        self.assert_post_request(self.client, self.room_id, 200, self.post_data_1)

        self.assert_db_fields(self.user1.pk, self.post_data_1)


        ##### Повторный вход в комнату будучи авторизованным #####
        self.assertTrue(self.client.login(username=self.user1_username, password=self.user1_password))

        _, self.cookie_2 = self.assert_get_request(self.client, self.room_id, self.context_2)
        self.assertEqual(self.cookie_2, self.cookie_1)

        fields_data = {'room_id': self.room_id, 'room_creator_id': self.cookie_2,
        'allow_edit': False, 'game_patch': 'wrath', 'race': 2, 'gender': 0,
        'items': '', 'face': '0,1,3,0,2', 'mount': '0', 'creator': CustomUser}
        self.assert_db_fields(self.user1.pk, fields_data)


        ##### Повторный вход в комнату с отсутствием cookie будучи не авторизованным #####
        # del response.client.cookies['dress_room_creator_id']
        # response.client.cookies.pop('dress_room_creator_id')
        # del response.client.cookies
        # response.client.cookies.clear()
        self.client.logout()
        _, self.cookie_3 = self.assert_get_request(self.client, self.room_id, self.context_3)

        self.assertIsNone(self.cookie_3)
        self.assert_db_fields(self.user1.pk, fields_data)


        ##### Повторный вход в комнату с отсутствием cookie будучи авторизованным #####
        self.assertTrue(self.client.login(username=self.user1_username, password=self.user1_password))

        _, self.cookie_4 = self.assert_get_request(self.client, self.room_id, self.context_2)

        self.assertEqual(self.cookie_4, self.cookie_1)
        self.assert_db_fields(self.user1.pk, fields_data)


        ##### Разрешение редактирования комнаты другим пользователям и смена патча #####
        self.assert_post_request(self.client, self.room_id, 200, self.post_data_2a)

        self.assert_db_fields(self.user1.pk, self.post_data_2b)


        ##### Изменение комнаты не создателем комнаты #####
        # print('_auth_user_id' in self.client.session)
        # print(int(self.client.session.get('_auth_user_id', 0)) == self.user1.pk)
        # print(auth.get_user(self.client).is_authenticated)

        _, self.cookie_5 = self.assert_get_request(self.client2, self.room_id, self.context_4)

        self.assertTrue(self.client2.login(username=self.user2_username, password=self.user2_password))
        self.assert_post_request(self.client2, self.room_id, 403, self.post_data_3) # PermissionDenied


    def assert_db_fields(self, user_pk: int, fields_data: dict):
        dressing_room = DressingRoom.objects.get(pk=user_pk)

        for field_name, value in fields_data.items():
            field_value = getattr(dressing_room, field_name)
            if value is not CustomUser:
                self.assertEqual(field_value, value)
            else:
                self.assertIsInstance(field_value, value)


    def assert_get_request(self, client: Client, room_id: str, context: dict):
        response = client.get(reverse('unique_dressing_room', args=(room_id,)))
        self.assertTemplateUsed(response, 'main_app/dressing_room.html')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context['character_data'], context)
        cookie = getattr(dict(response.client.cookies.items()).get('dress_room_creator_id'), 'value', None)
        return response, cookie


    def assert_post_request(self, client: Client, room_id: str, code: int=200, data=None):
        response = client.post(reverse('unique_dressing_room', args=(room_id,)), data, 'application/json')
        self.assertEqual(response.status_code, code)
        return response

#############################################################################
