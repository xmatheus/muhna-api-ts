#!/bin/bash

CONTAINER_NAME="postgres-muhna"
PASSWORD="wq5&R3w2RWE^"
IMAGE_NAME="postgres:latest"

# Verifica se a imagem do Postgres existe localmente
if [ "$(docker images -q ${IMAGE_NAME} 2> /dev/null)" == "" ]; then
    echo "A imagem ${IMAGE_NAME} não existe localmente. Fazendo o pull da imagem..."
    docker pull ${IMAGE_NAME}
fi

# Verifica se o container está em execução
if [ "$(docker ps -q -f name=${CONTAINER_NAME})" ]; then
    echo "O container ${CONTAINER_NAME} já está em execução."
else
# Verifica se o container existe
    if [ "$(docker ps -aq -f name=${CONTAINER_NAME})" ]; then
    # Se o container existir, mas não estiver em execução, inicie-o
        echo "Iniciando o container ${CONTAINER_NAME}..."
        docker start ${CONTAINER_NAME}
    else
    # Se o container não existir, faça o pull da imagem e inicie-o
        echo "O container ${CONTAINER_NAME} não existe. Iniciando o container..."
        docker run -d -p 5432:5432 --name ${CONTAINER_NAME} -e POSTGRES_USER=root -e POSTGRES_PASSWORD=${PASSWORD} ${IMAGE_NAME}
    fi
fi