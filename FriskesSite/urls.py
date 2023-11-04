"""FriskesSite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.i18n import i18n_patterns
from django.views.i18n import JavaScriptCatalog
from django.conf.urls.static import static

import notifications.urls

from FriskesSite import settings
import main_app.urls


urlpatterns = [
    path('admin/', admin.site.urls),

    path('tinymce/', include('tinymce.urls')),

    # доступные запросы к API можно посмотреть в файле: venv\Lib\site-packages\notifications\urls.py
    re_path('^inbox/notifications/', include(notifications.urls, namespace='notifications')),

    # префикс локализации не должен иметь влияния на API, поэтому все API должны быть размещены вне i18n_patterns.
    # С размещением внутри i18n_patterns вызывало ошибку в браузере:
    # GET "url" net::ERR_TOO_MANY_REDIRECTS или Failed to load resource: net::ERR_TOO_MANY_REDIRECTS
    # изза middleware которая перенаправляет на URL с префиксом равным локализации из Cookies клиента.
    *main_app.urls.api_urlpatterns,

    path("jsi18n/", JavaScriptCatalog.as_view(), name="javascript-catalog"),
]


urlpatterns += i18n_patterns(
    path('i18n/', include('django.conf.urls.i18n')),

    path('', include('main_app.urls')),

    # отключить добавочный префикс языка выбранного по умолчанию в url
    prefix_default_language=False,
)

if settings.ENABLE_DEBUGTB:
    urlpatterns = [path('__debug__/', include('debug_toolbar.urls'))] + urlpatterns

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


handler400 = 'main_app.views.bad_request'
handler403 = 'main_app.views.permission_denied'
handler404 = 'main_app.views.page_not_found'
handler500 = 'main_app.views.server_error'
