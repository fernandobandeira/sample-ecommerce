#!/usr/bin/env bash

docker rm -f categories-service

docker rmi categories-service

docker image prune

docker volume prune

docker build -t categories-service .