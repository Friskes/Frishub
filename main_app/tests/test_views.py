from django.test import TestCase, SimpleTestCase, LiveServerTestCase, Client, TransactionTestCase


#############################################################################

# https://betterprogramming.pub/testing-a-django-application-with-pytest-3615df7e81f8

# pytest -v -s main_app/tests/test_views.py::Test1::test_1
# python manage.py test main_app.tests.test_views.Test1.test_1

class Test1(TestCase):

    def test_1(self):

        client = Client()

        response = client.get('/login')

        assert response.status_code == 200

#############################################################################
