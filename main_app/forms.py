# from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.core.files.images import get_image_dimensions
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.contrib.auth.forms import (
    UserCreationForm, AuthenticationForm, PasswordResetForm,
    SetPasswordForm, PasswordChangeForm
)
from django.forms import (
    BooleanField, CheckboxInput, ModelForm, EmailField, EmailInput,
    SelectDateWidget, Textarea, ValidationError, SelectMultiple, TextInput
)

from snowpenguin.django.recaptcha2.fields import ReCaptchaField
from snowpenguin.django.recaptcha2.widgets import ReCaptchaWidget

from main_app.models import CustomUser, ContactMe, Comments

from mptt.forms import TreeNodeChoiceField

import math
from datetime import datetime


# Поля джанго
# https://metanit.com/python/django/4.2.php

#############################################################################

class RegisterForm(UserCreationForm):
    """#### Форма для страницы регистрации."""

    captcha = ReCaptchaField(widget=ReCaptchaWidget(theme='dark'))

    accept_terms = BooleanField(widget=CheckboxInput(attrs={'_ngcontent-xpp-c83': "", 'class': "checkbox"}))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['username'].widget.attrs["autofocus"] = False
        self.fields['username'].widget.attrs['_ngcontent-xpp-c83'] = ""
        self.fields['username'].widget.attrs['placeholder'] = _('Имя пользователя')
        self.fields['username'].widget.attrs["style"] = "font-family: sans-serif; font-size: 16px;"

        self.fields['password1'].widget.attrs['_ngcontent-xpp-c83'] = ""
        self.fields['password1'].widget.attrs['placeholder'] = _('Пароль')
        self.fields['password1'].widget.attrs["style"] = "font-family: sans-serif; font-size: 16px;"

        self.fields['password2'].widget.attrs['_ngcontent-xpp-c83'] = ""
        self.fields['password2'].widget.attrs['placeholder'] = _('Подтвердите пароль')
        self.fields['password2'].widget.attrs["style"] = "font-family: sans-serif; font-size: 16px;"

        self.fields['email'].widget.attrs['_ngcontent-xpp-c83'] = ""
        self.fields['email'].widget.attrs['placeholder'] = _('Адрес электронной почты')
        self.fields['email'].widget.attrs["style"] = "font-family: sans-serif; font-size: 16px;"


    class Meta:
        # требуется связь с моделью пользователя
        model = CustomUser
        fields = ('username', 'password1', 'password2', 'email', 'accept_terms', 'captcha')


    def clean_email(self):
        new_email = self.cleaned_data.get('email', False)

        if new_email:
            if CustomUser.objects.filter(email=new_email).exists():
                raise ValidationError(_('Такой почтовый адрес уже существует.'))
            return new_email

#############################################################################

class LoginForm(AuthenticationForm):
    """#### Форма для страницы авторизации."""

    remember_me = BooleanField(required=False,
                               widget=CheckboxInput(attrs={'_ngcontent-xpp-c82': "",
                                                           'id': "stay-connected",
                                                           }))
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['username'].widget.attrs["autofocus"] = False
        self.fields['username'].widget.attrs['_ngcontent-xpp-c82'] = ""
        self.fields['username'].widget.attrs['placeholder'] = _('Имя пользователя')
        self.fields['username'].widget.attrs['style'] = "font-family: sans-serif; font-size: 16px;"

        self.fields['password'].widget.attrs['_ngcontent-xpp-c82'] = ""
        self.fields['password'].widget.attrs['placeholder'] = _('Пароль')
        self.fields['password'].widget.attrs['style'] = "font-family: sans-serif; font-size: 16px;"

    class Meta:
        fields = ('username', 'password', 'remember_me')

#############################################################################

class PasswordResetCustomForm(PasswordResetForm):
    """#### Форма для страницы сброса пароля."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['email'].widget.attrs['_ngcontent-bgn-c87'] = ""
        self.fields['email'].widget.attrs['placeholder'] = _('Адрес электронной почты')
        self.fields['email'].widget.attrs['style'] = "font-family: sans-serif; font-size: 16px;"


    class Meta:
        fields = ('email',)


    def clean_email(self):
        new_email = self.cleaned_data.get('email', False)

        if new_email:
            if not CustomUser.objects.filter(email=new_email).exists():
                raise ValidationError(_('Такого почтового адреса не существует.'))
            return new_email

#############################################################################

class PasswordResetConfirmForm(SetPasswordForm):
    """#### Форма для страницы ввода нового пароля."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['new_password1'].widget.attrs['placeholder'] = _('Новый пароль')
        self.fields['new_password2'].widget.attrs['placeholder'] = _('Подтвердите пароль')

        for field in self.fields:
            self.fields[field].widget.attrs['_ngcontent-otd-c88'] = ""
            self.fields[field].widget.attrs['style'] = "font-family: sans-serif; font-size: 16px;"

    class Meta:
        fields = ('new_password1', 'new_password2')

#############################################################################

# https://docs.djangoproject.com/en/4.0/ref/forms/fields/
class ContactMeForm(ModelForm):
    """#### Форма для страницы обратной связи."""

    captcha = ReCaptchaField(widget=ReCaptchaWidget(theme='dark'))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['email'].widget.attrs['_ngcontent-xpp-c83'] = ""
        self.fields['email'].widget.attrs['placeholder'] = _('Адрес электронной почты')
        self.fields['email'].widget.attrs["style"] = "font-family: sans-serif; font-size: 16px;"

    class Meta:
        model = ContactMe

        fields = ('email', 'message', 'captcha')

        widgets = {'message': Textarea(attrs={'_ngcontent-xpp-c83': '',
                                              'placeholder': _('Напишите ваше обращение к администрации сайта'),
                                              'style': 'font-family: sans-serif; font-size: 16px;',
                                            #   'cols': '40', 'rows': '10',
                                              })}

#############################################################################

class AccountSettingsForm(ModelForm):
    """#### Форма для страницы с настройками аккаунта."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # user = kwargs.get('instance')
        # if user:
            # print('user:', user, user.email)

        self.fields['avatar'].required = False

        # self.fields['first_name'].widget.attrs['value'] = 'значение'
        # self.fields['first_name'].initial = 'значение' # тоже самое что и ['value']
        self.fields['first_name'].widget.attrs['_ngcontent-gox-c51'] = ""
        self.fields['first_name'].widget.attrs['style'] = "font-family: sans-serif; font-size: 17px;"

        self.fields['last_name'].widget.attrs['_ngcontent-gox-c51'] = ""
        self.fields['last_name'].widget.attrs['style'] = "font-family: sans-serif; font-size: 17px;"

        # пустое поле появится только если включен blank=True в модели
        self.fields['gender'].widget.choices[0] = ('', '') # подмена дефолтных тире на пустую строку
        self.fields['gender'].widget.attrs['class'] = 'select-gender'
        self.fields['gender'].widget.attrs['style'] = "font-family: sans-serif; font-size: 16px;"

        self.fields['discord_username'].widget.attrs['_ngcontent-gox-c51'] = ""
        self.fields['discord_username'].widget.attrs['style'] = "font-family: sans-serif; font-size: 17px;"

        self.fields['battlenet_username'].widget.attrs['_ngcontent-gox-c51'] = ""
        self.fields['battlenet_username'].widget.attrs['style'] = "font-family: sans-serif; font-size: 17px;"

        self.fields['twitch_link'].widget.attrs['_ngcontent-gox-c51'] = ""
        self.fields['twitch_link'].widget.attrs['style'] = "font-family: sans-serif; font-size: 17px;"


    class Meta:
        # требуется связь с моделью пользователя
        model = CustomUser
        fields = ('avatar', 'first_name', 'last_name', 'birth_date', 'gender', 'game_class',
                  'discord_username', 'battlenet_username', 'twitch_link')

        widgets = {
            # https://django.fun/ru/articles/tutorials/kak-podklyuchit-vidzhet-vybora-daty-v-django/
            # https://django.fun/ru/docs/django/4.1/ref/forms/widgets/#selectdatewidget
            'birth_date': SelectDateWidget(years=range(1930, datetime.now().year),
                                           attrs={'class': 'select-birth-date',
                                                  'style': "font-family: sans-serif; font-size: 16px;"},
                                           # пустые поля появятся только если включен blank=True в модели
                                           empty_label=('', '', '')), # подмена дефолтных тире на пустые строки

            'game_class': SelectMultiple(attrs={'class': 'chosen-select'}),
        }


    def validate_twitch_link(self, url: str) -> str:
        """Проверяет ссылку на корректность, если ссылка подходящая но в укороченном виде, дополняет её."""

        if url[:22] == 'https://www.twitch.tv/':
            return url
        elif url[:14] == 'www.twitch.tv/':
            return 'https://' + url
        elif url[:10] == 'twitch.tv/':
            return 'https://www.' + url
        else:
            raise ValidationError(_('Неправильная ссылка.'))


    # метод clean_<название-поля> возвращает объект который будет сохранён в БД при отсутствии ошибок
    def clean_twitch_link(self):
        twitch_link = self.cleaned_data.get('twitch_link', False)

        if twitch_link:
            full_url = self.validate_twitch_link(twitch_link)
            if full_url:
                return full_url


    def humanize_size(self, bytes: int, decimals: int=1) -> str:
        """Конвертирует байты в крайний объем информации для переданного объёма байт,
        и оставляет 1 знак после запятой (по умолчанию),
        так же добавляет суффикс в конце строки."""

        if bytes == 0: return '0'
        suffixes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        power = math.floor(math.log(bytes, 1024))
        # return f'{round(bytes / math.pow(1024, power), decimals)} {suffixes[power]}'
        # return f'{bytes / math.pow(1024, power):.{decimals}f} {suffixes[power]}'
        return f'{bytes / math.pow(1024, power):.{decimals}f}'.rstrip('0').rstrip('.') + f' {suffixes[power]}'


    def clean_avatar(self):
        """>>> Проверяет загружаемый пользователем аватар на максимально допустимое
        разрешение 1920х1920 и объём 6МБ, если предел превышен возбуждает исключение."""

        avatar: InMemoryUploadedFile = self.cleaned_data.get('avatar', False)

        if avatar:

            limit = (1024 * 1024) * 6 # 6 МБ

            width, height = get_image_dimensions(avatar)

            resolution = str(width) + 'x' + str(height)
            size = self.humanize_size(avatar.size)

            resolution_error = _('Загружаемый файл должен иметь разрешение не более 1920x1920 пикселей, \
                ваш файл имеет разрешение ') + resolution + _(' пикселей') + '.'
            size_error = _('Загружаемый файл должен иметь объём не более 6МБ, ваш файл имеет объём ') + size + '.'

            if ( width > 1920 or height > 1920 ) and ( avatar.size > limit ):
                # в ValidationError можно передавать несколько ошибок в формате списка
                raise ValidationError([resolution_error, size_error])

            elif width > 1920 or height > 1920:
                raise ValidationError(resolution_error)

            elif avatar.size > limit:
                raise ValidationError(size_error)

            return avatar

#############################################################################

class PasswordChangeCustomForm(PasswordChangeForm):
    """#### Форма для страницы смены пароля внутри аккаунта."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['old_password'].widget.attrs["autofocus"] = False
        self.fields['old_password'].widget.attrs['placeholder'] = _('Текущий пароль')

        self.fields['new_password1'].widget.attrs['placeholder'] = _('Новый пароль')

        self.fields['new_password2'].widget.attrs['placeholder'] = _('Подтвердите пароль')

        for field in self.fields:
            self.fields[field].widget.attrs['_ngcontent-xcm-c64'] = ""
            self.fields[field].widget.attrs['style'] = "font-family: sans-serif; font-size: 16px;"

    class Meta:
        fields = ('old_password', 'new_password1', 'new_password2')

#############################################################################

class AccountEmailForm(ModelForm):
    """#### Форма для страницы смены почты внутри аккаунта."""

    new_email = EmailField(max_length=254,
                           widget=EmailInput(attrs={'_ngcontent-xcm-c63': '',
                                                    'placeholder': _('Новый почтовый адрес'),
                                                    'style': 'font-family: sans-serif; font-size: 16px;',
                                                    "autocomplete": "off",
                                                    }))

    class Meta:
        # требуется связь с моделью пользователя
        model = CustomUser
        fields = ('new_email',)


    def clean_new_email(self):
        """Проверяет наличие введённого пользователем адреса электронной почты в БД,
        если такая почта уже существует, возбуждает исключение."""

        new_email = self.cleaned_data.get('new_email', False)

        if new_email:
            if CustomUser.objects.filter(email=new_email).exists():
                raise ValidationError(_('Такой почтовый адрес уже существует.'))
            return new_email

#############################################################################

class CommentsForm(ModelForm):
    """#### Форма для отправки комментариев."""

    parent = TreeNodeChoiceField(queryset=Comments.objects.all())

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['parent'].widget.attrs.update({'class': 'd-none'})
        self.fields['parent'].label = ''
        self.fields['parent'].required = False


    class Meta:
        model = Comments
        fields = ('parent', 'content')

        widgets = {
            'name': TextInput(attrs={'class': 'col-sm-12'}),
            'email': TextInput(attrs={'class': 'col-sm-12'}),
            'content': Textarea(attrs={'class': 'first-textarea',
                                       'cols': "40", 'rows': "1",
                                       "placeholder": _('Введите текст комментария'),
                                       })}


    def save(self, *args, **kwargs):
        """Перед сохранением формы необходимо произвести перестройку дерева методом rebuild."""

        Comments.objects.rebuild()
        return super(CommentsForm, self).save(*args, **kwargs)

#############################################################################
