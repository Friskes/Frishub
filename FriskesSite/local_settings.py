from pathlib import Path
from sys import argv as django_cmd_argv

from FriskesSite.env import *

BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

if MY_LOCAL_IPV4_ADDRESS:
    PARENT_DOMAIN = MY_LOCAL_IPV4_ADDRESS
    ALLOWED_HOSTS += [MY_LOCAL_IPV4_ADDRESS]
else:
    PARENT_DOMAIN = ALLOWED_HOSTS[0]


if RUN_DEV_SERVER_WITH_DOCKER:
    CHANNEL_LAYERS = {
        'default': {
            'BACKEND': 'channels_redis.core.RedisChannelLayer',
            'CONFIG': {
                'hosts': [(REDIS_HOST, REDIS_PORT)],
            },
        },
    }
else:
    CHANNEL_LAYERS = {
        'default': {
            # для локальной разработки channels websocket допустимо использовать данный бэкэнд
            'BACKEND': 'channels.layers.InMemoryChannelLayer',
        },
    }


if RUN_DEV_SERVER_WITH_DOCKER or WINDOWS_REDIS_INSTALLED:
    # https://github.com/tporadowski/redis.git # Releases -> Redis-x64-5.0.14.1.msi
    # https://stackoverflow.com/a/42600466/19276507
    # по дефолту https://redis.io/ redis server запускается автоматически при загрузке windows
    # проверить работу можно введя в терминале команду 'redis-cli' и затем отправив 'ping'
    # должен вернуться PONG, выйти из терминала можно командой 'exit'
    # https://docs.djangoproject.com/en/4.2/topics/cache/#redis
    CACHES = {
        'default': {
            'BACKEND': 'django_redis.cache.RedisCache',
            'LOCATION': REDIS_URL_DB_1,
        }
    }
else:
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        }
    }


if RUN_DEV_SERVER_WITH_DOCKER:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': POSTGRES_DB,
            'USER': POSTGRES_USER,
            'PASSWORD': POSTGRES_PASSWORD,
            'HOST': POSTGRES_HOST,
            'PORT': POSTGRES_PORT,
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
            'TEST': {  # отдельная БД для тестов
                'NAME': BASE_DIR / 'test_db.sqlite3',
            },
        }
    }


# вывод почты в консоль при разработке
# (при восстановлении пароля по почте - только если такая почта существует в БД)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# для выполнения команды python manage.py collectstatic (без докера)
# необходимо сделать доступным STATIC_ROOT и недоступным STATICFILES_DIRS
if RUN_DEV_SERVER_WITH_DOCKER:
    STATIC_ROOT = BASE_DIR / 'static'  # если это запуск докера
else:
    if django_cmd_argv[1] == 'collectstatic':  # если это обычный запуск python manage.py collectstatic
        STATIC_ROOT = BASE_DIR / 'static'
    else:
        STATICFILES_DIRS = [BASE_DIR / 'static']  # если это обычный запуск python manage.py runserver
