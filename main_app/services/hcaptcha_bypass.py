from __future__ import annotations

import time

import requests
from FriskesSite import settings

__all__ = ('bypass',)


# https://dash.nocaptchaai.com/home
# https://docs.nocaptchaai.com/en/token/hCaptcha.html

nocaptchaai_apikey = settings.APIKEY_FOR_CAPTCHA_SOLUTION

HEADERS = {'Content-Type': 'application/json', 'apikey': nocaptchaai_apikey}

TOKEN_API_URL = 'https://token.nocaptchaai.com/token'


def bypass(captcha_sitekey: str) -> str | None:
    payload = {
        'type': 'hcaptcha',
        'enterprise': 'false',
        # "url": "https://discord.com/api/v9/auth/login",
        'url': 'accounts.hcaptcha.com',
        'sitekey': captcha_sitekey,
        'useragent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
        '(KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    }

    response = requests.post(TOKEN_API_URL, json=payload, headers=HEADERS).json()
    time.sleep(7)

    while True:
        sts = requests.get(response['url'], headers=HEADERS).json()

        if sts['status'] in ['processed', 'failed']:
            return sts['token']
        time.sleep(2)
