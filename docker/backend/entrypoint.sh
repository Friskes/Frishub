#!/usr/bin/env bash

echo ">>> EXECUTION ENTRYPOINT.SH"

./manage.py makemigrations --noinput
./manage.py migrate

exec "$@"
