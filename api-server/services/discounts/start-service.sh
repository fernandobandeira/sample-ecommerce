#!/usr/bin/env bash

docker service create --replicas 3 --name discounts-service -p 3003:3003 fernandobandeira/discounts-service