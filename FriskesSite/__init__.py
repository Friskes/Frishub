from .celery import app as celery_app

# эта запись говорит о том что декоратор @shared_task
# для работы будет использовать приложение celery_app
__all__ = ("celery_app",)
