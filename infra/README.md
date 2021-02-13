# Infra

## Start infra
```sh
docker-compose up -d
docker-compose run notizendb bash
psql --host=notizendb --username=unicorn_user --dbname=rainbow_database

## Connect to db
\c rainbow_database
```