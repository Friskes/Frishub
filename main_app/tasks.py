from django.utils import timezone
from django.core.mail import send_mail
from django.core.exceptions import ValidationError
from django.template.loader import get_template
from django.core.cache import cache
# from django.conf import settings

from FriskesSite import settings
from FriskesSite.celery import app

from main_app.models import CustomUser
from main_app.parse_twitch_streams import twitch_stream_parser
from main_app.models import Notification

from notifications.signals import notify

from typing import List
from time import sleep
from json import dumps
import datetime as dt
# pip install backports.zoneinfo
from backports.zoneinfo import ZoneInfo

from celery import shared_task

# https://tproger.ru/articles/ispolzovanie-django-celery-beat-dlja-sozdanija-periodicheskih-zadach-v-django-proektah/
from django_celery_beat.models import PeriodicTask, IntervalSchedule, CrontabSchedule


#############################################################################

@app.task
def contact_me_send_mail_task(preheader_msg: str, body_msg: str, sender_email: str, recipients_emails: List[str]):
    """Отправляет с серверной почты на серверную почту (самому себе) имейл
    с сообщением от пользователя с формы обратной связи."""

    # функция работы с почтой встроенная в django
    send_mail(
        subject=preheader_msg, # Тема сообщения
        message=body_msg, # Содержание сообщения
        from_email=sender_email, # Наша серверная почта
        recipient_list=recipients_emails, # Список получателей сообщения
    )


@app.task
def send_newsletter_by_email_to_all_users_task(*args, **kwargs):
    """Отправляет новостное сообщение на почту всем пользователям сайта."""

    users = CustomUser.objects.filter(subscribe_newsletter=True)
    users_email = [user.email for user in users] # if not user.is_superuser
    send_mail(
        args[1],
        '',
        settings.EMAIL_HOST_USER,
        users_email,
        html_message=get_template('emails/news_email.html').render(context={
            'btn_href': args[0],
            'msg_before_btn': args[2],
            'btn_text': 'Перейти на страницу',
            'footer_text': 'Хотите отписаться от новостной рассылки?'
        })
    )


@app.task
def send_news_by_notify_to_all_users_task(*args, **kwargs):
    """Отправляет новостное сообщение уведомлением всем пользователям сайта."""

    admin = CustomUser.objects.get(is_superuser=True)
    users = CustomUser.objects.all()

    for user in users:
        notify.send(
            admin,
            recipient=user,
            verb=args[1],
            notify_href=args[0]
        )


@app.task
def twitch_stream_count_task():
    """Делает запрос к twitch API получает всех онлайн стримеров
    записывает их в кэш и возвращает."""

    twitch_streams = twitch_stream_parser.get_twitch_stream_data()
    cache.set('twitch_streams', twitch_streams, 60) # секунды
    return twitch_streams


@app.task
def send_email_if_notify_unread(*args, **kwargs):
    """Проверяет прочитал ли пользователь уведомление,
    если нет то отправляет это уведомление ему на почту."""

    notification: Notification = Notification.objects.get(pk=kwargs['pk'])

    # Сообщение всё ещё не прочитано значит отправляем письмо
    if notification.unread:
        notification.emailed = True
        notification.save()

        send_mail(
            f"frishub.ru Уведомление от пользователя {kwargs['actor_username']}",
            '',
            settings.EMAIL_HOST_USER,
            [kwargs['recipient_email']],
            html_message=get_template('emails/news_email.html').render(context={
                'btn_href': kwargs['href'],
                'msg_before_btn': f"{kwargs['actor_username']} {notification.verb}",
                'btn_text': 'Перейти к комментарию',
                'footer_text': 'Хотите отписаться от уведомлений по почте?'
            })
        )

#############################################################################

# https://github.com/celery/django-celery-beat
# schedule, created = IntervalSchedule.objects.get_or_create(every=1, period=IntervalSchedule.MINUTES)
# try:
#     per_task = PeriodicTask.objects.create(
#         name='send-msg-every-1-minute',
#         task='main_app.tasks.test_beat_task',
#         interval=schedule,
#         args=dumps(
#             (7, 12, 'ok')
#         ),
#         kwargs=dumps(
#             {'be_careful': True}
#         ),
#         # start_time=timezone.now() + dt.timedelta(minutes=2), # время через которое таска совершит свой первый такт
#         # expires=timezone.now() + dt.timedelta(minutes=2), # время через которое таска совершит свой последний такт
#     )
# except ValidationError as exc:
#     print(exc)
# выключить таску изменив состояние и сохранив его в БД
# per_task.enabled = False
# per_task.save()


# https://django-celery-beat.readthedocs.io/en/latest/
# schedule, created = CrontabSchedule.objects.get_or_create(
#     minute='53',
#     hour='*',
#     day_of_week='*',
#     day_of_month='*',
#     month_of_year='*',
#     timezone=ZoneInfo(settings.TIME_ZONE)
# )
# try:
#     PeriodicTask.objects.create(
#         name='send-msg-every-hour-in-53-minute',
#         task='main_app.tasks.test_cron_task',
#         crontab=schedule,
#         kwargs=dumps(
#             {'be_careful': True}
#         ),
#     )
# except ValidationError as exc:
#     print(exc)

#############################################################################

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')


@app.task
def test_task(a, b):
    print(f'test_task sleep(3) A({a}) B({b})')
    sleep(3)
    return a + b
# Вызов асинхронной задачи с повторным самовызовом
# с первым аргументом результатом выполнения задачи, вторым аргументом значение переданное в link
# test_task.apply_async(args=(2, 2), link=test_task.s(3))


# декоратор shared_task тоже самое что и @app.task просто не привязан к экземпляру класса Celery app
@shared_task
def test_shared_task(*args):
    print(f'test_shared_task sleep(3) {args}')
    sleep(3)
    return 'SUCCEEDED test_shared_task'
# test_shared_task.delay('аргумент')


# default_retry_delay означает что задача будет становиться на повтор
# при возникновении исключения в течении 5мин, далее перестанет
@app.task(bind=True, default_retry_delay=5*60)
def test_retry_task(self, a, b):
    try:
        print('TRY test_retry_task')
        c = a + b
        return f'RESULT A({a}) + B({b}) = C({c})'
    except TypeError as exc:
        print('EXCEPT test_retry_task')
        send_mail(
            'head message -> test_retry_task',
            f'body message -> test_retry_task\n\n{exc}',
            settings.EMAIL_HOST_USER,
            [settings.EMAIL_HOST_USER]
        )
        # countdown означает через какой интервал после возникновения исключения задача будет заного стартовать
        raise self.retry(exc=exc, countdown=60)
# Вызов асинхронной задачи
# test_retry_task.delay(2, "2")
# Вызов асинхронной задачи с задержкой перед стартом 60сек.
# test_retry_task.apply_async(args=(2, 2), countdown=60)
# Вызов асинхронной задачи с задержкой перед стартом 60сек. с помощью объекта времени.
# test_retry_task.apply_async(args=(2, 2), eta=timezone.now() + dt.timedelta(seconds=60))


@app.task
def test_beat_task(*args, **kwargs):
    send_mail(
        'head message -> test_beat_task',
        f'body message -> test_beat_task {args}',
        settings.EMAIL_HOST_USER,
        [settings.EMAIL_HOST_USER]
    )
    return 'SUCCEEDED test_beat_task'


@app.task
def test_cron_task(*args, **kwargs):
    send_mail(
        'head message -> test_cron_task',
        f'body message -> test_cron_task {kwargs}',
        settings.EMAIL_HOST_USER,
        [settings.EMAIL_HOST_USER]
    )
    return 'SUCCEEDED test_cron_task'

#############################################################################

# Команда поднятия сервера [worker]
# celery -A FriskesSite worker -l info -P eventlet
# проверить что celery запущен (из другого терминала внутри venv):
# celery -A FriskesSite status ЛИБО celery -A FriskesSite inspect stats

# Команда поднятия сервера [beat]
# [beat] работает только при запущенном [worker]
# celery -A FriskesSite beat -l info

# Команда поднятия сервера [flower]
# celery -A FriskesSite flower
# celery -A FriskesSite flower --url_prefix=flower # для запуска через представление django
# celery -A FriskesSite flower -l info --address=127.0.0.1 --port=5555
