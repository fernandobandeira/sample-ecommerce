#!/usr/bin/env bash

docker rm -f discounts-service

docker rmi discounts-service

docker image prune -f

docker volume prune -f

docker build -t discounts-service .