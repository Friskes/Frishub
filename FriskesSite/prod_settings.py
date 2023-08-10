from pathlib import Path
from FriskesSite.env import *


BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = False

ALLOWED_HOSTS = [SERVER_HOST, f'www.{SERVER_HOST}', SERVER_IP]

PARENT_DOMAIN = SERVER_HOST


CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer', # pip install redis
        'CONFIG': {
            "hosts": [(REDIS_HOST, REDIS_PORT)],
            # "capacity": 1500, # default 100
            # "expiry": 10, # default 60
        },
    },
}


# https://docs.djangoproject.com/en/4.2/topics/cache/#redis
CACHES = {
    "default": {
        # https://github.com/jazzband/django-redis
        "BACKEND": "django_redis.cache.RedisCache", # pip install django-redis
        "LOCATION": REDIS_URL,
    }
}


DATABASES = {
    'default': {
        # данные необходимые для подключения PostgreSQL
        # для windows: pip install psycopg2
        # для linux: pip install psycopg2-binary
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': POSTGRES_DB,
        'USER': POSTGRES_USER,
        'PASSWORD': POSTGRES_PASSWORD,
        'HOST': POSTGRES_HOST,
        'PORT': POSTGRES_PORT,

        # данные необходимые для подключения MySQL
        # 'ENGINE': 'django.db.backends.mysql',
        # 'NAME': MYSQL_DB,
        # 'USER': MYSQL_USER,
        # 'PASSWORD': MYSQL_PASSWORD,
        # 'HOST': MYSQL_HOST,
        # 'PORT': MYSQL_PORT, # '3306'
    }
}


# фикс ошибки: "Ошибка проверки CSRF. Запрос отклонён." https://stackoverflow.com/a/70326426/19276507
CSRF_TRUSTED_ORIGINS = [f'https://*.{SERVER_HOST}']
# так же фиксит ошибку: https://stackoverflow.com/a/71482883/19276507
# SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

STATIC_ROOT = BASE_DIR / 'static'
