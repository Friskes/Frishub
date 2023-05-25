from django.http import HttpResponse
from django.conf import settings
from django.core.mail import send_mail
from django.core.handlers.asgi import ASGIRequest
from django.utils.deprecation import MiddlewareMixin
from django.utils import timezone, dateformat

import traceback

import logging
log = logging.getLogger(__name__)


#############################################################################

# https://docs.djangoproject.com/en/4.2/topics/http/middleware/
class ErrorHandlerMiddleware(MiddlewareMixin):
    """#### Middleware для отлова ошибок которые не были отловлены в бизнес логике приложения\
    и отправки Traceback'a ошибок администраторам на почту."""

    def process_request(self, request):
        """Вызывается до работы View"""

        self.exception = None
        # return HttpResponse("<h1>Какой то текст.</h1>")


    def process_exception(self, request, exception):
        """Вызывается во время сбоя работы View"""

        # print(timezone.localtime(timezone.now()).strftime("%Y-%m-%d %H:%M:%S"))
        # print(timezone.now().strftime("%Y-%m-%d %H:%M:%S"))
        self.exc_datetime: str = dateformat.format(timezone.now(), 'Y-m-d H:i:s')
        self.exception = exception
        self.traceback_exc = traceback.format_exc()
        # return HttpResponse("<h1>Текст ошибки.</h1>", status=500)


    def process_response(self, request, response: HttpResponse):
        """Вызывается после работы View"""

        if self.exception and not settings.DEBUG and response.status_code >= 500:
            self.send_mail_with_error_log(request)
        return response


    def send_mail_with_error_log(self, request: ASGIRequest):
        """Отправка Traceback'a на почту разработчика."""

        error = repr(self.exception)
        error_url = request.build_absolute_uri()
        message_head = f'[ERROR {self.exc_datetime}] Произошла ошибка: {error} На странице: {error_url}'

        view_name = request.resolver_match.view_name
        path = f'Internal Server Error: {request.path}'

        message = (("-"*99) + "\n{0}\n{1}\n\n{2}\n{3}" + ("-"*99)).format(error_url, view_name, path, self.traceback_exc)
        log.error(message)

        send_mail(
            subject=message_head,
            message=self.traceback_exc,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
        )

#############################################################################
