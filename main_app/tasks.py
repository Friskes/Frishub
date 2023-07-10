from FriskesSite.celery import app
from FriskesSite import settings

from django.core.mail import send_mail

from typing import List
from time import sleep


@app.task
def contact_me_send_mail_task(head: str, body: str, sender: str, recipients: List[str]):
    # функция работы с почтой встроенная в django
    send_mail(
        subject=head, # Тема сообщения
        message=body, # Содержание сообщения
        from_email=sender, # Наша серверная почта
        recipient_list=recipients, # Список получателей сообщения
    )


# celery -A FriskesSite worker -l info -P eventlet
# @app.task
# def test_task(*args):
#     print('test_task sleep(3)', *args)
#     sleep(3)
#     return 'SUCCEDED test_task'
# test_task.delay('аргумент')


# beat работает только при запущенном worker
# celery -A FriskesSite beat -l info
@app.task
def test_beat_task(*args):
    send_mail(
        'head message',
        'body message',
        settings.EMAIL_HOST_USER,
        [settings.EMAIL_HOST_USER]
    )
    print('test_beat_task', *args)
    return 'SUCCEDED test_beat_task'


# Команда поднятия сервера flower
# celery -A FriskesSite flower
# celery -A FriskesSite flower --url_prefix=flower # для запуска через представление django
# celery -A FriskesSite flower -l info --address=127.0.0.1 --port=5555
