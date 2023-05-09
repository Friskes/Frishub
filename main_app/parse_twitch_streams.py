# https://dev.twitch.tv/docs/api/get-started
# https://dev.twitch.tv/console
# https://dev.twitch.tv/docs/api/reference

import requests
from .models import ServiceInfo, TwitchStreamerInfo, CLASS_COLORS
from FriskesSite import settings
from typing import Union, List
import time

#############################################################################

def get_new_token() -> Union[str, None]:
    """Делаем запрос к twitch API на получение токена."""

    oauth2_url = 'https://id.twitch.tv/oauth2/token'
    payload = {
        'client_id': settings.TWITCH_CLIENT_ID,
        'client_secret': settings.TWITCH_CLIENT_SECRET,
        'grant_type': 'client_credentials'
    }
    headersPOST = {'Content-Type': 'application/x-www-form-urlencoded'}

    while True:
        try:
            response = requests.post(url=oauth2_url, data=payload, headers=headersPOST, timeout=5)
            return response.json().get('access_token')
        except requests.exceptions.ReadTimeout as e:
            time.sleep(2)

#############################################################################

def token_verification() -> Union[str, None]:
    """Возвращаем токен из БД если он там есть,
    иначе вызываем функцию получения токена,
    обновляем новый токен в БД и возвращаем его."""

    service_info = ServiceInfo.objects.filter(pk=1)

    if service_info and service_info[0].twitch_token:
        return service_info[0].twitch_token
    else:
        token = get_new_token()

        if token and service_info:
            service_info.update(twitch_token=token)
        elif token:
            service_info.create(twitch_token=token)
        return token

#############################################################################

def transform_data(stream_data: dict, streamers: dict) -> dict:
    """Перерабатываем данные которые пришли от twitch API."""

    user_login = stream_data['user_login']
    title = stream_data['title']
    viewer_count = stream_data['viewer_count']
    language = '/static/main_app/images/svg/' + stream_data['language'].upper() + '.svg'
    # изображение приходит без указанного размера, поэтому необходимо самому указать размер
    thumbnail_url = stream_data['thumbnail_url'].format(width=384, height=216)
    game_classes = streamers[stream_data['user_login']]

    clean_stream_data = {
        'user_login': user_login, 'title': title,
        'viewer_count': viewer_count, 'language': language,
        'thumbnail_url': thumbnail_url, 'game_classes': game_classes,
    }

    return clean_stream_data

#############################################################################

class TwitchStreamParser:

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

        headersGET = {
            'Authorization': f'Bearer {self.twitch_token}',
            'Client-Id': settings.TWITCH_CLIENT_ID
        }

        url_params = ''
        for streamer in streamers:
            url_params += 'user_login=' + streamer + '&'
        url_params = url_params[:-1]

        # https://dev.twitch.tv/docs/api/reference#get-streams
        get_streams_url = 'https://api.twitch.tv/helix/streams?'
        while True:
            try:
                response = requests.get(url=get_streams_url + url_params, headers=headersGET, timeout=5)
                break
            except requests.exceptions.ReadTimeout as e:
                time.sleep(2)
            except requests.exceptions.ConnectTimeout as e:
                time.sleep(2)

        if response.json().get('status') == 401:
            new_token = get_new_token()

            service_info = ServiceInfo.objects.filter(pk=1)
            service_info.update(twitch_token=new_token)

            return self.get_twitch_stream_data(new_token)


        data = response.json()['data']

        twitch_streams = []

        for stream_data in data:
            clean_stream_data = transform_data(stream_data, streamers)
            twitch_streams.append(clean_stream_data)

        return twitch_streams


twitch_stream_parser = TwitchStreamParser()

#############################################################################
