#!/usr/bin/env bash

eval `docker-machine env manager1`

docker rm -f products-service

docker rmi products-service

docker image prune -f

docker volume prune -f

docker build -t products-service .