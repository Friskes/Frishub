# https://dev.twitch.tv/docs/api/get-started
# https://dev.twitch.tv/console
# https://dev.twitch.tv/docs/api/reference

from main_app.models import ServiceInfo, TwitchStreamerInfo, CLASS_COLORS
from FriskesSite import settings

from typing import Union, List

import requests

import logging
log = logging.getLogger(__name__)


#############################################################################

OAUTH2_URL = 'https://id.twitch.tv/oauth2/token'
HEADERS_POST = {'Content-Type': 'application/x-www-form-urlencoded'}
PAYLOAD = {
    'client_id': settings.TWITCH_CLIENT_ID,
    'client_secret': settings.TWITCH_CLIENT_SECRET,
    'grant_type': 'client_credentials'
}


def token_verification() -> Union[str, None]:
    """Возвращаем токен из БД если он там есть,
    иначе вызываем функцию получения токена,
    обновляем новый токен в БД и возвращаем его."""

    service_info = ServiceInfo.objects.filter(pk=1)

    if service_info and service_info[0].twitch_token:
        return service_info[0].twitch_token

    token = requests.post(url=OAUTH2_URL, json=PAYLOAD, headers=HEADERS_POST, timeout=5).json().get('access_token')

    if token and service_info:
        service_info.update(twitch_token=token)
    elif token:
        service_info.create(twitch_token=token)
    return token

#############################################################################

def transform_data(stream_data: dict, streamers: dict) -> dict:
    """Перерабатываем данные которые пришли от twitch API."""

    language = '/static/main_app/images/svg/' + stream_data['language'].upper() + '.svg'
    # изображение приходит без указанного размера, поэтому необходимо самому указать размер
    thumbnail_url = stream_data['thumbnail_url'].format(width=384, height=216)
    game_classes = streamers[stream_data['user_login']]

    clean_stream_data = {
        'user_login': stream_data['user_login'], 'title': stream_data['title'],
        'viewer_count': stream_data['viewer_count'], 'language': language,
        'thumbnail_url': thumbnail_url, 'game_classes': game_classes,
    }

    return clean_stream_data

#############################################################################

class TwitchStreamParser:
    """#### Класс для парсинга стримеров с помощью Twitch API."""

    forbidding_flag = True

    def get_twitch_stream_data(self, new_twitch_token: str=None) -> Union[List[dict], list]:
        """- Получаем из БД заранее записанных стримеров, формируем на их основе базовый словарь,
        делаем запрос к twitch API для получения информации о онлайн стримерах из нашего словаря.
        - Если запрос удачный, передаём данные из API и базовый словарь в функцию очистки данных,
        после возвращаем чистые данные.
        - Если запрос неудачный, запрашиваем новый токен
        и заново вызываем метод get_twitch_stream_data с новым токеном."""

        twitch_streamer_info = TwitchStreamerInfo.objects.all()
        if not twitch_streamer_info or not settings.TWITCH_CLIENT_ID or not settings.TWITCH_CLIENT_SECRET:
            return []

        if self.forbidding_flag:
            self.forbidding_flag = False
            # Единоразово получаем токен при первом запуске.
            self.twitch_token = token_verification()

        # Получить verbose_name у поля модели
        # print(twitch_streamer_info.model._meta.get_field('warrior').verbose_name)
        # print(twitch_streamer_info[0]._meta.get_field('warrior').verbose_name)

        # Получить verbose_name у всех полей в модели
        # for item in twitch_streamer_info:
        #     fields = item._meta.fields
        #     for field in fields:
        #         field_value = getattr(item, field.name)
        #         if field_value:
        #             print('field_value:', field_value, '| field.name:', field.name, '| field.verbose_name:', field.verbose_name)

        streamers = {}
        for streamer in twitch_streamer_info:
            streamers[streamer.streamer] = {}

            for game_class, experience in streamer.__dict__.items():

                if ( game_class != '_state' and game_class != 'id'
                and game_class != 'streamer' and experience != '' ):

                    verbose_name = streamer._meta.get_field(game_class).verbose_name
                    class_color = CLASS_COLORS[game_class]

                    streamers[streamer.streamer][game_class] = {
                        'verbose_name': verbose_name,
                        'experience': experience,
                        'class_color': class_color,
                    }

        if new_twitch_token:
            self.twitch_token = new_twitch_token

        headers_get = {
            'Authorization': f'Bearer {self.twitch_token}',
            'Client-Id': settings.TWITCH_CLIENT_ID
        }

        url_params = ''
        for streamer in streamers:
            url_params += 'user_login=' + streamer + '&'
        url_params = url_params[:-1]

        # https://dev.twitch.tv/docs/api/reference#get-streams
        get_streams_url = 'https://api.twitch.tv/helix/streams?'
        json_response = requests.get(url=get_streams_url + url_params, headers=headers_get, timeout=5).json()

        if json_response.get('status') == 401:
            # print(self.twitch_token)
            # print(requests.get(url='https://id.twitch.tv/oauth2/validate', headers={'Authorization': f'Bearer {self.twitch_token}'}).json())
            # REFRESH_TOKEN_PAYLOAD = {
            #     'client_id': settings.TWITCH_CLIENT_ID,
            #     'client_secret': settings.TWITCH_CLIENT_SECRET,
            #     'grant_type': 'refresh_token',
            #     'refresh_token': self.twitch_token
            # }
            post_json_response = requests.post(url=OAUTH2_URL, json=PAYLOAD, headers=HEADERS_POST, timeout=5).json()
            if post_json_response.get('status') == 400:
                # {'status': 400, 'message': 'missing client id'}
                log.error(f'[class TwitchStreamParser -> def get_twitch_stream_data] missing client id: {post_json_response}')
                return []

            new_token = post_json_response.get('access_token')

            service_info = ServiceInfo.objects.filter(pk=1)
            service_info.update(twitch_token=new_token)

            return self.get_twitch_stream_data(new_token)


        data = json_response['data']

        twitch_streams = []

        for stream_data in data:
            clean_stream_data = transform_data(stream_data, streamers)
            twitch_streams.append(clean_stream_data)

        return twitch_streams


twitch_stream_parser = TwitchStreamParser()

#############################################################################
