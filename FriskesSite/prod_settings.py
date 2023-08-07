from pathlib import Path
from FriskesSite.env import *


BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = False

PARENT_DOMAIN = SERVER_HOST
ALLOWED_HOSTS = [SERVER_HOST, f'www.{SERVER_HOST}', SERVER_IP]


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
        # "BACKEND": "django.core.cache.backends.redis.RedisCache",
        "LOCATION": REDIS_URL,
    }
}

DATABASES = {
    'default': {
        # данные необходимые для подключения PostgreSQL
        # для windows: pip install psycopg2
        # для linux: pip install psycopg2-binary
        'ENGINE': POSTGRES_ENGINE,
        'NAME': POSTGRES_DB,
        'USER': POSTGRES_USER,
        'PASSWORD': POSTGRES_PASSWORD,
        'HOST': POSTGRES_HOST,
        'PORT': POSTGRES_PORT,

        # данные необходимые для подключения MySQL
        # 'ENGINE': 'django.db.backends.mysql',
        # 'NAME': 'mysql_name',
        # 'USER': 'mysql_user',
        # 'PASSWORD': 'mysql_password',
        # 'HOST': '127.0.0.1',
        # 'PORT': '3306',
    }
}

STATIC_ROOT = BASE_DIR / 'static'
