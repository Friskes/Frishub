"""
Django settings for FriskesSite project.

Generated by 'django-admin startproject' using Django 4.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
# import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Application definition

INSTALLED_APPS = [
    'django.contrib.humanize',

    # pip install daphne
    'daphne',

    # https://channels.readthedocs.io/en/stable/installation.html
    # pip install channels==3.0.5
    'channels',

    # https://github.com/django/channels_redis/issues/332#issue-1406374416
    # pip install channels-redis==3.4.1
    'channels_redis',

    # pip install django-modeltranslation
    'modeltranslation',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # https://github.com/torchbox/django-recaptcha
    'captcha',

    # https://github.com/jazzband/django-tinymce
    # https://django-tinymce.readthedocs.io/en/latest/
    'tinymce', # pip install django-tinymce

    'main_app',

    # pip install django-mptt
    'mptt',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',

    # плагин необходимый для локализации
    'django.middleware.locale.LocaleMiddleware',

    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    # плагин для подсчёта количества пользователей онлайн
    'main_app.middleware.online_users_now.OnlineUsersNowMiddleware',

    # плагин для отлова ошибок которые не были отловлены в бизнес логике приложения
    # и отправки Traceback'a ошибок администраторам на почту
    # 'main_app.middleware.catch_errors.ErrorHandlerMiddleware',
]

ROOT_URLCONF = 'FriskesSite.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        # django будет искать шаблоны в приложении main_app в каталоге templates
        # 'DIRS': [BASE_DIR / 'main_app/templates'],
        # django будет искать шаблоны в коревом каталоге проекта в каталоге templates
        # 'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',

                # процессор необходимый для локализации,
                # теперь запросы будут содержать LANGUAGES и LANGUAGE_CODE переменные
                'django.template.context_processors.i18n',
            ],
        },
    },
]

WSGI_APPLICATION = 'FriskesSite.wsgi.application'

# Конфигурация Channels
ASGI_APPLICATION = "FriskesSite.asgi.application"


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

# LANGUAGE_CODE = 'en-us'
LANGUAGE_CODE = 'ru' # язык сайта по умолчанию

# https://docs.djangoproject.com/en/4.1/topics/i18n/translation/
# https://youtu.be/F0O0LLz12BU
LANGUAGES = (
    ('ru', 'Russian'),
    ('en', 'English'),
)
USE_I18N = True
# USE_L10N = True # определение локализации пользователя, по заголовку Accept-Language.
LOCALE_PATHS = (
    'main_app/locale',
)

# указываем язык по умолчанию для перевода моделей
MODELTRANSLATION_DEFAULT_LANGUAGE = 'ru'
# указываем на основе какого поля модели ru/en будет генерироватся слаг
MODELTRANSLATION_PREPOPULATE_LANGUAGE = 'en'

# https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
# https://docs.djangoproject.com/en/4.2/topics/i18n/timezones/
# https://www.timeanddate.com/time/map/
# TIME_ZONE = 'UTC'
TIME_ZONE = 'Europe/Moscow' # UTC+3

USE_TZ = True

USE_L10N = True

# Определяем кастомную модель пользователя
AUTH_USER_MODEL = 'main_app.CustomUser'


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = '/static/'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
# с джанго 3+ вместо функции join можно использовать синтаксис через слэш
# MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


TINYMCE_DEFAULT_CONFIG = {
    'branding': False,
    "height": "600px",
    "width": "100%",
    "menubar": "file edit view insert format tools table help",
    "plugins": "advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code "
    "fullscreen insertdatetime media table paste code help wordcount spellchecker",
    "toolbar": "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft "
    "aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor "
    "backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | "
    "fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | "
    "a11ycheck ltr rtl | showcomments addcomment code",
    "custom_undo_redo_levels": 10,
}


# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# смысл этих файлов в том что, при необходимости можно
# включить дебаг режим прямо на продакшене.
try:
    from FriskesSite.local_settings import *
except ImportError:
    from FriskesSite.prod_settings import *


# https://support.google.com/mail/answer/7126229?visit_id=638015537565678308-2329622254&p=BadCredentials&rd=2#cantsignin&zippy=%2C%D0%BD%D0%B5-%D1%83%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B2%D0%BE%D0%B9%D1%82%D0%B8-%D0%B2-%D0%BF%D0%BE%D1%87%D1%82%D0%BE%D0%B2%D1%8B%D0%B9-%D0%BA%D0%BB%D0%B8%D0%B5%D0%BD%D1%82%2C%D1%88%D0%B0%D0%B3-%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D0%B5-imap-%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%2C%D1%88%D0%B0%D0%B3-%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B8%D1%82%D0%B5-smtp-%D0%B8-%D0%B4%D1%80%D1%83%D0%B3%D0%B8%D0%B5-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B-%D0%B2-%D0%BA%D0%BB%D0%B8%D0%B5%D0%BD%D1%82%D0%B5
# https://support.google.com/accounts/answer/185833
EMAIL_HOST = 'smtp.gmail.com' # Домен сервера исходящей почты (SMTP)
EMAIL_PORT = 587
EMAIL_USE_TLS = True # Используется ли шифрование


# после установки данных в админке, потребуется перезагрузить сервер что бы обновить константы
import django
django.setup()
from main_app.models import ServiceInfo
EMAIL_HOST_USER = '' # Серверная почта
EMAIL_HOST_PASSWORD = '' # Необходимо создать "Пароль приложения" в данном случае почты
DISCORD_LOGIN = ''
DISCORD_PASSWORD = ''
TWITCH_CLIENT_ID = ''
TWITCH_CLIENT_SECRET = ''
# https://www.google.com/recaptcha/about/
RECAPTCHA_PUBLIC_KEY = ''
RECAPTCHA_PRIVATE_KEY = ''
try:
    service_info = ServiceInfo.objects.all()
    EMAIL_HOST_USER = service_info[0].server_email_login

    SERVER_EMAIL = EMAIL_HOST_USER
    ADMINS = (
        ('Friskes', EMAIL_HOST_USER),
    )
    EMAIL_SUBJECT_PREFIX = ""

    EMAIL_HOST_PASSWORD = service_info[0].server_email_password
    DISCORD_LOGIN = service_info[0].discord_login
    DISCORD_PASSWORD = service_info[0].discord_password
    TWITCH_CLIENT_ID = service_info[0].twitch_client_id
    TWITCH_CLIENT_SECRET = service_info[0].twitch_client_secret
    RECAPTCHA_PUBLIC_KEY = service_info[0].recaptcha_public_key
    RECAPTCHA_PRIVATE_KEY = service_info[0].recaptcha_private_key
except Exception: pass


# https://docs.djangoproject.com/en/4.2/topics/logging/
# https://docs.djangoproject.com/en/4.2/ref/logging/#logging-ref
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": { # словарь с шаблонами форматирования строки
        # "verbose": { # расширенный
        #     "format": "{levelname} {asctime} {module}.py {process:d} {thread:d} {message}",
        #     "style": "{",
        # },
        "medium": { # средний
            "format": "{levelname} {asctime} {module}.py {message}", # {server_time}
            "style": "{",
        },
        "simple": { # простой
            "format": "{levelname} {message}",
            "style": "{",
        },
    },
    "filters": { # словарь с фильтрами
        "require_debug_true": { # писать лог сообщение только при DEBUG = True
            "()": "django.utils.log.RequireDebugTrue",
        },
        "require_debug_false": { # писать лог сообщение только при DEBUG = False
            "()": "django.utils.log.RequireDebugFalse",
        },
    },
    "handlers": { # словарь с обработчиками логов
        "console_local": {
            "level": "DEBUG", # все уровни >= указанного уровня будут обработаны этим обработчиком
            "filters": ["require_debug_true"],
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "console_prod": {
            "level": "INFO", # все уровни >= указанного уровня будут обработаны этим обработчиком
            "filters": ["require_debug_false"],
            "class": "logging.StreamHandler",
            "formatter": "medium",
        },
        # "file": {
        #     "level": "ERROR", # все уровни >= указанного уровня будут обработаны этим обработчиком
        #     "filters": ["require_debug_false"],
        #     "class": "logging.FileHandler",
        #     "formatter": "medium",
        #     "filename": BASE_DIR / "logs/log.log", # директория "logs/" должна быть создана вручную.
        # },
    },
    "loggers": {
        "main_app": { # название приложения
            "handlers": ["console_local", "console_prod"],
            "level": "INFO", # все уровни >= указанного уровня будут переданы в указанные обработчики
        },
    },
}

# фикс ошибки в терминале браузера: "The Cross Origin Opener Policy header has been ignored"
SECURE_CROSS_ORIGIN_OPENER_POLICY = None # 'same-origin'
