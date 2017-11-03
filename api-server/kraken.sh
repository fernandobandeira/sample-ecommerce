#!/usr/bin/env bash

function setup-swarm {
  # first we go to our docker folder
  cd _docker-setup

  echo '···························'
  echo '·· setting up the swarm  >>>> ··'
  echo '···························'

  # we create and init the swarm cluster
  (bash < ./setup-swarm.sh)

  # we go back to the root project
  cd ..
}

function setup-mongo {
  eval `docker-machine env manager1`
  
  echo '···························'
  echo '·· setting up the mongodb >>>> ··'
  echo '···························'

  docker run -d -p "27017:27017" mongo
}

function setup-images {

    # go inside the docker folder again
    cd _docker-setup

    echo '···························'
    echo '·· creating microservices images >>>>  ··'
    echo '···························'

    # we start all our microservices
    (bash < create-images.sh)

   cd ..
}

function setup-services {

    # go inside the docker folder again
    cd _docker-setup

    echo '···························'
    echo '·· starting up the microservices >>>>  ··'
    echo '···························'

    # we start all our microservices
    (bash < start-services.sh)

   cd ..
}

function status {
  eval `docker-machine env manager1`
  # we verify the docker swarm
  docker node ls

  # we verify our docker services
  docker service ls
}

function main {
  setup-swarm
  setup-mongo
  setup-images
  setup-services
  status
}

main