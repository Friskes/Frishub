from collections.abc import Callable
from datetime import datetime

from captcha.fields import ReCaptchaField
from captcha.widgets import ReCaptchaV2Checkbox
from django.contrib.auth.forms import (
    AuthenticationForm,
    PasswordChangeForm,
    PasswordResetForm,
    SetPasswordForm,
    UserCreationForm,
)
from django.core.exceptions import ValidationError
from django.core.files.images import get_image_dimensions
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.mail import EmailMultiAlternatives
from django.forms import (
    BooleanField,
    CheckboxInput,
    EmailField,
    EmailInput,
    ModelForm,
    SelectDateWidget,
    SelectMultiple,
    Textarea,
    TextInput,
)
from django.template import loader
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from FriskesSite.celery import celery_app
from mptt.forms import TreeNodeChoiceField
from pytils.translit import translify  # pip install pytils

from main_app.models import Comments, ContactMe, CustomUser
from main_app.services.services import humanize_size, validate_twitch_link

# Поля джанго
# https://metanit.com/python/django/4.2.php


class RegisterForm(UserCreationForm):
    """#### Форма для страницы регистрации."""

    captcha = ReCaptchaField(
        widget=ReCaptchaV2Checkbox(
            api_params={'onload': 'reCaptchaOnLoadCallback', 'hl': 'ru'},
            attrs={
                'data-theme': 'dark',
                # 'data-size': 'compact' # 'normal'
            },
        )
    )

    accept_terms = BooleanField(
        widget=CheckboxInput(attrs={'_ngcontent-xpp-c83': '', 'class': 'checkbox'})
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['username'].widget.attrs['autofocus'] = False
        self.fields['username'].widget.attrs['_ngcontent-xpp-c83'] = ''
        self.fields['username'].widget.attrs['placeholder'] = _('Имя пользователя')
        self.fields['username'].widget.attrs['style'] = 'font-family: sans-serif; font-size: 16px;'

        self.fields['password1'].widget.attrs['_ngcontent-xpp-c83'] = ''
        self.fields['password1'].widget.attrs['placeholder'] = _('Пароль')
        self.fields['password1'].widget.attrs['style'] = 'font-family: sans-serif; font-size: 16px;'

        self.fields['password2'].widget.attrs['_ngcontent-xpp-c83'] = ''
        self.fields['password2'].widget.attrs['placeholder'] = _('Подтвердите пароль')
        self.fields['password2'].widget.attrs['style'] = 'font-family: sans-serif; font-size: 16px;'

        self.fields['email'].widget.attrs['_ngcontent-xpp-c83'] = ''
        self.fields['email'].widget.attrs['placeholder'] = _('Адрес электронной почты')
        self.fields['email'].widget.attrs['style'] = 'font-family: sans-serif; font-size: 16px;'

    class Meta:
        # требуется связь с моделью пользователя
        model = CustomUser
        fields = ('username', 'password1', 'password2', 'email', 'accept_terms', 'captcha')

    def clean_email(self) -> str:
        new_email = self.cleaned_data.get('email', False)

        if new_email:
            if CustomUser.objects.filter(email=new_email).exists():
                raise ValidationError(_('Такой почтовый адрес уже существует.'))
            return new_email


class LoginForm(AuthenticationForm):
    """#### Форма для страницы авторизации."""

    remember_me = BooleanField(
        required=False, widget=CheckboxInput(attrs={'_ngcontent-xpp-c82': '', 'id': 'stay-connected'})
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['username'].widget.attrs['autofocus'] = False
        self.fields['username'].widget.attrs['_ngcontent-xpp-c82'] = ''
        self.fields['username'].widget.attrs['placeholder'] = _('Имя пользователя')
        self.fields['username'].widget.attrs['style'] = 'font-family: sans-serif; font-size: 16px;'

        self.fields['password'].widget.attrs['_ngcontent-xpp-c82'] = ''
        self.fields['password'].widget.attrs['placeholder'] = _('Пароль')
        self.fields['password'].widget.attrs['style'] = 'font-family: sans-serif; font-size: 16px;'

    class Meta:
        fields = ('username', 'password', 'remember_me')


def password_reset_send_mail_override(func: Callable) -> Callable:
    def wrap(*args, **kwargs):
        args = list(args)
        args[0] = 'PasswordResetCustomForm'
        args[3]['username'] = args[3]['user'].get_username()
        del args[3]['user']
        func.delay(*args, **kwargs)

    return wrap


class PasswordResetCustomForm(PasswordResetForm):
    """#### Форма для страницы сброса пароля."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['email'].widget.attrs['_ngcontent-bgn-c87'] = ''
        self.fields['email'].widget.attrs['placeholder'] = _('Адрес электронной почты')
        self.fields['email'].widget.attrs['style'] = 'font-family: sans-serif; font-size: 16px;'

    class Meta:
        fields = ('email',)

    @password_reset_send_mail_override
    @celery_app.task
    def send_mail(
        self,
        subject_template_name,
        email_template_name,
        context,
        from_email,
        to_email,
        html_email_template_name=None,
    ):
        """
        Send a django.core.mail.EmailMultiAlternatives to `to_email`.
        """
        subject = loader.render_to_string(subject_template_name, context)
        # Email subject *must not* contain newlines
        subject = ''.join(subject.splitlines())
        body = loader.render_to_string(email_template_name, context)

        context.update({'btn_name': subject.rsplit(' ', 2)[0]})

        email_message = EmailMultiAlternatives(subject, body, from_email, [to_email])
        if html_email_template_name is not None:
            html_email = loader.render_to_string(html_email_template_name, context)
            email_message.attach_alternative(html_email, 'text/html')

        email_message.send()

    def clean_email(self) -> str:
        new_email = self.cleaned_data.get('email', False)

        if new_email:
            if not CustomUser.objects.filter(email=new_email).exists():
                raise ValidationError(_('Такого почтового адреса не существует.'))
            return new_email


class PasswordResetConfirmForm(SetPasswordForm):
    """#### Форма для страницы ввода нового пароля."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['new_password1'].widget.attrs['placeholder'] = _('Новый пароль')
        self.fields['new_password2'].widget.attrs['placeholder'] = _('Подтвердите пароль')

        for field in self.fields:
            self.fields[field].widget.attrs['_ngcontent-otd-c88'] = ''
            self.fields[field].widget.attrs['style'] = 'font-family: sans-serif; font-size: 16px;'

    class Meta:
        fields = ('new_password1', 'new_password2')


# https://docs.djangoproject.com/en/4.0/ref/forms/fields/
class ContactMeForm(ModelForm):
    """#### Форма для страницы обратной связи."""

    captcha = ReCaptchaField(
        widget=ReCaptchaV2Checkbox(
            api_params={'onload': 'reCaptchaOnLoadCallback', 'hl': 'ru'},
            attrs={
                'data-theme': 'dark',
                # 'data-size': 'compact' # 'normal'
            },
        )
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['email'].widget.attrs['_ngcontent-xpp-c83'] = ''
        self.fields['email'].widget.attrs['placeholder'] = _('Адрес электронной почты')
        self.fields['email'].widget.attrs['style'] = 'font-family: sans-serif; font-size: 16px;'

    class Meta:
        model = ContactMe

        fields = ('email', 'message', 'captcha')

        widgets = {
            'message': Textarea(
                attrs={
                    '_ngcontent-xpp-c83': '',
                    'placeholder': _('Напишите ваше обращение к администрации сайта'),
                    'style': 'font-family: sans-serif; font-size: 16px;',
                    # 'cols': '40', 'rows': '10'
                }
            )
        }


class AccountSettingsForm(ModelForm):
    """#### Форма для страницы с настройками аккаунта."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['avatar'].required = False

        self.fields['first_name'].widget.attrs['_ngcontent-gox-c51'] = ''
        self.fields['first_name'].widget.attrs['style'] = 'font-family: sans-serif; font-size: 17px;'

        self.fields['last_name'].widget.attrs['_ngcontent-gox-c51'] = ''
        self.fields['last_name'].widget.attrs['style'] = 'font-family: sans-serif; font-size: 17px;'

        # пустое поле появится только если включен blank=True в модели
        self.fields['gender'].widget.choices[0] = ('', '')  # подмена дефолтных тире на пустую строку
        self.fields['gender'].widget.attrs['class'] = 'select-gender'
        self.fields['gender'].widget.attrs['style'] = 'font-family: sans-serif; font-size: 16px;'

        self.fields['discord_username'].widget.attrs['_ngcontent-gox-c51'] = ''
        self.fields['discord_username'].widget.attrs['style'] = (
            'font-family: sans-serif; font-size: 17px;'
        )

        self.fields['battlenet_username'].widget.attrs['_ngcontent-gox-c51'] = ''
        self.fields['battlenet_username'].widget.attrs['style'] = (
            'font-family: sans-serif; font-size: 17px;'
        )

        self.fields['twitch_link'].widget.attrs['_ngcontent-gox-c51'] = ''
        self.fields['twitch_link'].widget.attrs['style'] = 'font-family: sans-serif; font-size: 17px;'

        self.fields['dress_room_link'].widget.attrs['_ngcontent-gox-c51'] = ''
        self.fields['dress_room_link'].widget.attrs['style'] = (
            'font-family: sans-serif; font-size: 17px;'
        )

        self.fields['subscribe_newsletter'].widget.attrs['style'] = 'width: 18px; height: 18px;'

        self.fields['subscribe_notify'].widget.attrs['style'] = 'width: 18px; height: 18px;'

    class Meta:
        # требуется связь с моделью пользователя
        model = CustomUser
        fields = (
            'avatar',
            'first_name',
            'last_name',
            'birth_date',
            'gender',
            'game_class',
            'discord_username',
            'battlenet_username',
            'twitch_link',
            'dress_room_link',
            'subscribe_newsletter',
            'subscribe_notify',
        )

        widgets = {
            # https://django.fun/ru/articles/tutorials/kak-podklyuchit-vidzhet-vybora-daty-v-django/
            # https://django.fun/ru/docs/django/4.1/ref/forms/widgets/#selectdatewidget
            'birth_date': SelectDateWidget(
                years=range(1930, timezone.now().year),
                attrs={
                    'class': 'select-birth-date',
                    'style': 'font-family: sans-serif; font-size: 16px;',
                },
                # пустые поля появятся только если включен blank=True в модели
                empty_label=('', '', ''),
            ),  # подмена дефолтных тире на пустые строки
            'game_class': SelectMultiple(attrs={'class': 'chosen-select'}),
        }

    # метод clean_<название-поля> возвращает объект который будет сохранён в БД при отсутствии ошибок
    def clean_twitch_link(self) -> str:
        twitch_link = self.cleaned_data.get('twitch_link', False)

        if twitch_link:
            full_url = validate_twitch_link(twitch_link)
            if full_url:
                return full_url

    def clean_avatar(self) -> InMemoryUploadedFile:
        """>>> Проверяет загружаемый пользователем аватар на максимально допустимое
        разрешение 1920х1920 и объём 6МБ, если предел превышен возбуждает исключение."""

        avatar: InMemoryUploadedFile = self.cleaned_data.get('avatar', False)

        if avatar:
            avatar.name = translify(avatar.name)

            limit = (1024 * 1024) * 6  # 6 МБ

            width, height = get_image_dimensions(avatar)

            resolution = str(width) + 'x' + str(height)
            size = humanize_size(avatar.size)

            resolution_error = (
                _(
                    'Загружаемый файл должен иметь разрешение не более 1920x1920 пикселей, '
                    'ваш файл имеет разрешение '
                )
                + resolution
                + _(' пикселей')
                + '.'
            )
            size_error = (
                _('Загружаемый файл должен иметь объём не более 6МБ, ваш файл имеет объём ') + size + '.'
            )

            if (width > 1920 or height > 1920) and (avatar.size > limit):
                # в ValidationError можно передавать несколько ошибок в формате списка
                raise ValidationError([resolution_error, size_error])

            if width > 1920 or height > 1920:
                raise ValidationError(resolution_error)

            if avatar.size > limit:
                raise ValidationError(size_error)

            return avatar


class PasswordChangeCustomForm(PasswordChangeForm):
    """#### Форма для страницы смены пароля внутри аккаунта."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['old_password'].widget.attrs['autofocus'] = False
        self.fields['old_password'].widget.attrs['placeholder'] = _('Текущий пароль')

        self.fields['new_password1'].widget.attrs['placeholder'] = _('Новый пароль')

        self.fields['new_password2'].widget.attrs['placeholder'] = _('Подтвердите пароль')

        for field in self.fields:
            self.fields[field].widget.attrs['_ngcontent-xcm-c64'] = ''
            self.fields[field].widget.attrs['style'] = 'font-family: sans-serif; font-size: 16px;'

    class Meta:
        fields = ('old_password', 'new_password1', 'new_password2')


class AccountEmailForm(ModelForm):
    """#### Форма для страницы смены почты внутри аккаунта."""

    new_email = EmailField(
        max_length=254,
        widget=EmailInput(
            attrs={
                '_ngcontent-xcm-c63': '',
                'placeholder': _('Новый почтовый адрес'),
                'style': 'font-family: sans-serif; font-size: 16px;',
                'autocomplete': 'off',
            }
        ),
    )

    class Meta:
        # требуется связь с моделью пользователя
        model = CustomUser
        fields = ('new_email',)

    def clean_new_email(self) -> str:
        """Проверяет наличие введённого пользователем адреса электронной почты в БД,
        если такая почта уже существует, возбуждает исключение."""

        new_email = self.cleaned_data.get('new_email', False)

        if new_email:
            if CustomUser.objects.filter(email=new_email).exists():
                raise ValidationError(_('Такой почтовый адрес уже существует.'))
            return new_email


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
            'content': Textarea(
                attrs={
                    'class': 'first-textarea',
                    'cols': '40',
                    'rows': '1',
                    'placeholder': _('Введите текст комментария'),
                }
            ),
        }

    def save(self, *args, **kwargs):
        """Перед сохранением формы необходимо произвести перестройку дерева методом rebuild."""

        Comments.objects.rebuild()
        return super().save(*args, **kwargs)
