#!/usr/bin/env bash

echo ">>> EXECUTION CELERY-FLOWER-ENTRYPOINT.SH"

mkdir -p /var/run/celery /var/log/celery
chown -R nobody:nogroup /var/run/celery /var/log/celery

/bin/sh -c 'celery -A ${CELERY_APP} flower \
--url_prefix=${CELERY_FLOWER_URL_PREFIX} --port=${CELERY_FLOWER_PORT} \
--address=${CELERY_FLOWER_ADDRESS} \
--log-file-prefix=/var/log/celery/flower.log --loglevel=INFO'
