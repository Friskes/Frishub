from pathlib import Path
# pip install python-decouple
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('DJANGO_PRODUCTION_SECRET_KEY')

DEBUG = False

ALLOWED_HOSTS = ['45.130.43.188', 'frishub.ru', 'www.frishub.ru']

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer', # pip install redis
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
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
        "LOCATION": "redis://127.0.0.1:6379",
    }
}

DATABASES = {
    'default': {
        # данные необходимые для подключения PostgreSQL
        # для windows: pip install psycopg2
        # для linux: pip install psycopg2-binary
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('POSTGRESQL_DATABASE_NAME'),
        'USER': config('POSTGRESQL_DATABASE_USER'),
        'PASSWORD': config('POSTGRESQL_DATABASE_PASSWORD'),
        'HOST': '127.0.0.1',
        'PORT': '5432',

        # данные необходимые для подключения MySQL
        # 'ENGINE': 'django.db.backends.mysql',
        # 'NAME': config('MYSQL_DATABASE_NAME'),
        # 'USER': config('MYSQL_DATABASE_USER'),
        # 'PASSWORD': config('MYSQL_DATABASE_PASSWORD'),
        # 'HOST': '127.0.0.1',
        # 'PORT': '3306',
    }
}

STATIC_ROOT = BASE_DIR / 'static'
