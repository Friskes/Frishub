from pathlib import Path
import os
# pip install python-dotenv
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())


BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-sgr#a$4v)m2xi#e$(!(%y*4=95*92uu1^$6v@no2y!cfr-b%73')

MY_LOCAL_IPV4_ADDRESS = os.environ.get('MY_LOCAL_IPV4_ADDRESS', '')

POSTGRES_ENGINE = os.environ.get('POSTGRES_ENGINE', 'django.db.backends.sqlite3')
POSTGRES_DB = os.environ.get('POSTGRES_DB', BASE_DIR / 'db.sqlite3')
POSTGRES_USER = os.environ.get('POSTGRES_USER', 'my_pg_user')
POSTGRES_PASSWORD = os.environ.get('POSTGRES_PASSWORD', 'my_pg_pass')
POSTGRES_HOST = os.environ.get('POSTGRES_HOST', '127.0.0.1')
POSTGRES_PORT = os.environ.get('POSTGRES_PORT', '5432')

REDIS_HOST = os.environ.get('REDIS_HOST', '127.0.0.1')
REDIS_PORT = os.environ.get('REDIS_PORT', '6379')

# CELERY_BROKER_URL = 'pyamqp://guest@localhost//' # rabbitmq

CELERY_FLOWER_URL_PREFIX = os.environ.get('CELERY_FLOWER_URL_PREFIX', 'flower')
CELERY_FLOWER_ADDRESS = os.environ.get('CELERY_FLOWER_ADDRESS', '127.0.0.1')
CELERY_FLOWER_PORT = os.environ.get('CELERY_FLOWER_PORT', '5555')

SERVER_HOST = os.environ.get('SERVER_HOST', '')
SERVER_IP = os.environ.get('SERVER_IP', '')
