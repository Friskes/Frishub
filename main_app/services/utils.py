from __future__ import annotations

import os
from zlib import crc32


def build_cachebuster(
    rel_path_to_static: str, ignored_paths: tuple[str] = tuple(), ignored_files: tuple[str] = tuple()
) -> dict[str, str]:
    """
    Проходит в цикле все файлы в директории rel_path_to_static
    и все файлы во вложенных директориях и возвращает словарь
    с ключём в виде пути к файлу и значением в виде контрольной суммы файла.\n
    https://mtik00.com/2017/11/jinja2-cache-busting-urls/
    """

    path_and_checksum = {}
    for root, _dirs, files in os.walk(rel_path_to_static):
        if len(set(ignored_paths) & set(root.split('\\'))) > 0:
            continue

        for file_name in files:
            if file_name in ignored_files:
                continue

            file_path = root + '/' + file_name
            relative_path = file_path[len(rel_path_to_static) + 1 :].replace('\\', '/')
            previous_checksum = 0

            with open(file_path, 'rb') as file:
                for line in file:
                    previous_checksum = crc32(line, previous_checksum)

            path_and_checksum[relative_path] = '%x' % (previous_checksum & 0xFFFFFFFF)

    return path_and_checksum
