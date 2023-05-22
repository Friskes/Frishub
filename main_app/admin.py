from django.contrib import admin
# from django.contrib.auth.models import User
# from django.contrib.auth.admin import UserAdmin
from django.utils.safestring import mark_safe

from main_app.models import (
    CustomUser, ContactMe, ServiceInfo, TwitchStreamerInfo,
    HomeNews, Guides, Comments, Category
)

from modeltranslation.admin import TranslationAdmin

from mptt.admin import DraggableMPTTAdmin#, MPTTModelAdmin


# https://docs.djangoproject.com/en/4.1/topics/auth/customizing/
# https://docs.djangoproject.com/en/4.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.fieldsets

# Register your models here.

#############################################################################

admin.site.site_title = 'FRISHUB' # название во вкладке браузера
admin.site.site_header = 'Администрирование FRISHUB' # название шапки админки

#############################################################################

# при переводе полей модели необходимо наследоватся от TranslationAdmin
# для исключения отображения дефолтного поля в админке
@admin.register(HomeNews)
class HomeNewsAdmin(TranslationAdmin):

    list_display = ('news', 'date')

#############################################################################

@admin.register(ContactMe)
class ContactMeAdmin(admin.ModelAdmin):

    list_display = ('email', 'date_time')

    fields = ('email', 'message', 'date_time')

    readonly_fields = ('email', 'message', 'date_time')

#############################################################################

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser

    # указываем поля которые будут отображатся в меню
    list_display = ('id', 'username', 'email', 'is_staff', 'is_active',
                    'last_login', 'date_joined', 'get_html_avatar30x30')

    # указываем поля в меню на которые можно кликнуть и перейти в профиль пользователя
    # (по умолчанию кликабельным полем считается самое первое)
    list_display_links = ('username',)

    # указываем поля в меню по которым можно будет производить поиск информации
    search_fields = ('username', 'email')

    # возможность редактировать поле прямо из меню, не заходя в профиль пользователя
    list_editable = ('is_staff', 'is_active')

    # сортировка порядка отображения по полям
    ordering = ['id']

    # добавляем бар справа в котором можено задавать фильтры по указанным полям для отображения
    # list_filter = ('id', 'username', 'email')

    # продублировать панель Удаления/Сохранения в самом верху на странице редактирования
    # save_on_top: bool = True

    # Свойство fields не может работать одновременно с add_fieldsets/fieldsets
    # указываем редактируемые поля которые будут отображаться в профиле пользователя
    # fields = ('username', 'password', 'email', 'first_name', 'last_name', 'gender', 'birth_date',
    #           'avatar', 'last_login', 'date_joined', 'is_superuser', 'is_staff', 'is_active',
    #           'discord_username', 'battlenet_username', 'twitch_link', 'game_class')

    # указываем НЕредактируемые поля которые будут отображаться
    # на странице редактирования просто как обычный текст,
    # так же необходимо продублировать данные поля в fields для их отображения
    readonly_fields = ('get_html_avatar65x65',)

    # Определяем поля в группы
    # создание полей
    add_fieldsets = (
        # *UserAdmin.add_fieldsets,
        ('Персональная Информация',
            {'fields': (
                'username',
                'password',
                'email',
                'first_name',
                'last_name',
                'gender',
                ('avatar', 'get_html_avatar65x65'),
        )}),
        ('Второстепенная персональная информация',
            {'fields': (
                'discord_username',
                'battlenet_username',
                'twitch_link',
                'game_class',
        )}),
        ('Важные Даты',
            {"classes": ("collapse",),
             'fields': (
                'birth_date',
                'last_login',
                'date_joined',
        )}),
        ('Права Доступа',
            {"classes": ("collapse",),
             'fields': (
                'is_superuser',
                'is_staff',
                'is_active',

                "groups",
                "user_permissions",
        )}),
    )
    # редактирование полей
    fieldsets = (
        # *UserAdmin.fieldsets,
        ('Персональная Информация',
            {'fields': (
                'username',
                'password',
                'email',
                'first_name',
                'last_name',
                'gender',
                ('avatar', 'get_html_avatar65x65'),
        )}),
        ('Второстепенная персональная информация',
            {'fields': (
                'discord_username',
                'battlenet_username',
                'twitch_link',
                'game_class',
        )}),
        ('Важные Даты',
            {"classes": ("collapse",),
             'fields': (
                'birth_date',
                'last_login',
                'date_joined',
        )}),
        ('Права Доступа',
            {"classes": ("collapse",),
             'fields': (
                'is_superuser',
                'is_staff',
                'is_active',

                "groups",
                "user_permissions",
        )}),
    )

    # подставляем кусок html кода вместо дефолтного пути к изображению
    def get_html_avatar30x30(self, object: CustomUser):
        if object.avatar:
            # функция mark_safe позволяет не экранировать html тэги а передать строку какая она есть
            return mark_safe(f'<img src="{object.avatar.url}" width="30">')#<br>{str(object.avatar)[19:]}')
        else:
            return mark_safe(f'<img src="{object.get_avatar()}" width="30">')#<br>{str(object.get_avatar())[24:]}')

    # указываем название для колонки с изображениями
    get_html_avatar30x30.short_description = 'Аватар'


    def get_html_avatar65x65(self, object: CustomUser):
        if object.avatar:
            return mark_safe(f'<img src="{object.avatar.url}" width="65">')
        else:
            return mark_safe(f'<img src="{object.get_avatar()}" width="65">')

    get_html_avatar65x65.short_description = ''

#############################################################################

@admin.register(ServiceInfo)
class ServiceInfoAdmin(admin.ModelAdmin):
    model = ServiceInfo

    # fields = ('server_email_login', 'server_email_password',
    # 'discord_login', 'discord_password', 'discord_token',
    # 'twitch_login', 'twitch_password', 'twitch_client_id', 'twitch_client_secret', 'twitch_token')

    readonly_fields = ('discord_token', 'twitch_token')

    add_fieldsets = (
        ('Серверная почта',
            {'description': ('После изменения полей требуется перезагрузка сервера.'),
             'fields': (
                'server_email_login',
                'server_email_password',
        )}),
        ('Данные Discord',
            {'description': ('После изменения полей требуется перезагрузка сервера.'),
             'fields': (
                'discord_login',
                'discord_password',
                'discord_token',
        )}),
        ('Данные Twitch',
            {'description': ('После изменения полей требуется перезагрузка сервера.'),
             'fields': (
                'twitch_login',
                'twitch_password',
                'twitch_client_id',
                'twitch_client_secret',
                'twitch_token',
        )}),
        ('Данные капчи',
            {'description': ('После изменения полей требуется перезагрузка сервера.'),
             'fields': (
                'recaptcha_public_key',
                'recaptcha_private_key',
        )}),
    )
    fieldsets = (
        ('Серверная почта',
            {'description': ('После изменения полей требуется перезагрузка сервера.'),
             'fields': (
                'server_email_login',
                'server_email_password',
        )}),
        ('Данные Discord',
            {'description': ('После изменения полей требуется перезагрузка сервера.'),
             'fields': (
                'discord_login',
                'discord_password',
                'discord_token',
        )}),
        ('Данные Twitch',
            {'description': ('После изменения полей требуется перезагрузка сервера.'),
             'fields': (
                'twitch_login',
                'twitch_password',
                'twitch_client_id',
                'twitch_client_secret',
                'twitch_token',
        )}),
        ('Данные капчи',
            {'description': ('После изменения полей требуется перезагрузка сервера.'),
             'fields': (
                'recaptcha_public_key',
                'recaptcha_private_key',
        )}),
    )

#############################################################################

@admin.register(TwitchStreamerInfo)
class TwitchStreamerInfoAdmin(admin.ModelAdmin):
    model = TwitchStreamerInfo

    search_fields = ('streamer',)

    list_display = ('streamer',
    # 'warrior', 'paladin', 'hunter', 'rogue', 'priest',
    # 'death_knight', 'shaman', 'mage', 'warlock', 'druid',
    '_warrior', '_paladin', '_hunter', '_rogue', '_priest',
    '_death_knight', '_shaman', '_mage', '_warlock', '_druid'
    )

    # надо как то уменьшить ширину инпута, как то форму мб наследовать и там изменить
    # list_editable = ('warrior', 'paladin', 'hunter', 'rogue', 'priest',
    #                  'death_knight', 'shaman', 'mage', 'warlock', 'druid')

    add_fieldsets = (
        (None,
            {'fields': (
                'streamer',
        )}),
        ('Игровой Опыт',
            {'description': ('Максимальный рейтинг в любом из брекетов.'),
             'fields': (
                ('warrior', 'paladin'),
                ('hunter', 'rogue'),
                ('priest', 'death_knight'),
                ('shaman', 'mage'),
                ('warlock', 'druid'),
        )}),
    )
    fieldsets = (
        (None,
            {'fields': (
                'streamer',
        )}),
        ('Игровой Опыт',
            {'description': ('Максимальный рейтинг в любом из брекетов.'),
             'fields': (
                ('warrior', 'paladin'),
                ('hunter', 'rogue'),
                ('priest', 'death_knight'),
                ('shaman', 'mage'),
                ('warlock', 'druid'),
        )}),
    )

#############################################################################

@admin.register(Comments)
class CommentsAdmin(DraggableMPTTAdmin):

    list_display = ('tree_actions', 'indented_title', 'is_published', 'time_create')
    list_display_links = ('indented_title',)
    list_editable = ('is_published',)

    fields = ('is_published', 'author', 'parent', 'time_create', 'content')
    readonly_fields = ('author', 'parent', 'time_create')
    # т.к. поле author является внешним ключём таблицы CustomUser,
    # необходимо обращатся к полям пользователя через 2 нижних подчёркивания
    search_fields = ('author__username', 'author__email', 'guide__title')

#############################################################################

# class CommentsInline(admin.TabularInline): # выстраивает поля по горизонтали
class CommentsInline(admin.StackedInline):
    model = Comments
    # указываем количество отображаемых пустых полей
    extra = 0

    fields = ('is_published', 'author', 'parent', 'time_create', 'content')
    readonly_fields = ('author', 'parent', 'time_create')

#############################################################################

@admin.register(Guides)
class GuidesAdmin(TranslationAdmin):
    model = Guides

    inlines = [CommentsInline]

    save_on_top: bool = True

    # Вместо кнопки "Сохранить и добавить новый объект" появляется кнопка "Сохранить как новый объект"
    # при нажатии на данную кнопку, все поля заполненные на текущей странице будут скопированы для создания нового объекта.
    # save_as = True

    list_display = ('id', 'title', 'category', 'slug', 'get_html_avatar30x30',
                    'is_published', 'get_likes_count', 'get_dislikes_count', 'get_comments_count')
    list_display_links = ('title',)

    list_editable = ('is_published',)

    prepopulated_fields = {'slug': ('title',)}

    readonly_fields = ('get_html_avatar65x65', 'time_create', 'time_update',
                       'get_likes_count', 'get_dislikes_count', 'get_comments_count')

    add_fieldsets = (
        ('Основная информация',
            {'fields': (
                'is_published',
                'category',
                'title',
                'slug',
                ('main_image', 'get_html_avatar65x65'),
                'content',
        )}),
        ('Время',
            {'fields': (
                'time_create',
                'time_update',
        )}),
        ('Статистика',
            {'fields': (
                'get_likes_count',
                'get_dislikes_count',
                'get_comments_count',
        )}),
    )
    fieldsets = (
        ('Основная информация',
            {'fields': (
                'is_published',
                'category',
                'title',
                'slug',
                ('main_image', 'get_html_avatar65x65'),
                'content',
        )}),
        ('Время',
            {'fields': (
                'time_create',
                'time_update',
        )}),
        ('Статистика',
            {'fields': (
                'get_likes_count',
                'get_dislikes_count',
                'get_comments_count',
        )}),
    )

    def get_html_avatar30x30(self, object: Guides):
        if object.main_image:
            return mark_safe(f'<img src="{object.main_image.url}" width="30">')
        else:
            return ''
    get_html_avatar30x30.short_description = 'Изображение'

    def get_html_avatar65x65(self, object: Guides):
        if object.main_image:
            return mark_safe(f'<img src="{object.main_image.url}" width="65">')
        else:
            return ''
    get_html_avatar65x65.short_description = ''

    def get_likes_count(self, object: Guides):
        return object.votes.likes().count()
    get_likes_count.short_description = 'Лайков'

    def get_dislikes_count(self, object: Guides):
        return object.votes.dislikes().count()
    get_dislikes_count.short_description = 'Дизлайков'

    def get_comments_count(self, object):
        return object.comments.filter(is_published=True).count()
    get_comments_count.short_description = 'Комментариев'

#############################################################################

@admin.register(Category)
class CategoryAdmin(TranslationAdmin):
    list_display = ('id', 'name', 'slug', 'get_html_avatar30x30')
    list_display_links = ('name',)
    prepopulated_fields = {'slug': ('name',)}

    readonly_fields = ('get_html_avatar65x65',)
    fields = ('name', 'slug', ('image_name', 'get_html_avatar65x65'))

    def get_html_avatar30x30(self, object: Category):
        if object.image_name:
            return mark_safe(f'<img src="{object.image_name.url}" width="30">')
        else:
            return ''
    get_html_avatar30x30.short_description = 'Изображение категории'

    def get_html_avatar65x65(self, object: Category):
        if object.image_name:
            return mark_safe(f'<img src="{object.image_name.url}" width="65">')
        else:
            return ''
    get_html_avatar65x65.short_description = ''

#############################################################################
