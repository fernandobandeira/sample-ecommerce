#!/usr/bin/env bash

docker rm -f categories-service

docker rmi categories-service

docker image prune -f

docker volume prune -f

docker build -t categories-service .