#!/usr/bin/env bash

eval `docker-machine env manager1`

docker rm -f orders-service

docker rmi orders-service

docker image prune -f

docker volume prune -f

docker build -t orders-service .