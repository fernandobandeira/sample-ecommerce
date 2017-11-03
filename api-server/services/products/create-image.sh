#!/usr/bin/env bash

eval `docker-machine env manager1`

docker rm -f products-service

docker rmi products-service

docker image prune

docker volume prune

docker build -t products-service .