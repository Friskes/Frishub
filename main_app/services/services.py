import time
import requests

# import logging
# logging.basicConfig(level=logging.INFO, filename="py_log.log", filemode="w", format="%(asctime)s %(levelname)s %(message)s")


#############################################################################

def request_get(url: str, headers: dict) -> dict:
    """Отправляет requests.get запрос и возвращает словарь."""

    return request('get', url, headers).json()


def request_post(url: str, headers: dict, payload: dict) -> dict:
    """Отправляет requests.post запрос и возвращает словарь."""

    return request('post', url, headers, payload).json()

#############################################################################

def request(type: str, url: str, headers: dict=None, payload: dict=None) -> requests.models.Response:
    """Отправляет get/post запрос и при возникновении исключений делает повторные запросы
    в бесконечном цикле пока не получит ответ."""

    while True:
        try:
            if type == 'get':
                return requests.get(url=url, headers=headers, timeout=5)
            return requests.post(url=url, json=payload, headers=headers, timeout=5)

        except requests.exceptions.ReadTimeout as error:
            time.sleep(2)
        except requests.exceptions.ConnectTimeout as error:
            time.sleep(2)

#############################################################################
