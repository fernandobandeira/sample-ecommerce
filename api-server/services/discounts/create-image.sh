#!/usr/bin/env bash

docker rm -f discounts-service

docker rmi discounts-service

docker image prune

docker volume prune

docker build -t discounts-service .