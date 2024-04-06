from django.http.cookie import SimpleCookie
from django.test import TestCase
from django.urls import reverse

# from http.cookies import SimpleCookie


#############################################################################


class TestViewWithCookies(TestCase):
    def test_1(self):
        self.client.cookies = SimpleCookie({'mykey': 'myval'})

        response = self.client.get(reverse('home'))

        print('cookies.items:', response.client.cookies.items())

        print('\nresponse.context:', response.context[0])

        self.assertEqual(response.status_code, 200)


#############################################################################


class Test1(TestCase):
    # вызывается один раз при инициализации всего класса
    @classmethod
    def setUpTestData(cls):
        print('def setUpTestData')

    # вызывается перед каждым вызовом тестового метода
    def setUp(self):
        print('def setUp')

    # вызывается после выполнения каждого тестового метода
    def tearDown(self):
        print('def tearDown')

    def test_1(self):
        print('def test_1')

    def test_2(self):
        print('def test_2')


#############################################################################
