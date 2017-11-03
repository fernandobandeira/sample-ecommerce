#!/usr/bin/env bash

docker service create --replicas 1 --name discounts-service -p 3003:3003 fernandobandeira/discounts-service