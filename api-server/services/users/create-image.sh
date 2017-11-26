#!/usr/bin/env bash

eval `docker-machine env manager1`

docker rm -f users-service

docker rmi users-service

docker image prune -f

docker volume prune -f

docker build -t users-service .