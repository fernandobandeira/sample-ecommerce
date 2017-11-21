#!/usr/bin/env bash

eval `docker-machine env manager1`

docker service rm products-service categories-service discounts-service

for server in manager1 worker1 worker2
do
  eval `docker-machine env $server`

  for image in fernandobandeira/products-service fernandobandeira/categories-service fernandobandeira/discounts-service
    do
      IMAGE=$(docker images $image -q)
      docker rmi -f $IMAGE
  done
done