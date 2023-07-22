from django.contrib import admin
# from django.contrib.auth.models import User
# from django.contrib.auth.admin import UserAdmin
from django.utils.safestring import mark_safe
from django.db.models import TextField

from main_app.models import (
    CustomUser, ContactMe, ServiceInfo, TwitchStreamerInfo,
    HomeNews, Guides, Comments, Category, DressingRoom, Notification
)

from modeltranslation.admin import TranslationAdmin

from mptt.admin import DraggableMPTTAdmin#, MPTTModelAdmin

from tinymce.widgets import TinyMCE

from notifications.admin import NotificationAdmin


# https://docs.djangoproject.com/en/4.1/topics/auth/customizing/
# https://docs.djangoproject.com/en/4.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.fieldsets

# Register your models here.

#############################################################################

admin.site.site_title = 'FRISHUB' # название во вкладке браузера
admin.site.site_header = 'Администрирование FRISHUB' # название шапки админки

#############################################################################

# Отменяю регистрацию класса NotificationAdmin
# которая была сделана в файле notifications.admin
# для регистрация переопределенного класса CustomNotificationAdmin
admin.site.unregister(Notification)

@admin.register(Notification)
class CustomNotificationAdmin(NotificationAdmin):

    list_display = ('recipient', 'actor', 'timestamp', 'unread', 'deleted', 'emailed')

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

@admin.register(DressingRoom)
class DressingRoomAdmin(admin.ModelAdmin):

    model: DressingRoom = DressingRoom

    list_display = ('get_short_room_id', 'get_short_room_creator_id', 'allow_edit',
                    'game_patch', 'get_race_name', 'get_gender_name', 'last_update_time')

    list_editable = ('allow_edit',)

    search_fields = ('room_id', 'room_creator_id')

    readonly_fields = ('race_img65x65', 'game_patch_img65x65')

    fields = ('room_id', 'room_creator_id', 'allow_edit', ('game_patch', 'game_patch_img65x65'),
              ('race', 'race_img65x65'), 'gender', 'last_update_time', 'items', 'face', 'mount')

    def get_short_room_id(self, object):
        # print(getattr(self, 'GENDERS')) # self.__class__.__getattribute__(self, 'GENDERS')
        # print(vars(object)) # object.__dict__
        # print(vars(object._meta))
        # print(object.__doc__)
        # self.__class__.get_short_room_id.__setattr__('short_description', object._meta.get_field('room_id').verbose_name)
        # setattr(self.__class__.get_short_room_id, 'short_description', object._meta.get_field('room_id').verbose_name)

        setattr(type(self).get_short_room_id, 'short_description', object._meta.get_field('room_id').verbose_name)
        length = len(object.room_id)
        return f'...{object.room_id[length-7:length]}'

    def get_short_room_creator_id(self, object):
        setattr(type(self).get_short_room_creator_id, 'short_description', object._meta.get_field('room_creator_id').verbose_name)
        length = len(object.room_creator_id)
        return f'...{object.room_creator_id[length-7:length]}'

    def get_race_name(self, object):
        setattr(type(self).get_race_name, 'short_description', object._meta.get_field('race').verbose_name)
        return self.model.RACES.get(object.race, 'Раса неизвестна')

    def get_gender_name(self, object):
        setattr(type(self).get_gender_name, 'short_description', object._meta.get_field('gender').verbose_name)
        return self.model.GENDERS.get(object.gender, 'Пол неизвестен')

    def race_img65x65(self, object):
        setattr(type(self).race_img65x65, 'short_description', '')

        if object.race in self.model.RACES_WITHOUT_ICON:
            src = '/static/main_app/images/close.png'
        else:
            race = self.model.RACES.get(object.race).lower()
            gender = self.model.GENDERS.get(object.gender).lower()

            src = f'{self.model.DEFAULT_ICON_URL}race_{race}_{gender}.jpg'

        return mark_safe(f'<img src="{src}" width="65">')

    def game_patch_img65x65(self, object):
        setattr(type(self).game_patch_img65x65, 'short_description', '')
        return mark_safe(f'<img src="/static/main_app/images/{object.game_patch}.png" width="65">')

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
                'dress_room_link',
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
                'dress_room_link',
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

    def get_html_avatar30x30(self, object: CustomUser):
        """Подставляет html код с изображением вместо дефолтного пути к изображению."""

        if object.avatar:
            # функция mark_safe позволяет не экранировать html тэги а передать строку какая она есть
            return mark_safe(f'<img src="{object.avatar.url}" width="30">')#<br>{str(object.avatar)[19:]}')

        return mark_safe(f'<img src="{object.get_avatar()}" width="30">')#<br>{str(object.get_avatar())[24:]}')

    # указываем название для колонки с изображениями
    get_html_avatar30x30.short_description = 'Аватар'


    def get_html_avatar65x65(self, object: CustomUser):
        """Подставляет html код с изображением вместо дефолтного пути к изображению."""

        if object.avatar:
            return mark_safe(f'<img src="{object.avatar.url}" width="65">')

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

    # formfield_overrides = {
    #     TextField: {
    #         'widget': TinyMCE(
    #             attrs={'cols': 80, 'rows': 30},
    #             # https://www.tiny.cloud/docs/general-configuration-guide/
    #             mce_attrs={'skin': 'oxide-dark', 'content_css': 'dark'}
    #         )
    #     },
    # }

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
        return ''
    get_html_avatar30x30.short_description = 'Изображение'

    def get_html_avatar65x65(self, object: Guides):
        if object.main_image:
            return mark_safe(f'<img src="{object.main_image.url}" width="65">')
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
        return ''
    get_html_avatar30x30.short_description = 'Изображение категории'

    def get_html_avatar65x65(self, object: Category):
        if object.image_name:
            return mark_safe(f'<img src="{object.image_name.url}" width="65">')
        return ''
    get_html_avatar65x65.short_description = ''

#############################################################################
