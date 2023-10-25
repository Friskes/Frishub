> ## Увидеть проект вживую `->` [frishub](https://frishub.ru)

### Запуск проекта локально без докера

Необходим установленный и запущенный REDIS сервер на пк, загруженный с данного репозитория:
`https://github.com/tporadowski/redis`

Загрузите репозиторий с помощью команды:
`git clone https://github.com/Friskes/Frishub.git`

Создайте виртуальное окружение (необходим Python==3.8 на пк):
`py -3.8 -m venv venv`

Обновите установщик pip:
`python.exe -m pip install --upgrade pip`

Установите зависимости необходимые для работы проекта:
`pip install -r requirements.txt`

Сгенерируйте статические файлы:
`python manage.py collectstatic`

Создайте миграции:
`python manage.py makemigrations`

Выполните миграцию:
`python manage.py migrate`

Создайте супер пользователя:
`python manage.py createsuperuser`

Для запуска проекта, в первой консоли, выполните команду:
`python manage.py runserver`

Для запуска CELERY необходимого для полноценной работы проекта, во второй консоли, выполните команду:
`python manage.py runcelery`

Откройте в браузере проект по адресу:
`http://127.0.0.1:8000/`

Для остановки программы нажмите сочетание клавиш CTRL+C в обеих консолях.

### Запуск проекта локально с докером

Загрузите репозиторий с помощью команды:
`git clone https://github.com/Friskes/Frishub.git`

Необходимо создать файл `.env` в корне проекта с содержимым:

```
# IF DEPLOY OR DEV WITH DOCKER MUST BE TRUE ELSE FALSE
RUN_DEV_SERVER_WITH_DOCKER=1

POSTGRES_DB=db
POSTGRES_USER=db
POSTGRES_PASSWORD=db
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

REDIS_HOST=redis
REDIS_PORT=6379

CELERY_APP=FriskesSite
CELERY_FLOWER_URL_PREFIX=flower
CELERY_FLOWER_ADDRESS=celery-flower
CELERY_FLOWER_PORT=5555

SERVER_HOST=0
SERVER_IP=0
```

Запустите Docker Desktop на пк.

Создайте образ:
`docker compose build`

Создайте супер пользователя:
`docker compose run wsgiserver python manage.py createsuperuser`

Запустите контейнеры:
`docker compose up`

Откройте в браузере проект по адресу:
`http://127.0.0.1:8000/`

Для остановки программы нажмите сочетание клавиш CTRL+C

> # Развёртывание проекта на удаленном сервере:

1. [О чём говорится в этом документе](#О-чём-говорится-в-этом-документе)
1. [Создание SSH ключа](#Создание-SSH-ключа)
1. [Установка серверных зависимостей](#Установка-серверных-зависимостей)
1. [Публикация проекта на Github](#Публикация-проекта-на-Github)
1. [Развёртывание github репозитория на сервере](#Развёртывание-github-репозитория-на-сервере)
1. [Создание systemd socket и service файлов для Gunicorn](#Создание-systemd-socket-и-service-файлов-для-Gunicorn)
1. [Дебаг (DEBUGGING)](#Дебаг-(DEBUGGING))
1. [Установка и настройка Redis](#Установка-и-настройка-Redis)
1. [ASGI для размещения Django Channels в качестве отдельного приложения](#ASGI-для-размещения-Django-Channels-в-качестве-отдельного-приложения)
1. [Развертывание Django Channels с помощью Daphne & Systemd](#Развертывание-Django-Channels-с-помощью-Daphne-&-Systemd)
1. [Запуск daphne.service при загрузке сервера](#Запуск-daphne.service-при-загрузке-сервера)
1. [Настройка домена](#Настройка-домена)
1. [Установка Celery](#Установка-Celery)
1. [Установка Celery Beat](#Установка-Celery-Beat)
1. [Установка Celery Flower](#Установка-Celery-Flower)
1. [Создание суперпользователя](#Создание-суперпользователя)
1. [FAQ](#FAQ)
1. [References](#References)

# О чём говорится в этом документе
Обо всём, что связано с публикацией веб-сайта django, оснащенного WebSockets, с использованием Django Channels,
а так же о celery, celery beat, celery flower.

# Создание SSH ключа
#### SSH key
Обязательно выберите SSH-ключ для аутентификации вместо пароля. В противном случае хакеры могут взломать пароли для входа на ваш сервер. Использование SSH-ключа намного безопаснее.

Чтобы сгенерировать SSH-ключ откройте командную строку в windows и выполните команду `ssh-keygen`, вам будет предложено ввести путь по которому будет сохранён сгенерированный ключ, после нажмите enter один раз. **Обязательно сохраните резервную копию приватного и публичного ключа**.

#### IP адрес вашего сервера
Запишите где-нибудь IP-адрес вашего сервера. Берётся он на хостинге где вы арендуете сервер. Он понадобится вам в дальнейшем для входа на ваш сервер.

# Войдите на сервер с помощью SSH и FTP
Лично мне нравится использовать программу [MobaXterm](https://mobaxterm.mobatek.net/) для входа на серверы (она бесплатная). Это здорово, потому что вы можете использовать SSH и FTP из одного окна. Это очень удобно.

#### SSH Настройки
1. Установите IP-адрес сервера
1. Установите `root` в качестве имени пользователя
1. Под "Advanced SSH settings":
    1. кликните "use private key" и выберите место, где вы сохранили свой приватный SSH ключ.

# Установка серверных зависимостей
Запустите эти команды в SSH-терминале.

`passwd` Установка пароля для root пользователя.

`sudo apt update`

`sudo apt install python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx curl`

`sudo -u postgres psql` Войти в командную строку БД

`CREATE DATABASE frishub_db;`

`CREATE USER friskes WITH PASSWORD 'пароль';`

`ALTER ROLE friskes SET client_encoding TO 'utf8';`

`ALTER ROLE friskes SET default_transaction_isolation TO 'read committed';`

`ALTER ROLE friskes SET timezone TO 'UTC';`

`GRANT ALL PRIVILEGES ON DATABASE frishub_db TO friskes;`

`\q` Выйти из командной строки БД

`sudo -H pip3 install --upgrade pip`

`sudo -H pip3 install virtualenv`

`sudo apt install git-all`

`sudo apt install libgl1-mesa-glx` Устранить проблему с "cv2"

`adduser django`

Установка другой версии Python
(
`sudo apt-get install -y make build-essential libssl-dev zlib1g-dev`

`sudo apt-get install -y libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm`

`sudo apt-get install -y libncurses5-dev  libncursesw5-dev xz-utils tk-dev`

`su root`

`cd /opt`

`wget https://www.python.org/ftp/python/3.8.9/Python-3.8.9.tgz`

`tar xzvf Python-3.8.9.tgz`

`cd Python-3.8.9`

`./configure --enable-optimizations`

`make`

`sudo make install`
)

(проверить какой текущий пользователь можно с помощью команды): `id`

переходим с root пользователя на friskes
`su friskes`

`cd /home/friskes/`

`mkdir project`

`cd project`

Проверить версию Python в OS
`python3 -V`

(
Установить Python самой последней версии которая установлена на сервере в виртуальное окружение
`virtualenv venv`

Либо

Установить Python конкретной версии которая установлена на сервере в виртуальное окружение
`python3.8 -m venv venv`
)

`source venv/bin/activate`
В случае необходимости деактивация виртуального окружения происходит с помощью команды: `deactivate`


# Публикация проекта на Github
1. Войдите в Github.com
1. Создайте новый репозиторий [https://github.com/new](https://github.com/new)
1. Откройте терминал в вашем локальном каталоге проекта

Выполните эти команды:
`git init`

`git add .`

`git commit -m "init repo"`

`git remote add origin https://github.com/Friskes/Frishub.git`

`git push -u origin master`

#### Создайте файл .env в корневом каталоге проекта
```
WINDOWS_REDIS_INSTALLED=0
# IF DEPLOY OR DEV WITH DOCKER MUST BE TRUE ELSE FALSE
RUN_DEV_SERVER_WITH_DOCKER=1

SECRET_KEY=<секретный_ключ>

MY_LOCAL_IPV4_ADDRESS=<ваш_локальный_ip_(не_обязательная_настройка)>

POSTGRES_DB=<название бд>
POSTGRES_USER=<никнейм в бд>
POSTGRES_PASSWORD=<пароль в бд>
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

REDIS_HOST=redis
REDIS_PORT=6379

CELERY_APP=FriskesSite
CELERY_FLOWER_URL_PREFIX=flower
CELERY_FLOWER_ADDRESS=celery-flower
CELERY_FLOWER_PORT=5555

SERVER_HOST=<хост сервера>
SERVER_IP=<айпи сервера>
```

#### Обновите код в Github после добавления нового файла
`git add .`
`git commit -m "add .env"`
`git push origin master`

# Развёртывание github репозитория на сервере
Откройте MobaXterm и войдите на свой сервер через SSH.

Инициализируйте git в директории в которой будет находится проект
`git init`

Загрузите проект в текущую директорию
`git pull https://github.com/Friskes/Frishub.git prod`

попросит ввести github никнейм владельца репозитория (Friskes) и токен в качестве пароля
(при создании токена необходимо указать права для Repository permissions -> Contents -> Read-only) иначе будет выдавать ошибку
Токен создаётся здесь: https://github.com/settings/tokens?type=beta
Токен надо сохранить куда нибудь локально т.к. он будет требоватся часто

Потребуется залогинится в гите с помощью данных команд
`git config --global user.name "your_github_username"`

`git config --global user.email "your_github_email"`

Можно сохранить логин + пароль(токен) в store чтобы не вводить их каждый раз заного. [источник](https://stackoverflow.com/questions/68775869/message-support-for-password-authentication-was-removed-please-use-a-personal`)
Необходимо единоразово ввести команду перед исполнением git pull
`git config --global credential.helper store`
В будущем этот store можно удалить командами
`git config --local --unset credential.helper`
`git config --global --unset credential.helper`
`git config --system --unset credential.helper`
Принтануть store: `git config credential.helper`

Проверить версию пакетного менеджера pip
`pip -V`

Обновляем пакетный менеджер pip
`pip install --upgrade pip`

Необходимо обязательно удалить файл local_settings.py
На сервере должен оставатся только prod_settings.py
На локальной машине могут оставатся оба файла.

Не забываем добавить в requirements.txt пару библиотек перед установкой если их нету
`psycopg2-binary`
`gunicorn`

Переходим в директорию с проектом
`cd FriskesSite`

посмотреть список библиотек из файла requirements.txt
`cat requirements.txt`

перед установкой необходимо проверить, если присутствует библиотека
`twisted-iocpsupport`
её необходимо убрать перед установкой на линуксе.
https://stackoverflow.com/questions/66428469/twisted-iocpsupport-error-when-using-pip-on-ubuntu-debian-io-h-missing

Устанавливаем библиотеки
`pip install -r requirements.txt`

Для работы вебсокета дополнительно необходимо установить библиотеки
`pip install -U 'Twisted[tls,http2]'`

Создаём пустую папку для медиа файлов если она ещё не создана
`mkdir media`

## Проверьте, можете ли вы запустить свой проект (Тестовый запуск)
`su root`

`sudo ufw allow 8000`

`su friskes`

`source venv/bin/activate`

`cd FriskesSite`

`python manage.py makemigrations`

`python manage.py migrate`

`python manage.py runserver 0.0.0.0:8000`

посетите [http://<ваш_серверный_ip>:8000/](http://<ваш_серверный_ip>:8000/)

Остановить сервер
`CTRL+C`

Может быть такая проблема что не будет нормально грузить static либо media
для этого надо выполнить эти команды для диреторий static и media соответственно
`sudo chown -R www-data:www-data /home/friskes/project/FriskesSite/static`

`sudo chown -R www-data:www-data /home/friskes/project/FriskesSite/media`

`sudo chmod -R 777 /home/friskes/project/FriskesSite/static`

`sudo chmod -R 777 /home/friskes/project/FriskesSite/media`

`sudo usermod -a -G www-data $(whoami)`

# Создание systemd socket и service файлов для Gunicorn
Мы провели тест, чтобы узнать, запустится ли приложение, если мы запустим его вручную, но мы хотим, чтобы приложение автоматически запускалось / перезапускалось, когда это необходимо. Например, когда мы перезапускаем сервер или он по какой-то причине выходит из строя.

Один из способов сделать это - с помощью gunicorn. Запустив эту команду, вы увидите, что gunicorn может запускать приложение:
`gunicorn --bind 0.0.0.0:8000 FriskesSite.wsgi`
либо
`gunicorn FriskesSite.wsgi:application --bind 0.0.0.0:8000`

посетите [http://<ваш_серверный_ip>:8000/](http://<ваш_серверный_ip>:8000/)

Итак, нам просто нужна служба для запуска этой команды при запуске сервера. Один из способов сделать это - использовать [systemd](https://en.wikipedia.org/wiki/Systemd)

`CTRL+C`

#### Настройте systemd для запуска gunicorn с помощью `gunicorn.socket` файла

`su root`

Перейдите в директорию: `/etc/systemd/system/`

Создайте файл с именем: `gunicorn.socket`

Добавьте в файл следующее и сохраните:

```
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock

[Install]
WantedBy=sockets.target
```

#### Создайте gunicorn service для запуска приложения WSGI (приложение django)
Создайте новый файл: `gunicorn.service`

Добавьте следующее в `gunicorn.service` и сохраните. **Очень важно скопировать это в точности так, как у меня. Также ваша структура каталогов внутри /home/friskes/ должна быть точно такой же, как у меня. В противном случае этот служебный файл не будет знать, о вашем проекте.**

```
[Unit]
Description=gunicorn daemon
Requires=gunicorn.socket
After=network.target

[Service]
User=friskes
Group=www-data
WorkingDirectory=/home/friskes/project/FriskesSite
ExecStart=/home/friskes/project/venv/bin/gunicorn \
          --access-logfile - \
          --workers 3 \
          --bind unix:/run/gunicorn.sock \
          FriskesSite.wsgi:application

[Install]
WantedBy=multi-user.target
```

`sudo systemctl start gunicorn.socket`

`sudo systemctl enable gunicorn.socket`

#### Полезные команды
1. `sudo systemctl daemon-reload`
    - Должно быть выполнено, если вы измените `gunicorn.service` файл.
1. `sudo systemctl restart gunicorn`
    - Если вы меняете код в своём проекте, вы должны выполнить это, чтобы увидеть изменения.
1. `sudo systemctl status gunicorn`
    - Проверка статуса gunicorn
1. `sudo shutdown -r now`
    - полная перезагрузка сервера
    - Важное замечание, команды начинающиеся на sudo может использовать только root пользователь, соответственно сначало надо перейти в root пользователя с помощью команды `su root`

проверить версию операционной системы сервера
`ldd --version`

возвращаемся в родительскую директорию
`cd ..`
либо
`cd ~`

Очистить консоль
`clear`

#### Настройте Nginx для передачи прокси-сервера(proxy pass) к Gunicorn
> Мы будем использовать Nginx в качестве HTTP-прокси. Это помогает защитить наш веб-сайт от злоумышленников. Вы можете прочитать больше об этом здесь[https://docs.gunicorn.org/en/stable/deploy.html](https://docs.gunicorn.org/en/stable/deploy.html). Нам нужно настроить Nginx и gunicorn для совместной работы.

Перейдите в директорию: `/etc/nginx/sites-available`

Создайте файл `FriskesSite` с таким содержимым:

```
server {
    listen 80;
    server_name <ваш_серверный_ip>;

    location /static/ {
        root /home/friskes/project/FriskesSite;
    }

    location /media/ {
        root /home/friskes/project/FriskesSite;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    }
}
```

Измените пользователя `user` в самом начале файла `/etc/nginx/nginx.conf` на созданного нами пользователя friskes
это поможет в обнаружении static/media файлов


#### Настройте брандмауэр (Firewall)
`sudo ln -s /etc/nginx/sites-available/FriskesSite /etc/nginx/sites-enabled`

`sudo nginx -t`

`sudo systemctl restart nginx`

`sudo ufw delete allow 8000`

`sudo ufw allow 'Nginx Full'`

`sudo systemctl restart gunicorn`

(`service gunicorn restart` Нет никакой разницы между этими двумя командами `sudo systemctl restart gunicorn`)

Перезапустите сервер: `sudo shutdown -r now`

посетите: [http://<ваш_серверный_ip>/](http://<ваш_серверный_ip>/)

# Дебаг (DEBUGGING)
Вот несколько команд, которые вы можете использовать для просмотра журналов сервера. **Эти команды абсолютно необходимо знать.** Если ваш сервер случайно не работает в один прекрасный день, это то, что вы используете для начала отладки.
1. `sudo journalctl` это место, куда объединяются все журналы. Обычно я проверяю именно там.
1. `sudo tail -F /var/log/nginx/error.log` Просмотр последних записей в журнале ошибок
1. `sudo journalctl -u nginx` Журналы процессов Nginx
1. `sudo less /var/log/nginx/access.log` Журналы доступа Nginx
1. `sudo less /var/log/nginx/error.log` Журналы ошибок Nginx
1. `sudo journalctl -u gunicorn` журналы приложений gunicorn
1. `sudo journalctl -u gunicorn.socket` проверьте журналы сокетов gunicorn

Логи можно промотать в конец с помощью комбинации клавиш Shift+G
Листать логи можно с помощью стрелок на клавиатуре

Просмотр лога в режиме реального времени с флагом `-f`:
`tail -f file_name.log`


# Установка и настройка Redis
Redis используется как своего рода "очередь обмена сообщениями" для Django Channels. Подробнее об этом читайте здесь [https://channels.readthedocs.io/en/stable/topics/channel_layers.html?highlight=redis#redis-channel-layer](https://channels.readthedocs.io/en/stable/topics/channel_layers.html?highlight=redis#redis-channel-layer)

Для исправления ошибки: "redis.exceptions.ConnectionError: Error 111 connecting to 127.0.0.1:6379. 111." введите команду:
`sudo ufw allow 6379`

`sudo apt install redis-server`

Перейдите в директорию: `/etc/redis/`

Откройте файл: `redis.conf`

Нажмите `CTRL+F` для поиска `supervised no` в редакторе

Измените `supervised no` на `supervised systemd` и сохраните

`sudo systemctl restart redis.service`

Подтвердите, что Redis запущен по адресу 127.0.0.1. По умолчанию порт должен быть 6379.
`sudo systemctl status redis`

`CTRL+C` Для выхода из журнала.

`sudo apt install net-tools`

`sudo netstat -lnp | grep redis`

`sudo systemctl restart redis.service`

# ASGI для размещения Django Channels в качестве отдельного приложения
Из документации Django channels:
> ASGI (Asynchronous Server Gateway Interface) - это спецификация, на основе которой построены каналы, она предназначенна для отсоединения приложений каналов от конкретного сервера приложений и предоставления общего способа написания кода приложений и промежуточного программного обеспечения.

`su friskes`

Установите владельца файла
`cat > asgi.py`
friskes должен быть владельцем этого файла.

Проверить какие файлы находятся в текущей директории
`ls`

введите `ls -l` чтобы проверить владельца. friskes должен быть владельцем.

# Развертывание Django Channels с помощью Daphne & Systemd
> Gunicorn - это то, что мы используем для запуска приложения WSGI, которое является нашим приложением Django. Для запуска приложения ASGI нам нужно что-то еще, дополнительный инструмент. **[Daphne](https://github.com/django/daphne)** был создан для каналов Django и является самым простым. Мы можем запустить daphne с помощью службы systemd при загрузке сервера, точно так же, как мы запускаем gunicorn, а затем gunicorn запускает приложение django.

Вот несколько ссылок, которые я нашел полезными. Информация по этому поводу скудна:
1. [https://channels.readthedocs.io/en/latest/deploying.html](https://channels.readthedocs.io/en/latest/deploying.html)
1. [https://stackoverflow.com/questions/50192967/deploying-django-channels-how-to-keep-daphne-running-after-exiting-shell-on-web](https://stackoverflow.com/questions/50192967/deploying-django-channels-how-to-keep-daphne-running-after-exiting-shell-on-web)

`su root`

`apt install daphne`

Перейдите в `/etc/systemd/system/`

Создайте `daphne.service`. Обратите внимание, что порт равен `8001`. Это тот же порт как и у нашего `WebSocket` класса в шаблоне.

```
[Unit]
Description=WebSocket Daphne Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/home/friskes/project/FriskesSite
ExecStart=/home/friskes/project/venv/bin/python /home/friskes/project/venv/bin/daphne -b 0.0.0.0 -p 8001 FriskesSite.asgi:application
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

`systemctl daemon-reload`

`systemctl start daphne.service`

`systemctl status daphne.service`

`CTRL+C`

# Запуск daphne.service при загрузке сервера
> С помощью gunicorn и приложения WSGI мы создали файл `gunicorn.socket`, который сообщает gunicorn о запуске при загрузке сервера (по крайней мере, я так понимаю). Я не мог понять, как заставить это работать для daphne, поэтому вместо этого я написал сценарий bash, который будет запускаться при загрузке сервера.

#### Создайте скрипт для запуска daphne
Перейдите в `/root`

создайте файл `boot.sh` и сохраните содержимое

```
#!/bin/sh
sudo systemctl start daphne.service
```

Возможно, придется включить его запуск как скрипт (не уверен, нужно ли это)
`chmod u+x /root/boot.sh`

Если вы хотите узнать больше о сценариях bash, я нашел это полезным:
[https://ostechnix.com/fix-exec-format-error-when-running-scripts-with-run-parts-command/](https://ostechnix.com/fix-exec-format-error-when-running-scripts-with-run-parts-command/).

#### Сообщите systemd, чтобы он запустил скрипт bash при загрузке сервера

Перейдите в `/etc/systemd/system`

создайте файл `on_boot.service` с содержимым:

```
[Service]
ExecStart=/bin/bash /root/boot.sh

[Install]
WantedBy=default.target
```

`systemctl daemon-reload`

##### запустите
`sudo systemctl start on_boot`

##### Включите его для запуска при загрузке
`sudo systemctl enable on_boot`

##### Разрешить обслуживание daphne через брандмауэр (firewall)
`ufw allow 8001`

##### перезагрузите сервер
`sudo shutdown -r now`

##### Проверьте, запустилась ли служба on_boot при запуске сервера:
`systemctl status on_boot.service`

можно посмотреть логи
`sudo journalctl -u on_boot.service`

##### Проверьте, запустилась ли служба daphne при запуске сервера:
`systemctl status daphne.service`

можно посмотреть логи
`sudo journalctl -u daphne.service`

##### Проверьте, запустилась ли служба gunicorn при запуске сервера:
`systemctl status gunicorn.service`

# Настройка домена
Если вам нужно пользовательское доменное имя (что, вероятно, делают все), в этом разделе вы узнаете, как это сделать.

#### Купите домен на любом понравившемся сайте.

#### Подключите DNS в вашем хостинге
A-запись должна быть равна серверному ip

#### Добавьте домен в хостинг

#### Обновить конфигурацию Nginx
Ранее мы настроили Nginx на передачу прокси-сервера(proxy pass) в gunicorn. Нам нужно добавить новый домен в эту конфигурацию.

перейдите в директорию `/etc/nginx/sites-available`

обновите файл `FriskesSite`

```
server {
    listen 80;
    server_name <ваш_домен> www.<ваш_домен> <ваш_серверный_ip>;

    location /static/ {
        root /home/friskes/project/FriskesSite;
    }

    location /media/ {
        root /home/friskes/project/FriskesSite;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    }
}
```

`sudo systemctl reload nginx`

Убедитесь, что конфигурация nginx по-прежнему в порядке.
`sudo nginx -t`

### добавьте новые домены в `ALLOWED_HOSTS` проекта если не сделали этого ранее

Примените изменения
`service gunicorn restart`

## ТЕПЕРЬ ПРИШЛО ВРЕМЯ ПОДОЖДАТЬ...
> Может потребоваться некоторое время, чтобы ваш веб-сайт стал доступен в пользовательском домене. Я действительно не знаю, сколько времени это на самом деле займет. Я ждал несколько часов, пока у меня не заработало.

#### Откуда ты знаешь, что это работает?
Посетив свой домен, вы должны увидеть сообщение `Welcome to nginx!` **ИЛИ вы должны увидеть свой проект вживую и работающим**

Вообще обычно процесс занимает не более 24-48 часов, время обновления зависит от интернет-провайдера.
Чтобы начать работу над сайтом уже сейчас, пропишите для своего компьютера соответствие адреса и домена в файл hosts по этой [инструкции](https://beget.com/ru/kb/how-to/sites/kak-dobavit-sootvetstvie-ip-adresa-i-domena-sajta-v-fajl-etc-hosts?_ga=2.217897046.1912125031.1673476626-1439285939.1671724688).

# HTTPS (Если у вас зарегистрирован домен и он работает)
**Не выполняйте этот шаг, если только вы не сможете посетить свой веб-сайт, используя пользовательский домен.** Посмотрите: [Откуда ты знаешь, что это работает?](#Откуда-ты-знаешь,-что-это-работает?)

#### Установка certbot
HTTPS немного сложнее настроить при использовании Django Channels. Nginx и Daphne требуют некоторой дополнительной настройки.

`sudo apt install certbot python3-certbot-nginx`

`certbot --version`

`sudo systemctl reload nginx`

Убедитесь, что конфигурация nginx по-прежнему в порядке.
`sudo nginx -t`

#### Разрешить HTTPS через брандмауэр(firewall)

Если вы не выполняли эту команду ранее - выполните
`sudo ufw allow 'Nginx Full'`

`sudo ufw delete allow 'Nginx HTTP'` Блокировать стандартный HTTP

#### Получить SSL-сертификат

`sudo certbot --nginx -d <ваш_домен> -d www.<ваш_домен>`

#### Состояние службы отвечающей за авто обновление Certbot для проверки сертификата
`sudo systemctl status certbot.timer`

#### протестировать процесс обновления
`sudo certbot renew --dry-run`

## Обновить конфигурацию nginx
Нам нужно сообщить nginx, чтобы он разрешил передачу данных websocket через порт 8001. Я действительно не уверен, как это объяснить. Я не понимаю этого сам до конца. Это работает аналогично тому, как мы разрешаем gunicorn передавать прокси-сервер(proxy pass) nginx.

Перейдите в директорию `/etc/nginx/sites-available`

обновите `FriskesSite`

```
# REDIRECT (www or non-www domain) HTTP TRAFFIC to (www or non-www domain) HTTPS protocol
server {
    listen 80;

    server_name www.<ваш_домен> <ваш_домен>;

    return 301 https://$host$request_uri;
}

# REDIRECT (www domain) HTTPS TRAFFIC to (non-www domain) HTTPS protocol
server {
    listen 443 ssl;

    ssl_certificate /etc/letsencrypt/live/<ваш_домен>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<ваш_домен>/privkey.pem;

    server_name www.<ваш_домен>;

    return 301 $scheme://<ваш_домен>$request_uri;
}

# MAIN (non-www domain) HTTPS protocol HANDLER
server {
    listen 443 ssl;

    ssl_certificate /etc/letsencrypt/live/<ваш_домен>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<ваш_домен>/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    server_name <ваш_домен>;

    client_max_body_size 10M;

    location /static/ {
        root /home/friskes/project/FriskesSite;
    }

    location /media/ {
        root /home/friskes/project/FriskesSite;
    }

    location / {
#        https://stackoverflow.com/a/22027177/19276507
        proxy_set_header Host $host;

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_pass http://unix:/run/gunicorn.sock;
    }

    location /ws/ {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_redirect off;

        proxy_pass http://127.0.0.1:8001;
    }
}
```


## Обновить `daphne.service`
Расскажите daphne, как получить доступ к нашему сертификату https.

Перейдите в директорию `/etc/systemd/system`

обновите файл `daphne.service`

```
[Unit]
Description=WebSocket Daphne Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/home/friskes/project/FriskesSite
ExecStart=/home/friskes/project/venv/bin/python /home/friskes/project/venv/bin/daphne -e ssl:8001:privateKey=/etc/letsencrypt/live/<ваш_домен>/privkey.pem:certKey=/etc/letsencrypt/live/<ваш_домен>/fullchain.pem FriskesSite.asgi:application
Restart=on-failure

[Install]
WantedBy=multi-user.target
```


# Установка Celery

[официальная документация](https://docs.celeryq.dev/en/latest/userguide/daemonizing.html#usage-systemd)

Обновить установщик apt
`sudo apt update`

Установить celery
`sudo apt -y install celery`

Создать файл celery.service
`/etc/systemd/system/celery.service`

С содержимым:
```
[Unit]
Description=Celery Service
After=network.target

[Service]
Type=forking
User=friskes
Group=www-data
EnvironmentFile=/etc/conf.d/celery
WorkingDirectory=/home/friskes/project/FriskesSite
ExecStart=/bin/sh -c '${CELERY_BIN} multi start ${CELERYD_NODES} \
  -A ${CELERY_APP} --pidfile=${CELERYD_PID_FILE} \
  --logfile=${CELERYD_LOG_FILE} --loglevel=${CELERYD_LOG_LEVEL} ${CELERYD_OPTS}'
ExecStop=/bin/sh -c '${CELERY_BIN} multi stopwait ${CELERYD_NODES} \
  --pidfile=${CELERYD_PID_FILE}'
ExecReload=/bin/sh -c '${CELERY_BIN} multi restart ${CELERYD_NODES} \
  -A ${CELERY_APP} --pidfile=${CELERYD_PID_FILE} \
  --logfile=${CELERYD_LOG_FILE} --loglevel=${CELERYD_LOG_LEVEL} ${CELERYD_OPTS}'
Restart=always

[Install]
WantedBy=multi-user.target
```

Создать директорию conf.d и файл celery внутри
`/etc/conf.d/celery`

С содержимым:
```
CELERY_APP="FriskesSite"

CELERY_BIN="/home/friskes/project/venv/bin/celery"

CELERYD_NODES="w1"

CELERYD_MULTI="multi"

CELERYD_OPTS="--time-limit=300 --concurrency=8"

CELERYD_PID_FILE="/var/run/celery/%n.pid"

CELERYD_LOG_FILE="/var/log/celery/%n%I.log"

CELERYD_LOG_LEVEL="INFO"


CELERYBEAT_SCHEDULE_FILE="/var/run/celery/celerybeat-schedule"

CELERYBEAT_PID_FILE="/var/run/celery/beat.pid"

CELERYBEAT_LOG_FILE="/var/log/celery/beat.log"


CELERY_FLOWER_URL_PREFIX="flower"

CELERY_FLOWER_LOG_FILE="/var/log/celery/flower.log"

CELERY_FLOWER_ADDRESS="127.0.0.1"

CELERY_FLOWER_PORT="5555"
```

Создать файл celery.conf
`/etc/tmpfiles.d/celery.conf`

С содержимым:
```
d /var/run/celery 0755 friskes www-data -
d /var/log/celery 0755 friskes www-data -
```

Общие команды для Celery, Beat, Flower служб:
После изменения файла необходимо перезапустить демона
`sudo systemctl daemon-reload`
Установить авто запуск после каждой перезагрузки сервера
`systemctl enable <название_службы>.service`
Отключить авто запуск после каждой перезагрузки сервера
`sudo systemctl disable <название_службы>.service`
Посмотреть лог
`sudo journalctl -u <название_службы>.service`
Проверить состояние
`sudo systemctl status <название_службы>`
Остальные команды:
`sudo systemctl start <название_службы>`
`sudo systemctl stop <название_службы>`
`sudo systemctl restart <название_службы>`


# Установка Celery Beat

Создать файл celerybeat.service
`/etc/systemd/system/celerybeat.service`

С содержимым:
```
[Unit]
Description=Celery Beat Service
After=network.target

[Service]
Type=simple
User=friskes
Group=www-data
EnvironmentFile=/etc/conf.d/celery
WorkingDirectory=/home/friskes/project/FriskesSite
ExecStart=/bin/sh -c '${CELERY_BIN} -A ${CELERY_APP} beat \
  -s ${CELERYBEAT_SCHEDULE_FILE} \
  --pidfile=${CELERYBEAT_PID_FILE} \
  --logfile=${CELERYBEAT_LOG_FILE} \
  --loglevel=${CELERYD_LOG_LEVEL}'
Restart=always

[Install]
WantedBy=multi-user.target
```


# Установка Celery Flower

Создать файл celeryflower.service
`/etc/systemd/system/celeryflower.service`

С содержимым:
```
[Unit]
Description=Flower Celery Service
After=network.target

[Service]
User=friskes
Group=www-data
EnvironmentFile=/etc/conf.d/celery
WorkingDirectory=/home/friskes/project/FriskesSite
ExecStart=/bin/sh -c '${CELERY_BIN} -A ${CELERY_APP} flower \
  --url_prefix=${CELERY_FLOWER_URL_PREFIX} --port=${CELERY_FLOWER_PORT} \
  --address=${CELERY_FLOWER_ADDRESS} \
  --log-file-prefix=${CELERY_FLOWER_LOG_FILE} --loglevel=${CELERYD_LOG_LEVEL}'
Restart=on-failure
Type=simple

[Install]
WantedBy=multi-user.target
```


# Создание суперпользователя
Перед тестированием сервера необходимо создать суперпользователя.

`su friskes`

`cd /home/friskes/project/`

`source venv/bin/activate`

`cd FriskesSite`

`python manage.py createsuperuser`

Перезагрузите сервер и зайдите на свой веб-сайт, чтобы опробовать его. Теперь все должно работать.

Спасибо за чтение и не стесняйтесь вносить свой вклад в этот документ, если у вас есть лучший способ объяснить происходящее. Я ни в коем случае не являюсь веб-экспертом.

# FAQ
Вот некоторые вещи, которые я хотел бы знать, когда делал это в первый раз.

### Если вы изменяете файл или обновляете код в проекте, нужно ли вам что-либо делать?
Да.

Если вы изменяете только код, который *не связан с django channels*, то вам нужно запустить только:
`service gunicorn restart`

Но если вы измените какой-либо код, связанный с django channels, **тогда вы также должны перезапустить службу daphne**:
`service daphne restart`

На всякий случай я всегда просто запускаю и то, и другое. Это не может повредить.

### Команды для проверки статусов сервисов
На протяжении всего этого документа мы периодически проверяем статус настроенных нами сервисов. Такие вещи, как:
1. `sudo systemctl status gunicorn`
1. `sudo systemctl status redis`
1. `systemctl status daphne.service`
1. `systemctl status on_boot.service`
1. `sudo systemctl status certbot.timer`

### Команды NGINX
Посмотреть статус nginx
1. `sudo systemctl status nginx`
Остановить nginx (до первой перезагрузки сервера)
1. `sudo systemctl stop nginx`
Запустить nginx
1. `sudo systemctl start nginx`
Автоматическая остановка а затем запуск nginx
1. `sudo systemctl reload nginx`

Отключить автоматический запуск nginx после перезагрузки сервера
1. `sudo systemctl disable nginx`
Включить автоматический запуск nginx после перезагрузки сервера
1. `sudo systemctl enable nginx`

Если что-либо из этого не сработает, значит, вы сделали что-то не так. Наиболее распространенная проблема заключается в том, что структура каталогов не совпадает. Например, вы могли бы использовать `/home/friskes/project/неправильное_название_проекта/` вместо `/home/friskes/project/FriskesSite/`. Вам нужно очень внимательно изучить структуру ваших каталогов и убедиться, что все названия указаны правильно и соотносятся с `.service` файлами, которые вы создали. 

> Когда вы вносите изменения в `.service` файл, **Всегда выполняйте команду `sudo systemctl daemon-reload`**. Или на всякий случай просто перезапустите этот чертов сервер `sudo shutdown -r now`. Перезапуск сервера - это безопасный способ, но и самый медленный.


### Получить информацию об оперативной памяти
Команда: `free -h`
Вызвать программу диспетчер задач [инструкция](https://zalinux.ru/?p=1811)
Команда открытия диспетчере: `top` Выйти кнопкой `q`
Команды `Shift + <` и ` Shift + >` меняют столбец по которому сортируются строки в диспетчере

Покажет использование памяти процессами:
`ps aux | awk '{print $6/1024 " MB\t\t" $11}' | sort -n`


# References
1. [https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-18-04](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-18-04)
1. [https://channels.readthedocs.io/en/latest/](https://channels.readthedocs.io/en/latest/)
1. [https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-20-04](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-20-04)
1. [https://www.digitalocean.com/community/tutorials/how-to-set-up-object-storage-with-django](https://www.digitalocean.com/community/tutorials/how-to-set-up-object-storage-with-django)
1. [https://stackoverflow.com/questions/61101278/how-to-run-daphne-and-gunicorn-at-the-same-time](https://stackoverflow.com/questions/61101278/how-to-run-daphne-and-gunicorn-at-the-same-time)
1. [https://github.com/conda-forge/pygridgen-feedstock/issues/10](https://github.com/conda-forge/pygridgen-feedstock/issues/10)
1. [https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)
