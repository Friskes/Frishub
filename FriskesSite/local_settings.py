from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-sgr#a$4v)m2xi#e$(!(%y*4=95*92uu1^$6v@no2y!cfr-b%73'

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']
ALLOWED_HOSTS += [config('MY_LOCAL_IPV4_ADDRESS')]


LOCAL_REDIS = True
if LOCAL_REDIS:
    CHANNEL_LAYERS = {
        'default': {
            'BACKEND': 'channels_redis.core.RedisChannelLayer',
            'CONFIG': {
                "hosts": [('127.0.0.1', 6379)],
                # "capacity": 1500, # default 100
                # "expiry": 10, # default 60
            },
        },
    }
    # https://github.com/tporadowski/redis.git # Releases -> Redis-x64-5.0.14.1.msi
    # https://stackoverflow.com/a/45431558/19276507
    # https://stackoverflow.com/a/42600466/19276507
    # по дефолту https://redis.io/ redis server запускается автоматически при загрузке windows
    # проверить работу можно введя в терминале команду 'redis-cli' и затем отправив 'ping' должен вернуться PONG
    # import subprocess
    # subprocess.Popen(
    #     [r"C:\Program Files\Redis\redis-server.exe"],
    #     stdin=subprocess.PIPE,
    #     stderr=subprocess.PIPE,
    #     stdout=subprocess.PIPE # откл. вывода в консоль
    # )
else:
    CHANNEL_LAYERS = {
        'default': {
            # для локальной разработки channels websocket можно использовать данный бэкэнд
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
