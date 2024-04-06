from django.conf import settings
from django.core.handlers.asgi import ASGIRequest
from django.http import HttpResponsePermanentRedirect
from django.urls import translate_url
from django.utils import translation
from django.utils.deprecation import MiddlewareMixin


class LanguageCookieMiddleware(MiddlewareMixin):
    """#### Middleware устанавливающая локализацию на основе значения из Cookie."""

    response_redirect_class = HttpResponsePermanentRedirect

    def process_response(self, request: ASGIRequest, response):
        language_from_cookie = request.COOKIES.get(settings.LANGUAGE_COOKIE_NAME)

        if language_from_cookie is not None:
            next_trans = translate_url(request.path, language_from_cookie)

            if next_trans != request.path:
                translation.activate(language_from_cookie)
                response = self.response_redirect_class(next_trans)

        return response
