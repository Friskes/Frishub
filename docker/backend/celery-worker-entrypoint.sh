#!/usr/bin/env bash

echo ">>> EXECUTION CELERY-WORKER-ENTRYPOINT.SH"

mkdir -p /var/run/celery /var/log/celery
chown -R nobody:nogroup /var/run/celery /var/log/celery

# https://github.com/celery/celery/issues/3759
# https://docs.celeryq.dev/en/latest/userguide/workers.html#variables-in-file-paths
# https://stackoverflow.com/a/59659476/19276507
exec celery --app=${CELERY_APP} worker -E \
            --hostname=worker-example@%h \
            --uid=nobody --gid=nogroup \
            --loglevel=INFO \
            --logfile=/var/log/celery/worker-example.log
            # Если указать лог файл для Celery то лог (stdout, stderr) будет перенаправлен из консоли в файл
