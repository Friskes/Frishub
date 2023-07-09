import os

# pip install eventlet
# pip install celery
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'FriskesSite.settings')

app = Celery(__name__)
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# https://docs.celeryq.dev/en/latest/userguide/periodic-tasks.html#crontab-schedules
# app.conf.beat_schedule = {
#     'send-spam-every-1-minute': {
#         'task': 'main_app.tasks.test_beat_task',
#         'schedule': crontab(minute='*/1'),
#         'args': (7, 12, 'ok'),
#     }
# }
