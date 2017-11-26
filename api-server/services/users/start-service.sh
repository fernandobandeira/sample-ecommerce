#!/usr/bin/env bash

docker service create --replicas 3 -d --name users-service -p 3004:3004 fernandobandeira/users-service