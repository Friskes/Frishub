from django.test import TestCase

from main_app.forms import LoginForm
from main_app.models import CustomUser

#############################################################################


# python manage.py test main_app.tests.test_forms.TestLoginForm
class TestLoginForm(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.form_data = {'username': 'user1', 'password': 'user1', 'remember_me': False}
        cls.user1 = CustomUser.objects.create_user(
            cls.form_data['username'], 'user1@gmail.com', cls.form_data['password']
        )

    def test_form_is_valid(self):
        form = LoginForm(data=self.form_data)
        self.assertTrue(form.is_valid())
        # print(form)
        # print(form.fields)
        # print(form.data)
        # print(form.cleaned_data)
        self.assertEqual(form.cleaned_data, self.form_data)
        self.assertTrue(form.fields['username'].label == 'Имя пользователя')
        self.assertTrue(form.fields['password'].label == 'Пароль')


#############################################################################
