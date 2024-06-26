from django.contrib.auth.decorators import login_required

# тоже самое что и "{% static 'путь_к_файлу' %}" в шаблонах
from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import path, re_path
from django.views.generic import RedirectView
from FriskesSite.env import CELERY_FLOWER_URL_PREFIX

from main_app import views
from main_app.models import Comments, Guides, LikeDislike

api_urlpatterns = [
    path(
        'api/modelviewer/<path:modelviewer_path>', views.ZamimgProxyView.as_view(), name='zamimg_proxy'
    ),
    re_path(
        r'^api/comment/(?P<pk>\d+)/like/$',
        login_required(views.VotesView.as_view(model=Comments, vote_type=LikeDislike.LIKE)),
        name='comment_like',
    ),
    re_path(
        r'^api/comment/(?P<pk>\d+)/dislike/$',
        login_required(views.VotesView.as_view(model=Comments, vote_type=LikeDislike.DISLIKE)),
        name='comment_dislike',
    ),
    re_path(
        r'^api/guide/(?P<pk>\d+)/like/$',
        login_required(views.VotesView.as_view(model=Guides, vote_type=LikeDislike.LIKE)),
        name='guide_like',
    ),
    re_path(
        r'^api/guide/(?P<pk>\d+)/dislike/$',
        login_required(views.VotesView.as_view(model=Guides, vote_type=LikeDislike.DISLIKE)),
        name='guide_dislike',
    ),
    re_path(
        r'^api/mark-as-read/(?P<notify_pk>\d+)/(?P<actor_object_id>\d+)/(?P<recipient_id>\d+)/(?P<guide_slug>[-\w]+)/(?P<comment_pk>\d+)/$',
        views.NotifyMarkAsReadView.as_view(),
        name='api_mark_as_read',
    ),
]


urlpatterns = [
    re_path(
        f'{CELERY_FLOWER_URL_PREFIX}/(?P<path>.*)',
        views.flower_proxy_view,
        name=CELERY_FLOWER_URL_PREFIX,
    ),
    path(
        'favicon.ico/',
        RedirectView.as_view(url=staticfiles_storage.url('main_app/images/favicon.ico'), permanent=True),
        name='favicon',
    ),
    path('', views.HomeView.as_view(), name='home'),
    path('guides/', views.GuidesListView.as_view(), name='guides'),
    path('category/<slug:category_slug>/', views.FilteringGuidesView.as_view(), name='category'),
    path('guides/<slug:guide_slug>/', views.GuideView.as_view(), name='guide'),
    path('game-chat/', views.GameChatView.as_view(), name='game_chat'),
    path('dev-chat/', views.DevChatView.as_view(), name='dev_chat'),
    path('dev-chat/<uuid:room_id>/', views.DevChatRoomView.as_view(), name='dev_chat_room'),
    path('streams/', views.StreamsView.as_view(), name='streams'),
    path('tasks/<uuid:task_id>/', views.get_task_status_view, name='tasks'),
    path('dressing-room/', views.DressingRoomView.as_view(), name='dressing_room'),
    path(
        'dressing-room/<uuid:room_id>/',
        views.UniqueDressingRoomView.as_view(),
        name='unique_dressing_room',
    ),
    path('arena-point-calculator/', views.ArenaPointCalculatorView.as_view(), name='ap_calculator'),
    ##################### Авторизация #####################
    path('register/', views.RegisterView.as_view(), name='register'),
    path('terms-of-use/', views.TermsOfUseView.as_view(), name='terms_of_use'),
    path('login/', views.LoginCustomView.as_view(), name='login'),
    path('logout/', views.LogoutCustomView.as_view(), name='logout'),
    path('password-reset/1/', views.PasswordResetCustomView1.as_view(), name='password_reset1'),
    path('password-reset/2/', views.PasswordResetCustomView2.as_view(), name='password_reset2'),
    path(
        'password-reset/done/', views.PasswordResetDoneCustomView.as_view(), name='password_reset_done'
    ),
    path(
        'password-reset/<uidb64>/<token>/',
        views.PasswordResetConfirmCustomView.as_view(),
        name='password_reset_confirm',
    ),
    path(
        'password-reset/complete/',
        views.PasswordResetCompleteCustomView.as_view(),
        name='password_reset_complete',
    ),
    path('contact-me/', views.ContactMeView.as_view(), name='contact_me'),
    ##################### Аккаунт #####################
    path('account/', views.AccountView.as_view(), name='account'),
    path('account/settings/', views.AccountSettingsView.as_view(), name='account_settings'),
    path('account/password/', views.PasswordChangeCustomView.as_view(), name='account_password'),
    path('account/email/', views.AccountEmailView.as_view(), name='account_email'),
    path('account/delete/', views.AccountDeleteView.as_view(), name='account_delete'),
]
