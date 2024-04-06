from modeltranslation.translator import TranslationOptions, register

from main_app.models import Category, Guides, HomeNews


@register(HomeNews)
class HomeNewsTranslationOptions(TranslationOptions):
    # указываем поля из модели которые необходимо переводить
    fields = ('news',)


@register(Category)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('name',)


@register(Guides)
class GuidesTranslationOptions(TranslationOptions):
    fields = ('title', 'content')
