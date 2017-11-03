#!/usr/bin/env bash

docker service create --replicas 1 --name categories-service -p 3002:3002 fernandobandeira/categories-service