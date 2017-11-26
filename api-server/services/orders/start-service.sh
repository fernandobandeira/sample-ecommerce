#!/usr/bin/env bash

docker service create --replicas 3 -d --name orders-service -p 3005:3005 fernandobandeira/orders-service