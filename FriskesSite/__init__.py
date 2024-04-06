from .celery import celery_app  # noqa: N999

# эта запись говорит о том что декоратор @shared_task
# для работы будет использовать приложение celery_app
__all__ = ('celery_app',)
