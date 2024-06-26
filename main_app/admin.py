from __future__ import annotations

from typing import TYPE_CHECKING

from django.contrib import admin
from django.db.models import TextField

# from django.contrib.auth.models import User
# from django.contrib.auth.admin import UserAdmin
from django.utils.safestring import SafeText, mark_safe
from modeltranslation.admin import TranslationAdmin
from mptt.admin import DraggableMPTTAdmin  # , MPTTModelAdmin
from notifications.admin import NotificationAdmin
from pytils.translit import translify
from tinymce.widgets import TinyMCE

from main_app.models import (
    Category,
    Comments,
    ContactMe,
    CustomUser,
    DressingRoom,
    Guides,
    HomeNews,
    Notification,
    ServiceInfo,
    TwitchStreamerInfo,
)

if TYPE_CHECKING:
    from collections.abc import Callable

    from django.core.handlers.asgi import ASGIRequest
    from django.db.models.query import QuerySet
    from django.forms import ModelForm

# https://docs.djangoproject.com/en/4.1/topics/auth/customizing/
# https://docs.djangoproject.com/en/4.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.fieldsets


admin.site.site_title = 'FRISHUB'  # название во вкладке браузера
admin.site.site_header = 'Администрирование FRISHUB'  # название шапки админки

# Отменяю регистрацию класса NotificationAdmin
# которая была сделана в файле notifications.admin
# для регистрация переопределенного класса CustomNotificationAdmin
admin.site.unregister(Notification)


@admin.register(Notification)
class CustomNotificationAdmin(NotificationAdmin):
    list_display = ('recipient', 'actor', 'timestamp', 'unread', 'deleted', 'emailed')


# при переводе полей модели необходимо наследоватся от TranslationAdmin
# для исключения отображения дефолтного поля в админке
@admin.register(HomeNews)
class HomeNewsAdmin(TranslationAdmin):
    list_display = ('news', 'date')


@admin.register(ContactMe)
class ContactMeAdmin(admin.ModelAdmin):
    list_display = ('email', 'date_time')

    fields = ('email', 'message', 'date_time')

    readonly_fields = ('email', 'message', 'date_time')


@admin.register(DressingRoom)
class DressingRoomAdmin(admin.ModelAdmin):
    model: DressingRoom = DressingRoom

    raw_id_fields = ('creator',)

    list_display = (
        'get_short_room_id',
        'get_short_room_creator_id',
        'allow_edit',
        'game_patch',
        'get_race_name',
        'get_gender_name',
        'last_update_time',
    )

    list_editable = ('allow_edit',)

    search_fields = ('room_id', 'room_creator_id')

    readonly_fields = ('race_img65x65', 'game_patch_img65x65')

    fields = (
        'room_id',
        'room_creator_id',
        'creator',
        'allow_edit',
        ('game_patch', 'game_patch_img65x65'),
        ('race', 'race_img65x65'),
        'gender',
        'last_update_time',
        'items',
        'face',
        'mount',
    )

    def get_short_room_id(self, obj: DressingRoom) -> str:
        # print(getattr(self, 'GENDERS')) # self.__class__.__getattribute__(self, 'GENDERS')
        # print(vars(obj)) # obj.__dict__
        # print(vars(obj._meta))
        # print(obj.__doc__)
        # self.__class__.get_short_room_id.__setattr__(
        #     'short_description', obj._meta.get_field('room_id').verbose_name
        # )
        # self.__class__.get_short_room_id.short_description = obj._meta.get_field(
        #     'room_id'
        # ).verbose_name

        type(self).get_short_room_id.short_description = obj._meta.get_field('room_id').verbose_name
        length = len(obj.room_id)
        return f'...{obj.room_id[length-7:length]}'

    def get_short_room_creator_id(self, obj: DressingRoom) -> str:
        type(self).get_short_room_creator_id.short_description = obj._meta.get_field(
            'room_creator_id'
        ).verbose_name
        length = len(obj.room_creator_id)
        return f'...{obj.room_creator_id[length-7:length]}'

    def get_race_name(self, obj: DressingRoom) -> str:
        type(self).get_race_name.short_description = obj._meta.get_field('race').verbose_name
        return self.model.RACES.get(obj.race, 'Раса неизвестна')

    def get_gender_name(self, obj: DressingRoom) -> str:
        type(self).get_gender_name.short_description = obj._meta.get_field('gender').verbose_name
        return self.model.GENDERS.get(obj.gender, 'Пол неизвестен')

    def race_img65x65(self, obj: DressingRoom) -> SafeText:
        type(self).race_img65x65.short_description = ''

        if obj.race in self.model.RACES_WITHOUT_ICON:
            src = '/static/main_app/images/close.png'
        else:
            race = self.model.RACES.get(obj.race).lower()
            gender = self.model.GENDERS.get(obj.gender).lower()

            src = f'{self.model.DEFAULT_ICON_URL}race_{race}_{gender}.jpg'

        return mark_safe(f'<img src="{src}" width="65">')

    def game_patch_img65x65(self, obj: DressingRoom) -> SafeText:
        type(self).game_patch_img65x65.short_description = ''
        return mark_safe(f'<img src="/static/main_app/images/{obj.game_patch}.png" width="65">')


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser

    # указываем поля которые будут отображатся в меню
    list_display = (
        'id',
        'username',
        'email',
        'is_staff',
        'is_active',
        'last_login',
        'date_joined',
        'get_html_avatar30x30',
    )

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
        (
            'Персональная Информация',
            {
                'fields': (
                    'username',
                    'password',
                    'email',
                    'first_name',
                    'last_name',
                    'gender',
                    ('avatar', 'get_html_avatar65x65'),
                )
            },
        ),
        (
            'Второстепенная персональная информация',
            {
                'fields': (
                    'discord_username',
                    'battlenet_username',
                    'twitch_link',
                    'dress_room_link',
                    'game_class',
                )
            },
        ),
        (
            'Важные Даты',
            {
                'classes': ('collapse',),
                'fields': (
                    'birth_date',
                    'last_login',
                    'date_joined',
                ),
            },
        ),
        (
            'Права Доступа',
            {
                'classes': ('collapse',),
                'fields': (
                    'is_superuser',
                    'is_staff',
                    'is_active',
                    'groups',
                    'user_permissions',
                ),
            },
        ),
    )
    # редактирование полей
    fieldsets = (
        # *UserAdmin.fieldsets,
        (
            'Персональная Информация',
            {
                'fields': (
                    'username',
                    'password',
                    'email',
                    'first_name',
                    'last_name',
                    'gender',
                    ('avatar', 'get_html_avatar65x65'),
                )
            },
        ),
        (
            'Второстепенная персональная информация',
            {
                'fields': (
                    'discord_username',
                    'battlenet_username',
                    'twitch_link',
                    'dress_room_link',
                    'game_class',
                )
            },
        ),
        (
            'Важные Даты',
            {
                'classes': ('collapse',),
                'fields': (
                    'birth_date',
                    'last_login',
                    'date_joined',
                ),
            },
        ),
        (
            'Права Доступа',
            {
                'classes': ('collapse',),
                'fields': (
                    'is_superuser',
                    'is_staff',
                    'is_active',
                    'groups',
                    'user_permissions',
                ),
            },
        ),
    )

    def get_html_avatar30x30(self, obj: CustomUser) -> SafeText:
        """Подставляет html код с изображением вместо дефолтного пути к изображению."""

        if obj.avatar:
            # функция mark_safe позволяет не экранировать html тэги а передать строку какая она есть
            return mark_safe(f'<img src="{obj.avatar.url}" width="30">')  # <br>{str(obj.avatar)[19:]}')

        return mark_safe(
            f'<img src="{obj.get_avatar()}" width="30">'
        )  # <br>{str(obj.get_avatar())[24:]}')

    # указываем название для колонки с изображениями
    get_html_avatar30x30.short_description = 'Аватар'

    def get_html_avatar65x65(self, obj: CustomUser) -> SafeText:
        """Подставляет html код с изображением вместо дефолтного пути к изображению."""

        if obj.avatar:
            return mark_safe(f'<img src="{obj.avatar.url}" width="65">')

        return mark_safe(f'<img src="{obj.get_avatar()}" width="65">')

    get_html_avatar65x65.short_description = ''


@admin.register(ServiceInfo)
class ServiceInfoAdmin(admin.ModelAdmin):
    model = ServiceInfo

    # fields = ('server_email_login', 'server_email_password',
    # 'discord_login', 'discord_password', 'discord_token',
    # 'twitch_login', 'twitch_password', 'twitch_client_id', 'twitch_client_secret', 'twitch_token')

    # readonly_fields = ('discord_token', 'twitch_token')

    add_fieldsets = (
        (
            'Серверная почта',
            {
                'description': ('После изменения полей требуется перезагрузка сервера.'),
                'fields': (
                    'server_email_login',
                    'server_email_password',
                ),
            },
        ),
        (
            'Данные Discord',
            {
                'description': ('После изменения полей требуется перезагрузка сервера.'),
                'fields': (
                    'discord_login',
                    'discord_password',
                    'discord_token',
                ),
            },
        ),
        (
            'Данные Twitch',
            {
                'description': ('После изменения полей требуется перезагрузка сервера.'),
                'fields': (
                    'twitch_login',
                    'twitch_password',
                    'twitch_client_id',
                    'twitch_client_secret',
                    'twitch_token',
                ),
            },
        ),
        (
            'Данные капчи',
            {
                'description': ('После изменения полей требуется перезагрузка сервера.'),
                'fields': (
                    'recaptcha_public_key',
                    'recaptcha_private_key',
                ),
            },
        ),
        (
            'Данные сервиса решения капчи',
            {
                'description': ('После изменения полей требуется перезагрузка сервера.'),
                'fields': ('apikey_for_captcha_solution',),
            },
        ),
    )
    fieldsets = (
        (
            'Серверная почта',
            {
                'description': ('После изменения полей требуется перезагрузка сервера.'),
                'fields': (
                    'server_email_login',
                    'server_email_password',
                ),
            },
        ),
        (
            'Данные Discord',
            {
                'description': ('После изменения полей требуется перезагрузка сервера.'),
                'fields': (
                    'discord_login',
                    'discord_password',
                    'discord_token',
                ),
            },
        ),
        (
            'Данные Twitch',
            {
                'description': ('После изменения полей требуется перезагрузка сервера.'),
                'fields': (
                    'twitch_login',
                    'twitch_password',
                    'twitch_client_id',
                    'twitch_client_secret',
                    'twitch_token',
                ),
            },
        ),
        (
            'Данные капчи',
            {
                'description': ('После изменения полей требуется перезагрузка сервера.'),
                'fields': (
                    'recaptcha_public_key',
                    'recaptcha_private_key',
                ),
            },
        ),
        (
            'Данные сервиса решения капчи',
            {
                'description': ('После изменения полей требуется перезагрузка сервера.'),
                'fields': ('apikey_for_captcha_solution',),
            },
        ),
    )


@admin.register(TwitchStreamerInfo)
class TwitchStreamerInfoAdmin(admin.ModelAdmin):
    model = TwitchStreamerInfo

    search_fields = ('streamer',)

    list_display = (
        'streamer',
        # 'warrior', 'paladin', 'hunter', 'rogue', 'priest',
        # 'death_knight', 'shaman', 'mage', 'warlock', 'druid',
        '_warrior',
        '_paladin',
        '_hunter',
        '_rogue',
        '_priest',
        '_death_knight',
        '_shaman',
        '_mage',
        '_warlock',
        '_druid',
    )

    # надо как то уменьшить ширину инпута, как то форму мб наследовать и там изменить
    # list_editable = ('warrior', 'paladin', 'hunter', 'rogue', 'priest',
    #                  'death_knight', 'shaman', 'mage', 'warlock', 'druid')

    add_fieldsets = (
        (None, {'fields': ('streamer',)}),
        (
            'Игровой Опыт',
            {
                'description': ('Максимальный рейтинг в любом из брекетов.'),
                'fields': (
                    ('warrior', 'paladin'),
                    ('hunter', 'rogue'),
                    ('priest', 'death_knight'),
                    ('shaman', 'mage'),
                    ('warlock', 'druid'),
                ),
            },
        ),
    )
    fieldsets = (
        (None, {'fields': ('streamer',)}),
        (
            'Игровой Опыт',
            {
                'description': ('Максимальный рейтинг в любом из брекетов.'),
                'fields': (
                    ('warrior', 'paladin'),
                    ('hunter', 'rogue'),
                    ('priest', 'death_knight'),
                    ('shaman', 'mage'),
                    ('warlock', 'druid'),
                ),
            },
        ),
    )


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


# class CommentsInline(admin.TabularInline): # выстраивает поля по горизонтали
class CommentsInline(admin.StackedInline):
    model = Comments
    # указываем количество отображаемых пустых полей
    extra = 0

    fields = ('is_published', 'author', 'parent', 'time_create', 'content')
    readonly_fields = ('author', 'parent', 'time_create')


@admin.register(Guides)
class GuidesAdmin(TranslationAdmin):
    model = Guides

    # https://django-tinymce.readthedocs.io/en/latest/usage.html#the-flatpages-link-list-view
    # определить виджет для конкретных полей модели
    # def formfield_for_dbfield(self, db_field, request, **kwargs):
    #     if db_field.name == 'content':
    #         return db_field.formfield(widget=TinyMCE(
    #             attrs={'cols': 80, 'rows': 30},
    #             # https://www.tiny.cloud/docs/general-configuration-guide/
    #             mce_attrs={'skin': 'oxide-dark', 'content_css': 'dark', 'readonly': False}
    #         ))
    #     return super().formfield_for_dbfield(db_field, request, **kwargs)

    # определить виджет для всех TextField полей модели
    formfield_overrides = {
        TextField: {
            'widget': TinyMCE(
                attrs={'cols': 80, 'rows': 30},
                # https://www.tiny.cloud/docs/general-configuration-guide/
                mce_attrs={'skin': 'oxide-dark', 'content_css': 'dark', 'readonly': False},
            )
        },
    }

    inlines = [CommentsInline]

    save_on_top: bool = True

    # Вместо кнопки "Сохранить и добавить новый объект"
    # появляется кнопка "Сохранить как новый объект"
    # при нажатии на данную кнопку, все поля заполненные на текущей странице будут
    # скопированы для создания нового объекта.
    # save_as = True

    list_display = (
        'id',
        'title',
        'category',
        'slug',
        'get_html_avatar30x30',
        'is_published',
        'get_likes_count',
        'get_dislikes_count',
        'get_comments_count',
    )
    list_display_links = ('title',)

    list_editable = ('is_published',)

    prepopulated_fields = {'slug': ('title',)}

    readonly_fields = (
        'get_html_avatar65x65',
        'time_create',
        'time_update',
        'get_likes_count',
        'get_dislikes_count',
        'get_comments_count',
    )

    raw_id_fields = ('guide_creator',)

    # Удобное выпадающее меню с объектами
    # autocomplete_fields = ('guide_creator',)

    actions = ('set_guides_to_published',)

    add_fieldsets = (
        (
            'Основная информация',
            {
                'fields': (
                    'is_published',
                    'guide_creator',
                    'category',
                    'title',
                    'slug',
                    ('main_image', 'get_html_avatar65x65'),
                    'content',
                )
            },
        ),
        (
            'Время',
            {
                'fields': (
                    'time_create',
                    'time_update',
                )
            },
        ),
        (
            'Статистика',
            {
                'fields': (
                    'get_likes_count',
                    'get_dislikes_count',
                    'get_comments_count',
                )
            },
        ),
    )
    fieldsets = (
        (
            'Основная информация',
            {
                'fields': (
                    'is_published',
                    'guide_creator',
                    'category',
                    'title',
                    'slug',
                    ('main_image', 'get_html_avatar65x65'),
                    'content',
                )
            },
        ),
        (
            'Время',
            {
                'fields': (
                    'time_create',
                    'time_update',
                )
            },
        ),
        (
            'Статистика',
            {
                'fields': (
                    'get_likes_count',
                    'get_dislikes_count',
                    'get_comments_count',
                )
            },
        ),
    )

    # https://docs.djangoproject.com/en/4.2/ref/contrib/admin/
    # Если пользователь суперпользователь тогда ему разрешено редактировать любые объекты.
    # Если пользователь ниже рангом чем суперпользователь тогда ему разрешено редактировать
    # только свой объект.
    def has_change_permission(self, request: ASGIRequest, obj: Guides | None = None) -> bool:
        if (
            not obj
            and not request.user.is_superuser
            or obj
            and obj.guide_creator != request.user
            and not request.user.is_superuser
        ):
            return False
        return True

        # https://youtu.be/wlYaUvfXJDc?t=2482
        # 'название_приложения.codename_by_content_type_id'
        # if request.user.has_perm('main_app.change_guides'):
        #     return True
        # return False

    # аналогично с has_change
    def has_delete_permission(self, request: ASGIRequest, obj: Guides | None = None) -> bool:
        if (
            not obj
            and not request.user.is_superuser
            or obj
            and obj.guide_creator != request.user
            and not request.user.is_superuser
        ):
            return False
        return True

    # def has_add_permission(self, request: ASGIRequest):
    #     return False

    # def has_view_permission(self, request: ASGIRequest, obj=None):
    #     return False

    # Добавляет новое действие в список действий
    def set_guides_to_published(self, request: ASGIRequest, queryset: QuerySet):
        count = queryset.update(is_published=True)
        self.message_user(request, f'{count} гайдов были успешно опубликованы.')

    set_guides_to_published.short_description = 'Публикация выбранных гайдов'

    # Удаляет из списка действий указанные действия
    def get_actions(self, request: ASGIRequest) -> dict[str, tuple[str, Callable]]:
        actions = super().get_actions(request)
        if not request.user.is_superuser:
            if 'delete_selected' in actions:
                del actions['delete_selected']
            if 'set_guides_to_published' in actions:
                del actions['set_guides_to_published']
        return actions

    # Запретить редактировать определенные элементы пользователю с недостаточными правами
    def get_form(self, request: ASGIRequest, obj: Guides | None = None, **kwargs) -> ModelForm:
        form: ModelForm = super().get_form(request, obj, **kwargs)
        if not request.user.is_superuser:
            form.base_fields['is_published'].disabled = True
            form.base_fields['guide_creator'].disabled = True
        return form

    # Автоматически сохраняет в поле guide_creator пользователя который создаёт гайд
    def save_model(self, request: ASGIRequest, obj: Guides, form: ModelForm, change: bool):
        # если пользователь не является суперпользователем
        # тогда всегда снимаем с публикации его гайд после любого изменения

        if obj.main_image.name:
            obj.main_image.name = translify(obj.main_image.name)

        if not request.user.is_superuser:
            obj.is_published = False

        # сохраняем создателя гайда только при создании гайда
        if not obj.guide_creator:
            obj.guide_creator = request.user

        # если поле guide_creator было изменено намеренно тогда принимаем эти изменения
        elif (
            form.cleaned_data.get('guide_creator')
            and form.cleaned_data.get('guide_creator') != obj.guide_creator
        ):
            obj.guide_creator = form.cleaned_data['guide_creator']

        super().save_model(request, obj, form, change)

    # Автоматически заполняет форму поля guide_creator текущим пользователем
    def get_changeform_initial_data(self, request: ASGIRequest) -> dict[str, int]:
        get_data = super().get_changeform_initial_data(request)
        get_data['guide_creator'] = request.user.pk
        return get_data

    def get_html_avatar30x30(self, obj: Guides) -> str | SafeText:
        if obj.main_image:
            return mark_safe(f'<img src="{obj.main_image.url}" width="30">')
        return ''

    get_html_avatar30x30.short_description = 'Изображение'

    def get_html_avatar65x65(self, obj: Guides) -> str | SafeText:
        if obj.main_image:
            return mark_safe(f'<img src="{obj.main_image.url}" width="65">')
        return ''

    get_html_avatar65x65.short_description = ''

    def get_likes_count(self, obj: Guides) -> int:
        return obj.votes.likes().count()

    get_likes_count.short_description = 'Лайков'

    def get_dislikes_count(self, obj: Guides) -> int:
        return obj.votes.dislikes().count()

    get_dislikes_count.short_description = 'Дизлайков'

    def get_comments_count(self, obj: Guides) -> int:
        return obj.comments.filter(is_published=True).count()

    get_comments_count.short_description = 'Комментариев'


@admin.register(Category)
class CategoryAdmin(TranslationAdmin):
    list_display = ('id', 'name', 'slug', 'get_html_avatar30x30', 'is_published')
    list_display_links = ('name',)

    prepopulated_fields = {'slug': ('name',)}

    list_editable = ('is_published',)

    readonly_fields = ('get_html_avatar65x65',)
    fields = ('is_published', 'cat_creator', 'name', 'slug', ('image_name', 'get_html_avatar65x65'))

    raw_id_fields = ('cat_creator',)

    def has_change_permission(self, request: ASGIRequest, obj: Category | None = None) -> bool:
        if (
            not obj
            and not request.user.is_superuser
            or obj
            and obj.cat_creator != request.user
            and not request.user.is_superuser
        ):
            return False
        return True

    def has_delete_permission(self, request: ASGIRequest, obj: Category | None = None) -> bool:
        if (
            not obj
            and not request.user.is_superuser
            or obj
            and obj.cat_creator != request.user
            and not request.user.is_superuser
        ):
            return False
        return True

    def get_form(self, request: ASGIRequest, obj: Category | None = None, **kwargs) -> ModelForm:
        form: ModelForm = super().get_form(request, obj, **kwargs)
        if not request.user.is_superuser:
            form.base_fields['is_published'].disabled = True
            form.base_fields['cat_creator'].disabled = True
        return form

    def save_model(self, request: ASGIRequest, obj: Category, form: ModelForm, change: bool):
        if obj.image_name.name:
            obj.image_name.name = translify(obj.image_name.name)

        if not request.user.is_superuser:
            obj.is_published = False

        if not obj.cat_creator:
            obj.cat_creator = request.user

        elif (
            form.cleaned_data.get('cat_creator')
            and form.cleaned_data.get('cat_creator') != obj.cat_creator
        ):
            obj.cat_creator = form.cleaned_data['cat_creator']

        super().save_model(request, obj, form, change)

    def get_changeform_initial_data(self, request: ASGIRequest) -> dict[str, int]:
        get_data = super().get_changeform_initial_data(request)
        get_data['cat_creator'] = request.user.pk
        return get_data

    def get_html_avatar30x30(self, obj: Category) -> str | SafeText:
        if obj.image_name:
            return mark_safe(f'<img src="{obj.image_name.url}" width="30">')
        return ''

    get_html_avatar30x30.short_description = 'Изображение категории'

    def get_html_avatar65x65(self, obj: Category) -> str | SafeText:
        if obj.image_name:
            return mark_safe(f'<img src="{obj.image_name.url}" width="65">')
        return ''

    get_html_avatar65x65.short_description = ''
