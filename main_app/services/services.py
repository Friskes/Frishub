from math import floor, log, pow

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


__all__ = ("humanize_size", "validate_twitch_link")


def humanize_size(bytes_size: int, decimals: int = 1) -> str:
    """Конвертирует байты в крайний объем информации для переданного объёма байт,
    и оставляет 1 знак после запятой (по умолчанию),
    так же добавляет суффикс в конце строки."""

    if bytes_size == 0: return '0'
    suffixes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    power = floor(log(bytes_size, 1024))
    size = bytes_size / pow(1024, power)
    # return f'{round(size, decimals)} {suffixes[power]}'
    # return f'{size:.{decimals}f} {suffixes[power]}'
    return f'{size:.{decimals}f}'.rstrip('0').rstrip('.') + f' {suffixes[power]}'


def validate_twitch_link(url: str) -> str:
    """Проверяет ссылку на корректность, если ссылка
    подходящая но в укороченном виде, дополняет её."""

    if url[:22] == 'https://www.twitch.tv/':
        return url
    elif url[:14] == 'www.twitch.tv/':
        return 'https://' + url
    elif url[:10] == 'twitch.tv/':
        return 'https://www.' + url
    else:
        raise ValidationError(_('Неправильная ссылка.'))
