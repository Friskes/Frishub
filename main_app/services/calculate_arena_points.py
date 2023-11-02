from __future__ import annotations

from typing import Generator
from math import floor
from json import loads


__all__ = ("get_arena_points",)


def _calculate_arena_points(bracket: str, rating: str | int, server_type: bool) -> int:
    """Рассчитываем по формуле количество очков арены которое игрок
    получит за рейтинг в указанном брекете на выбранном сервере."""

    if rating == '0': return 0
    rating = int(rating)

    if server_type:
        if rating <= 1500:
            points = 0.22 * rating + 14
        elif rating > 1500:
            points = 1511.26 / (1 + 1639.28 * (2.71828 ** (-0.00412 * rating)))
    else:
        if rating >= 150:
            points = 1022 / (1 + 123 * (2.71828 ** (-0.00412 * rating))) + 580
        elif rating <= 150:
            return 0

    if bracket == 'bracket2x2':
        points *= 0.76
    elif bracket == 'bracket3x3':
        points *= 0.88

    if server_type:
        return floor(points)

    return round(points)


def get_arena_points(bracket_ratings: Generator, server_type: str) -> dict[str, int]:
    server_type = loads(server_type)

    bracket_points = {}
    for bracket, rating in bracket_ratings:
        if bracket == 'server_type':
            continue

        points = _calculate_arena_points(
            bracket=bracket,
            rating=rating,
            server_type=server_type
        )
        bracket_points.update({bracket: points})

    return bracket_points
