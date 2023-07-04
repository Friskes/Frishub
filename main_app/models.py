from django.utils.translation import gettext_lazy as _
from django.db import models
from django.contrib.auth.models import AbstractUser
# from django.db.models.fields.files import ImageFieldFile, FileField
from django.utils.html import format_html
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation, GenericForeignKey
from django.urls import reverse

from mptt.models import MPTTModel, TreeForeignKey

from multiselectfield import MultiSelectField

from datetime import date


# Create your models here.

# https://django.fun/ru/docs/django/4.1/topics/db/models/
# https://habr.com/ru/post/313764/

#############################################################################

class VisitorRecord(models.Model):
    """Модель создающая поля для хранения уникального идентификатора пользователя и время
    последней активности пользователя для отображения количества пользователей онлайн в шаблоне.
    - Доступные поля: user_ip, last_user_activity_time."""

    user_ip = models.CharField(max_length=40)

    last_user_activity_time = models.DateTimeField()

#############################################################################

CLASS_COLORS_ID = {
    '0': '198, 155, 109', '1': '244, 140, 186',
    '2': '170, 211, 114', '3': '255, 244, 104',
    '4': '255, 255, 255', '5': '196, 30, 58',
    '6': '0, 112, 221', '7': '63, 199, 235',
    '8': '135, 136, 238', '9': '255, 124, 10',
}


def get_user_avatar_dir_path(instance: AbstractUser, filename: str) -> str:
    """Генерируем путь к изображению вместе с названием изображения на основе имени пользователя."""

    file_path = f'user_avatars/{instance.username}/{filename}'
    return file_path


# https://stackoverflow.com/questions/6195478/max-image-size-on-file-upload
# https://timmyomahony.com/blog/upload-and-validate-image-from-url-in-django
# https://stackoverflow.com/questions/2472422/django-file-upload-size-limit
class CustomUser(AbstractUser):
    """#### Модель расширяющая стандартную модель пользователя.
    - Доступные поля: gender, avatar, birth_date, discord_username, battlenet_username, twitch_link, game_class.
    - Доступные константы: GENDERS, GAME_CLASSES.\n
    >>> Доступные методы: get_avatar -> str"""

    GENDERS = (
        ('male', _('Мужчина')),
        ('female', _('Женщина')),
    )
    gender = models.CharField(verbose_name=_('Пол'), max_length=6, choices=GENDERS, blank=True)

    # https://docs.djangoproject.com/en/4.1/ref/models/fields/#imagefield
    # 'python -m pip install Pillow'
    # значение параметра upload_to будет использоваться только
    # если сохранять форму с изображением через метод form.save()
    avatar = models.ImageField(verbose_name=_('Аватар'), max_length=100, upload_to=get_user_avatar_dir_path, blank=True,
                               help_text='Макс. разрешение 1920х1920, Макс объём 6МБ.')
                               # default='/static/main_app/images/default_avatar.png')

    # null=True потому что поле не может быть пустой строкой без даты
    birth_date = models.DateField(verbose_name=_('Дата рождения'), null=True, blank=True)

    discord_username = models.CharField(verbose_name=_('Имя пользователя Discord'), max_length=40, blank=True)

    battlenet_username = models.CharField(verbose_name=_('Имя пользователя Battle.net'), max_length=40, blank=True)

    # twitch_link = models.URLField(verbose_name=_('Ссылка на ваш Twitch'), max_length=200, null=True, blank=True)
    # CharField для большей гибкости при вводе укороченных адресов
    twitch_link = models.CharField(verbose_name=_('Ссылка на ваш Twitch'), max_length=200, null=True, blank=True)

    dress_room_link = models.CharField(verbose_name=_('Ссылка на вашу модель персонажа'), max_length=200, null=True, blank=True)

    GAME_CLASSES = (
        (0, _('Воин')), (1, _('Паладин')), (2, _('Охотник')),
        (3, _('Разбойник')), (4, _('Жрец')), (5, _('Рыцарь Смерти')),
        (6, _('Шаман')), (7, _('Маг')), (8, _('Чернокнижник')), (9, _('Друид')),
    )
    # https://github.com/goinnn/django-multiselectfield
    # pip install django-multiselectfield
    # max_choices поднимает исключение если пользователь попытается выбрать более 3 элементов
    # max_length ограничение на максимальное количество символов в поле в БД
    # (каждое значение разделяется запятой и они тоже учитываются в длинне)
    game_class = MultiSelectField(verbose_name=_('Игровой класс'), choices=GAME_CLASSES,
                                  max_choices=3, max_length=5, blank=True)


    def get_user_game_classes_data(self) -> dict:
        """Создаёт и возвращает словарь наполненный verbose_name и rgb кодом цвета игровых классов пользователя."""

        game_classes_data = {}
        for class_id in self.game_class:
            for class_id_and_verbose_name in self.GAME_CLASSES:
                if int(class_id) == class_id_and_verbose_name[0]:
                    if class_id_and_verbose_name[1] not in game_classes_data:
                        game_classes_data[class_id] = {}
                        game_classes_data[class_id].update({'verbose_name': class_id_and_verbose_name[1],
                                                            'class_colors': CLASS_COLORS_ID[class_id]})
        return game_classes_data


    def get_avatar(self) -> str:
        """Возвращает путь к аватару загруженному пользователем либо путь к дефолтному аватару."""

        if self.avatar:
            # возвращаем полный путь к кастомному изображению вместе с '/media/' для использования в шаблонах
            return self.avatar.url
            # возвращаем класс ImageFieldFile у поля avatar
            # return self.avatar
        # возвращаем полный путь к дефолтному изображению
        return '/static/main_app/images/default_avatar.png'
        # возвращаем класс ImageFieldFile у поля avatar
        # return ImageFieldFile(instance=None, field=FileField(),
        #                       name='/static/main_app/images/default_avatar.png')

#############################################################################

class ContactMe(models.Model):
    """#### Модель создающая поля для работы формы обратной связи.
    - Доступные поля: email, message, date_time."""

    email = models.EmailField(verbose_name='Адрес электронной почты', max_length=254)

    message = models.TextField(verbose_name='Сообщение', max_length=1500)

    # https://django.fun/ru/docs/django/4.1/ref/models/fields/#datetimefield
    date_time = models.DateTimeField(verbose_name='Время отправки сообщения', auto_now_add=True)

    def __str__(self):
        return 'Сообщение обратной связи от пользоваля: ' + self.email


    class Meta:
        verbose_name = 'Сообщение пользователя'
        verbose_name_plural = 'Обратная связь'

        # можно указать своё название при создании миграций для таблицы в БД
        # по умолчанию используется шаблон <название-приложения_название-модели>
        # db_table = 'contact_me'

#############################################################################

class ServiceInfo(models.Model):
    """#### Модель создающая поля для технической информации в панели администрирования.
    - Доступные поля: server_email_login, server_email_password,\n
    discord_login, discord_password, discord_token,\n
    twitch_login, twitch_password, twitch_client_id, twitch_client_secret, twitch_token."""

    server_email_login = models.CharField(verbose_name='Серверный адрес электронной почты',
    max_length=100, blank=True)
    server_email_password = models.CharField(verbose_name='Серверный пароль приложения почты',
    max_length=100, blank=True)

    discord_login = models.CharField(verbose_name='Discord - Логин', max_length=100, blank=True)
    discord_password = models.CharField(verbose_name='Discord - Пароль', max_length=100, blank=True)
    discord_token = models.CharField(verbose_name='Discord - Токен',
    help_text='Токен заполняется автоматически.', max_length=100, blank=True)

    twitch_login = models.CharField(verbose_name='Twitch - Логин', max_length=100, blank=True,
    help_text='Данное поле необязательно для заполнения и носит исключительно информационный характер.')
    twitch_password = models.CharField(verbose_name='Twitch - Пароль', max_length=100, blank=True,
    help_text='Данное поле необязательно для заполнения и носит исключительно информационный характер.')
    twitch_client_id = models.CharField(verbose_name='Twitch - Идентификатор клиента',
    max_length=100, blank=True, help_text='Добывается по адресу: dev.twitch.tv/console')
    twitch_client_secret = models.CharField(verbose_name='Twitch - Секретный код клиента',
    max_length=100, blank=True, help_text='Добывается по адресу: dev.twitch.tv/console')
    twitch_token = models.CharField(verbose_name='Twitch - Токен',
    help_text='Токен заполняется автоматически.', max_length=100, blank=True)

    recaptcha_public_key = models.CharField(verbose_name='reCAPTCHA - Ключ Сайта',
    help_text='Добывается по адресу: https://www.google.com/recaptcha/about/', max_length=100, blank=True)
    recaptcha_private_key = models.CharField(verbose_name='reCAPTCHA - Секретный Ключ',
    help_text='Добывается по адресу: https://www.google.com/recaptcha/about/', max_length=100, blank=True)

    def __str__(self):
        return 'Сервисная информация'


    class Meta:
        verbose_name = 'Сервисную информацию'
        verbose_name_plural = 'Сервисная информация'

#############################################################################

CLASS_COLORS = {
    'warrior': '198, 155, 109', 'paladin': '244, 140, 186',
    'hunter': '170, 211, 114', 'rogue': '255, 244, 104',
    'priest': '255, 255, 255', 'death_knight': '196, 30, 58',
    'shaman': '0, 112, 221', 'mage': '63, 199, 235',
    'warlock': '135, 136, 238', 'druid': '255, 124, 10',
}


class TwitchStreamerInfo(models.Model):
    """#### Модель создающая поля для работы страницы Стримы.
    - Доступные поля: streamer, warrior, paladin, hunter, rogue,
    priest, death_knight, shaman, mage, warlock, druid.
    - Доступные методы: все игровые классы с андерскором в начале:\n
    >>> _warrior -> (class) SafeString"""

    streamer = models.CharField(verbose_name='Никнейм Стримера', max_length=50)

    warrior = models.CharField(verbose_name=_('Воин'), max_length=4, blank=True)
    paladin = models.CharField(verbose_name=_('Паладин'), max_length=4, blank=True)
    hunter = models.CharField(verbose_name=_('Охотник'), max_length=4, blank=True)
    rogue = models.CharField(verbose_name=_('Разбойник'), max_length=4, blank=True)
    priest = models.CharField(verbose_name=_('Жрец'), max_length=4, blank=True)
    death_knight = models.CharField(verbose_name=_('Рыцарь Смерти'), max_length=4, blank=True)
    shaman = models.CharField(verbose_name=_('Шаман'), max_length=4, blank=True)
    mage = models.CharField(verbose_name=_('Маг'), max_length=4, blank=True)
    warlock = models.CharField(verbose_name=_('Чернокнижник'), max_length=4, blank=True)
    druid = models.CharField(verbose_name=_('Друид'), max_length=4, blank=True)

    def _warrior(self):
        # for field in self._meta.get_fields():
        # for field in self._meta.fields:
        #     rating = getattr(self, field.name)
        #     # print(field, field.name, field.verbose_name, rating)
        return format_html('<span style="color: rgb({});">{}</span>', CLASS_COLORS['warrior'], self.warrior)
    _warrior.short_description = warrior.verbose_name

    def _paladin(self): return format_html('<span style="color: rgb({});">{}</span>', CLASS_COLORS['paladin'], self.paladin)
    _paladin.short_description = paladin.verbose_name

    def _hunter(self): return format_html('<span style="color: rgb({});">{}</span>', CLASS_COLORS['hunter'], self.hunter)
    _hunter.short_description = hunter.verbose_name

    def _rogue(self): return format_html('<span style="color: rgb({});">{}</span>', CLASS_COLORS['rogue'], self.rogue)
    _rogue.short_description = rogue.verbose_name

    def _priest(self): return format_html('<span style="color: rgb({});">{}</span>', CLASS_COLORS['priest'], self.priest)
    _priest.short_description = priest.verbose_name

    def _death_knight(self): return format_html('<span style="color: rgb({});">{}</span>', CLASS_COLORS['death_knight'], self.death_knight)
    _death_knight.short_description = death_knight.verbose_name

    def _shaman(self): return format_html('<span style="color: rgb({});">{}</span>', CLASS_COLORS['shaman'], self.shaman)
    _shaman.short_description = shaman.verbose_name

    def _mage(self): return format_html('<span style="color: rgb({});">{}</span>', CLASS_COLORS['mage'], self.mage)
    _mage.short_description = mage.verbose_name

    def _warlock(self): return format_html('<span style="color: rgb({});">{}</span>', CLASS_COLORS['warlock'], self.warlock)
    _warlock.short_description = warlock.verbose_name

    def _druid(self): return format_html('<span style="color: rgb({});">{}</span>', CLASS_COLORS['druid'], self.druid)
    _druid.short_description = druid.verbose_name


    def __str__(self):
        return 'Название канала'


    class Meta:
        verbose_name = 'Стримеров'
        verbose_name_plural = 'Стримеры'
        ordering = ['id']

#############################################################################

# https://fixmypc.ru/post/ispolzovanie-polei-v-python-django-auto-now-i-auto-now-add-na-primerakh-pri-rabote-s-metkami-vremeni/
class DressingRoom(models.Model):
    """#### Модель создающая поля для хранения настроек персонажа на странице Примерочная."""

    RACES = {
        1: "Human",
        2: "Orc",
        3: "Dwarf",
        4: "Nightelf",
        5: "Scourge",
        6: "Tauren",
        7: "Gnome",
        8: "Troll",
        9: "Goblin",
        10: "Bloodelf",
        11: "Draenei",
        12: "Felorc",
        13: "Naga_",
        14: "Broken",
        15: "Skeleton",
        16: "Vrykul",
        17: "Tuskarr",
        18: "Foresttroll",
        19: "Taunka",
        20: "Northrendskeleton",
        21: "Icetroll",
        22: "Worgen",
        # 23: "Gilnean",
        24: "Pandaren",
        # 25: "Pandarena",
        # 26: "Pandarenh",
        27: "Nightborne",
        28: "Highmountaintauren",
        29: "Voidelf",
        30: "Lightforgeddraenei",
        31: "Zandalaritroll",
        32: "Kultiran",
        33: "Thinhuman",
        34: "Darkirondwarf",
        35: "Vulpera",
        36: "Magharorc",
        37: "Mechagnome"
    }

    RACES_WITHOUT_ICON = (
        12, # "Felorc"
        13, # "Naga_"
        14, # "Broken"
        15, # "Skeleton"
        16, # "Vrykul"
        17, # "Tuskarr"
        18, # "Foresttroll"
        19, # "Taunka"
        20, # "Northrendskeleton"
        21, # "Icetroll"
        # 23, # "Gilnean"
        # 25, # "Pandarena"
        # 26, # "Pandarenh"
        33  # "Thinhuman"
    )

    GENDERS = {
        0: 'Male',
        1: 'Female'
    }

    DEFAULT_ICON_URL = 'https://wow.zamimg.com/images/wow/icons/large/'


    room_id = models.CharField(max_length=45, verbose_name='Id комнаты')

    room_creator_id = models.CharField(max_length=40, verbose_name='Id создателя комнаты')

    allow_edit = models.BooleanField(verbose_name='Разрешить редактирование')

    last_update_time = models.DateTimeField(verbose_name='Время последнего изменения')

    game_patch = models.CharField(max_length=5, verbose_name='Название патча')

    race = models.IntegerField(verbose_name='Раса')

    gender = models.IntegerField(verbose_name='Пол')

    items = models.CharField(max_length=300, verbose_name='Экипировка')

    face = models.CharField(max_length=150, verbose_name='Внешность')

    mount = models.CharField(max_length=20, verbose_name='Маунт')

    def __str__(self):
        return 'Комната: ' + self.room_id

    def get_absolute_url(self):
        return reverse('unique_dressing_room', kwargs={'room_id': self.room_id})

    class Meta:
        verbose_name = 'Комнату'
        verbose_name_plural = 'Примерочные комнаты'

#############################################################################

class HomeNews(models.Model):
    """#### Модель создающая поля для работы блока новостей на домашней странице.
    - Доступные поля: news, date."""

    news = models.TextField(verbose_name='Новость', max_length=300)

    date = models.DateField(verbose_name='Дата новости', default=date.today)

    def __str__(self):
        return 'Новость: ' + self.news


    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'

#############################################################################

# https://django.fun/docs/django/ru/4.0/ref/models/fields/#booleanfield
class Guides(models.Model):
    """#### Модель создающая поля для работы страниц гайдов.
    - Доступные поля: title, slug, content, main_image,
    time_create, time_update, is_published, category, votes."""

    title = models.CharField(max_length=255, verbose_name='Заголовок')

    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name='Слаг')

    content = models.TextField(verbose_name='Текст гайда', max_length=150000,
    help_text="""
    <br>Текст гайда не экранируется, поэтому прямо в текстовом поле можно записывать любые HTML теги.<br><br>
    WowHead тултипы будут выводится автоматически при использовании тега a<br><br>
    <⚠️a target="_BLANK" href="https://www.wowhead.com/ru/spell=366489"><⚠️/a>
    """)

    main_image = models.ImageField(upload_to="guides", verbose_name='Изображение', blank=True)

    time_create = models.DateTimeField(auto_now_add=True, verbose_name='Время создания')

    time_update = models.DateTimeField(auto_now=True, verbose_name='Время изменения')

    is_published = models.BooleanField(default=True, verbose_name='Публикация')

    # Если класс Category идёт после класса Guides то можно записать название как строку
    # если наоборот то как обычно без кавычек
    category = models.ForeignKey('Category', on_delete=models.PROTECT, null=True, verbose_name='Категория')
    # Если мы добавляем новое поле которое ссылается на другую пустую либо пока что несуществующую таблицу
    # выдаст предупреждение: 'Please select a fix: 1) ... 2) ...'
    # жмём 2) и добавляем в поле category третим аргументом дефолтное значение null=True
    # то есть разрешаем заполнить пустые поля нулами (NULL)

    votes = GenericRelation('LikeDislike')

    def __str__(self):
        return str(self.title)


    # так же при добавлении данного метода в админку добавляется кнопка 'СМОТРЕТЬ НА САЙТЕ >'
    def get_absolute_url(self):
        return reverse('guide', kwargs={'guide_slug': self.slug})


    class Meta:
        verbose_name = 'Гайд'
        verbose_name_plural = 'Гайды'
        # указываем порядок сортировки на сайте и для админ панели
        ordering = ['time_create', 'title'] # '-time_create' # обратная сортировка со знаком минус

#############################################################################

class Category(models.Model):
    """#### Модель создающая поля категорий для страниц гайдов.
    - Доступные поля: name, slug, image_name."""

    # db_index поле будет индексировано (для ускорения работы)
    name = models.CharField(max_length=255, db_index=True, verbose_name='Категория')

    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name='Слаг')

    image_name = models.ImageField(upload_to="categorys", verbose_name='Изображение категории')

    def __str__(self):
        return str(self.name)


    def get_absolute_url(self):
        return reverse('category', kwargs={'category_slug': self.slug})


    class Meta:
        verbose_name = 'Категорию'
        verbose_name_plural = 'Категории'
        ordering = ['id']

#############################################################################

# https://django-mptt.readthedocs.io/en/latest/index.html
class Comments(MPTTModel):
    """#### Модель создающая поля для создания древовидной системы комментариев.
    - Доступные поля: guide, author, parent, content, time_create, is_published, votes."""

    # привязываем комментарии (класс Comments) к гайдам (классу Guides)
    # on_delete=models.CASCADE при удалении гайда автоматически удаляться
    # все комментарии принадлежащие к данному гайду из БД.
    guide = models.ForeignKey(Guides, on_delete=models.CASCADE, related_name='comments', verbose_name='Гайд')

    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Имя пользователя')

    # ссылка на комментарий, на который дается ответ, если таковой существует
    parent = TreeForeignKey('self', null=True, blank=True,
    on_delete=models.CASCADE, verbose_name='Родительский комментарий')

    content = models.TextField(verbose_name='Сообщение')

    time_create = models.DateTimeField(auto_now_add=True, verbose_name='Время создания')

    is_published = models.BooleanField(default=True, verbose_name='Публикация',
    help_text='При изменении статуса родительского объекта,\
    так же необходимо вручную установить такой же статус для всех дочерних элементов.')

    votes = GenericRelation('LikeDislike')

    class MPTTMeta:
        # комментарии на одном уровне будут упорядочены по времени создания
        order_insertion_by = ['time_create']


    def __str__(self):
        return str(self.author)


    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'
        # ordering=['tree_id','lft']

#############################################################################

# https://evileg.com/ru/post/246/
class LikeDislikeManager(models.Manager):
    """#### Класс менеджер расширяющий функционал класса LikeDislike.
    - Доступные методы:\n
    >>> def likes\n
    >>> def dislikes"""

    use_for_related_fields = True

    def likes(self):
        """Забирает queryset с записями больше 0"""

        return self.get_queryset().filter(vote__gt=0)


    def dislikes(self):
        """Забирает queryset с записями меньше 0"""

        return self.get_queryset().filter(vote__lt=0)

#############################################################################

class LikeDislike(models.Model):
    """#### Модель создающая поля для работы оценок Нравится/Не нравится.
    - Доступные поля: vote, user.\n
    - Доступные константы: LIKE, DISLIKE, VOTES."""

    LIKE = 1
    DISLIKE = -1

    VOTES = (
        (DISLIKE, 'Не нравится'),
        (LIKE, 'Нравится')
    )

    vote = models.SmallIntegerField(choices=VOTES)

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()
    objects = LikeDislikeManager()

#############################################################################
