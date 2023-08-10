FROM ubuntu:22.04


# !!! fix busy ports on WINDOWS !!!
# https://github.com/docker/for-win/issues/9272#issuecomment-731849555
# netsh int ipv4 set dynamic tcp start=49152 num=16384


# !!! BEFORE first launch on LINUX, must run the command (need REBOOT server) !!!
# https://github.com/nextcloud/all-in-one/discussions/1731
# echo "vm.overcommit_memory = 1" | sudo tee /etc/sysctl.d/nextcloud-aio-memory-overcommit.conf


# !!! after ADDED any .sh file, need to run the command !!!
# https://stackoverflow.com/a/69483712/19276507
# sudo chmod +x ./manage.py && sudo chmod +x ./docker/backend/celery-worker-entrypoint.sh && sudo chmod +x ./docker/backend/celery-beat-entrypoint.sh && sudo chmod +x ./docker/backend/celery-flower-entrypoint.sh && sudo chmod +x ./docker/certbot/init-letsencrypt.sh

# !!! after CHANGING any .sh file, need to run the command !!!
# https://stackoverflow.com/a/29747593/19276507
# sed -i -e 's/\r$//' ./docker/backend/celery-worker-entrypoint.sh && sed -i -e 's/\r$//' ./docker/backend/celery-beat-entrypoint.sh && sed -i -e 's/\r$//' ./docker/backend/celery-flower-entrypoint.sh && sed -i -e 's/\r$//' ./docker/certbot/init-letsencrypt.sh


# !!! pass SSL certification BEFORE run build docker compose !!!
# https://stackoverflow.com/a/68463312/19276507
# sudo ./docker/certbot/init-letsencrypt.sh
# docker compose down
# AFTER success run you need UNcomment SSL part in default.conf.template file

# !!! If you encounter this ERROR after UNcomment SSL part, running the command for HELP you !!!
# "/etc/letsencrypt/options-ssl-nginx.conf" failed (2: No such file or directory)
# curl -L https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > ./docker/certbot/conf/options-ssl-nginx.conf

# !!! If you encounter this ERROR after UNcomment SSL part, running the command for HELP you !!!
# "No such file or directory:calling fopen(/etc/letsencrypt/ssl-dhparams.pem, r)"
# curl -L https://ssl-config.mozilla.org/ffdhe2048.txt > ./docker/certbot/conf/ssl-dhparams.pem


# https://askubuntu.com/questions/909277/avoiding-user-interaction-with-tzdata-when-installing-certbot-in-a-docker-contai
# https://github.com/moby/moby/issues/4032#issuecomment-192327844
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y software-properties-common && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update && \
    apt-get install -y python3.8 python3.8-dev python3-pip && \
    # https://stackoverflow.com/a/71977089/19276507
    apt-get install -y python3.8-distutils && \
    # https://stackoverflow.com/a/12037133/19276507
    apt-get install -y libpq-dev && \
    apt-get install -y netcat

RUN rm -f /usr/bin/python && ln -s /usr/bin/python3.8 /usr/bin/python
RUN rm -f /usr/bin/python3 && ln -s /usr/bin/python3.8 /usr/bin/python3


# for not install dependencies every time
COPY requirements.txt .

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

# !!! Installation order is IMPORTANT for websocket LIBS !!!
# "TypeError: __init__() missing 3 required positional arguments: 'environ', 'socket', and 'rfile'"
RUN pip3 uninstall -y websocket websocket-client
RUN pip3 install websocket && pip3 install websocket-client

# for work websocket
RUN pip3 install -U 'Twisted[tls,http2]'


COPY . /app
WORKDIR /app
