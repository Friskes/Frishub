import time
import requests

import logging
log = logging.getLogger(__name__)


#############################################################################

def request_get(url: str, headers: dict) -> dict:
    """Отправляет requests.get запрос и возвращает словарь."""

    return request('get', url, headers).json()


def request_post(url: str, headers: dict, payload: dict) -> dict:
    """Отправляет requests.post запрос и возвращает словарь."""

    return request('post', url, headers, payload).json()

#############################################################################

def request(req_type: str, url: str, headers: dict=None, payload: dict=None) -> requests.models.Response:
    """Отправляет get/post запрос и при возникновении исключений делает повторные запросы
    в бесконечном цикле пока не получит ответ."""

    while True:
        try:
            if req_type == 'get':
                with requests.get(url=url, headers=headers, timeout=5) as response:
                    response.raise_for_status()
                    return response

            with requests.post(url=url, json=payload, headers=headers, timeout=5) as response:
                response.raise_for_status()
                return response

        except requests.exceptions.RequestException as error: # родительский exception
            log.info(f'[def request] RequestException:\n{error}')
            time.sleep(2)

#############################################################################
