# docker login --email $DOCKER_EMAIL \
docker login \
             --username $DOCKER_USER \
             --password $DOCKER_PASSWORD

docker push anypay/sudo.anypay.global:latest
