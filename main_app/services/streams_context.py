from django.core.cache import cache
from main_app.services.parse_twitch_streams import twitch_stream_parser
from typing import Union, List
from json import loads
from urllib.parse import unquote


__all__ = ("get_streams_context", "get_game_classes_from_cookie")


def _filter_streams(game_classes: list, twitch_streams: Union[List[dict], list]) -> list:
    """Отфильтровываем стримеров по их игровому классу"""

    filtered_twitch_streams = []

    for game_class in game_classes:

        for stream in twitch_streams:

            if stream.get('game_classes').get(game_class):
                filtered_twitch_streams.append(stream)

    return filtered_twitch_streams


def get_streams_context(game_classes: list) -> dict:
    """Генерирует контекст для шаблона на основе выбранных игровых классов."""

    twitch_streams = cache.get('twitch_streams')

    if twitch_streams is None:
        twitch_streams = twitch_stream_parser.get_twitch_stream_data()
        cache.set('twitch_streams', twitch_streams, 60) # секунды

    streams_context = {
        'twitch_streams': twitch_streams if len(game_classes) == 0\
            else _filter_streams(game_classes, twitch_streams),
        'twitch_stream_count': len(twitch_streams)
    }
    return streams_context


def get_game_classes_from_cookie(encoded_text_data: str) -> dict:
    """Получаем игровые классы записанные в Cookie."""

    game_classes = {}

    if encoded_text_data and len(encoded_text_data) > 2:
        decoded_text_data: str = unquote(encoded_text_data, encoding='utf-8')
        game_classes = loads(decoded_text_data)

    return game_classes
