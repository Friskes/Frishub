from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-sgr#a$4v)m2xi#e$(!(%y*4=95*92uu1^$6v@no2y!cfr-b%73'

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']
ALLOWED_HOSTS += [config('MY_LOCAL_IPV4_ADDRESS')]

CHANNEL_LAYERS = {
    'default': {
        # для локальной разработки можно использовать данный бэкэнд
        "BACKEND": "channels.layers.InMemoryChannelLayer",
    },
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
        "TEST": { # отдельная БД для тестов
            "NAME": BASE_DIR / "test_db.sqlite3",
        },
    }
}

# вывод почты в консоль при разработке (при восстановлении пароля по почте - только если такая почта существует в БД)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# для выполнения команды python manage.py collectstatic
# необходимо временно раскомментировать STATIC_ROOT и закомментировать STATICFILES_DIRS
# STATIC_ROOT = BASE_DIR / 'static'
STATICFILES_DIRS = [BASE_DIR / 'static']
