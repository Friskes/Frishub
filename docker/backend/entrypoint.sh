#!/usr/bin/env bash

echo ">>> EXECUTION ENTRYPOINT.SH"

./manage.py makemigrations
./manage.py migrate

exec "$@"
