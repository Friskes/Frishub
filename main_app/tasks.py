from __future__ import annotations

from django.core.cache import cache
from django.core.mail import send_mail
from django.template.loader import get_template
from FriskesSite import settings
from FriskesSite.celery import celery_app
from notifications.signals import notify

from main_app.models import CustomUser, Notification
from main_app.services.parse_twitch_streams import twitch_stream_parser


@celery_app.task
def contact_me_send_mail_task(
    preheader_msg: str, body_msg: str, sender_email: str, recipients_emails: list[str]
):
    """Отправляет с серверной почты на серверную почту (самому себе) имейл
    с сообщением от пользователя с формы обратной связи."""

    # функция работы с почтой встроенная в django
    send_mail(
        subject=preheader_msg,  # Тема сообщения
        message=body_msg,  # Содержание сообщения
        from_email=sender_email,  # Наша серверная почта
        recipient_list=recipients_emails,  # Список получателей сообщения
    )


@celery_app.task
def send_newsletter_by_email_to_all_users_task(*args, **kwargs):
    """Отправляет новостное сообщение на почту всем пользователям сайта."""

    users = CustomUser.objects.filter(subscribe_newsletter=True)
    users_email = [user.email for user in users]  # if not user.is_superuser
    send_mail(
        args[1],
        '',
        settings.EMAIL_HOST_USER,
        users_email,
        html_message=get_template('emails/news_email.html').render(
            context={
                'btn_href': args[0],
                'msg_before_btn': args[2],
                'btn_text': 'Перейти на страницу',
                'footer_text': 'Хотите отписаться от новостной рассылки?',
            }
        ),
    )


@celery_app.task
def send_news_by_notify_to_all_users_task(*args, **kwargs):
    """Отправляет новостное сообщение уведомлением всем пользователям сайта."""

    admin = CustomUser.objects.get(is_superuser=True)
    users = CustomUser.objects.all()

    for user in users:
        notify.send(admin, recipient=user, verb=args[1], notify_href=args[0])


@celery_app.task
def twitch_stream_count_task() -> list | list[dict[str, str | int | dict[str, dict[str, str]]]]:
    """Делает запрос к twitch API получает всех онлайн стримеров
    записывает их в кэш и возвращает."""

    twitch_streams = twitch_stream_parser.get_twitch_stream_data()
    cache.set('twitch_streams', twitch_streams, 60)  # секунды
    return twitch_streams


@celery_app.task
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
            html_message=get_template('emails/news_email.html').render(
                context={
                    'btn_href': kwargs['href'],
                    'msg_before_btn': f"{kwargs['actor_username']} {notification.verb}",
                    'btn_text': 'Перейти к комментарию',
                    'footer_text': 'Хотите отписаться от уведомлений по почте?',
                }
            ),
        )


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
