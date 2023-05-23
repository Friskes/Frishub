# from django.http import HttpResponse
from django.conf import settings
from django.core.mail import send_mail
from django.core.handlers.asgi import ASGIRequest

import traceback

import logging
log = logging.getLogger(__name__)


#############################################################################

class ErrorHandlerMiddleware:
    """#### Middleware для отлова ошибок которые не были отловлены в бизнес логике приложения\
    и отправки Traceback'a ошибок администраторам на почту."""

    def __init__(self, get_response):
        self.get_response = get_response


    def __call__(self, request):
        response = self.get_response(request)
        # log.error(f'status_code: {response.status_code}')
        return response


    def process_exception(self, request: ASGIRequest, exception):
        if exception and not settings.DEBUG:

            error_url = request.build_absolute_uri()
            view_name = request.resolver_match.view_name
            error_traceback = traceback.format_exc()
            error = repr(exception)
            path = f'Internal Server Error: {request.path}'

            message = (("-"*99) + "\n{0}\n{1}\n\n{2}\n{3}" + ("-"*99)).format(error_url, view_name, path, error_traceback)
            log.error(message)

            message_head = f'[ERROR] Произошла ошибка: {error} На странице: {error_url}'

            send_mail(
                subject=message_head,
                message=error_traceback,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.EMAIL_HOST_USER],
            )

            # return HttpResponse("<h1>Текст ошибки.</h1>", status=500)

#############################################################################
