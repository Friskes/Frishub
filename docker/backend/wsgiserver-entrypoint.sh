#!/bin/sh

echo "WAITING FOR POSTGRES... host=${POSTGRES_HOST} port=${POSTGRES_PORT}";
bash -c '
until printf "" 2>>/dev/null >>/dev/tcp/${POSTGRES_HOST}/${POSTGRES_PORT}; do
    echo "POSTGRES LOADING... $(nc -zv ${POSTGRES_HOST}.${PROJECT_NAME}_back ${POSTGRES_PORT})";
    sleep 0.5;
done;
echo "POSTGRES STARTED!";
'


# echo "WAITING FOR POSTGRES... host=${POSTGRES_HOST} port=${POSTGRES_PORT}";
# while ! nc -zv ${POSTGRES_HOST}.${PROJECT_NAME}_back ${POSTGRES_PORT}; do
#     echo "POSTGRES LOADING... $(nc -zv ${POSTGRES_HOST}.${PROJECT_NAME}_back ${POSTGRES_PORT})";
#     sleep 0.5;
# done;
# echo "POSTGRES STARTED!";


sh -c "echo '>>> EXECUTION wsgiserver command' &&
python manage.py collectstatic --noinput &&
python manage.py makemigrations --noinput &&
python manage.py migrate --noinput &&
python manage.py runserver 0.0.0.0:8000"

exec "$@"
