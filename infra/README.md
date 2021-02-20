# Infra

## Start infra
```sh

# Start infra
docker-compose up -d

# Connect to postgresql
docker-compose run notizendb bash
psql --host=notizendb --username=unicorn_user --dbname=rainbow_database

## Connect to db
\c rainbow_database
```