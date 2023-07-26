from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-sgr#a$4v)m2xi#e$(!(%y*4=95*92uu1^$6v@no2y!cfr-b%73'

DEBUG = True

PARENT_DOMAIN = config('MY_LOCAL_IPV4_ADDRESS')
ALLOWED_HOSTS = ['localhost', '127.0.0.1', PARENT_DOMAIN]


CHANNEL_LAYERS = {
    'default': {
        # для локальной разработки channels websocket можно использовать данный бэкэнд
        "BACKEND": "channels.layers.InMemoryChannelLayer",
    },
}

LOCAL_REDIS = True
if LOCAL_REDIS:
    # https://github.com/tporadowski/redis.git # Releases -> Redis-x64-5.0.14.1.msi
    # https://stackoverflow.com/a/42600466/19276507
    # по дефолту https://redis.io/ redis server запускается автоматически при загрузке windows
    # проверить работу можно введя в терминале команду 'redis-cli' и затем отправив 'ping'
    # должен вернуться PONG, выйти из терминала можно командой 'exit'
    # https://docs.djangoproject.com/en/4.2/topics/cache/#redis
    CACHES = {
        "default": {
            # https://github.com/jazzband/django-redis
            "BACKEND": "django_redis.cache.RedisCache", # pip install django-redis
            # "BACKEND": "django.core.cache.backends.redis.RedisCache",
            "LOCATION": "redis://127.0.0.1:6379",
        }
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
