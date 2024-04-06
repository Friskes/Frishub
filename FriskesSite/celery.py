import os

# pip install eventlet
# pip install celery==4.4.7
# pip install flower==0.9.7
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'FriskesSite.settings')

celery_app = Celery('FriskesSite')
celery_app.config_from_object('django.conf:settings', namespace='CELERY')
celery_app.autodiscover_tasks()


# https://docs.celeryq.dev/en/latest/userguide/periodic-tasks.html#crontab-schedules
# celery_app.conf.beat_schedule = {
#     'send-msg-every-1-minute': {
#         'task': 'main_app.tasks.test_beat_task',
#         'schedule': crontab(minute='*/1'),
#         # 'schedule': crontab(hour=0, minute=46),
#         'args': (7, 12, 'ok'),
#     }
# }
