#!/usr/bin/env bash

echo ">>> EXECUTION CELERY-WORKER-ENTRYPOINT.SH"

mkdir -p /var/run/celery /var/log/celery
chown -R nobody:nogroup /var/run/celery /var/log/celery

# https://stackoverflow.com/a/59659476/19276507
exec celery --app=${CELERY_APP} worker -E \
            --loglevel=INFO --logfile=/var/log/celery/worker-example.log \
            --statedb=/var/run/celery/worker-example@%h.state \
            --hostname=worker-example@%h \
            --queues=celery.example -O fair \
            --uid=nobody --gid=nogroup
