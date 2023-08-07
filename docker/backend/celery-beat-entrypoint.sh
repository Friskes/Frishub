#!/usr/bin/env bash

echo ">>> EXECUTION CELERY-BEAT-ENTRYPOINT.SH"

mkdir -p /var/run/celery /var/log/celery
chown -R nobody:nogroup /var/run/celery /var/log/celery

/bin/sh -c 'celery -A ${CELERY_APP} beat \
-s /var/run/celery/celerybeat-schedule \
#--pidfile=/var/run/celery/beat.pid \
--logfile=/var/log/celery/beat.log \
--loglevel=INFO'
