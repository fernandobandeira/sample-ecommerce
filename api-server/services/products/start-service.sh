#!/usr/bin/env bash

docker service create --replicas 3 -d --name products-service -p 3001:3001 fernandobandeira/products-service