#!/bin/bash

CONTAINER_NAME="mongo-muhna"
PASSWORD="wq5&R3w2RWE^"
MONGO_IMAGE="mongo"

# Verifica se a imagem do MongoDB já está na máquina
if [ "$(docker images -q ${MONGO_IMAGE} 2> /dev/null)" ]; then
    echo "A imagem ${MONGO_IMAGE} já está na máquina."
else
    # Se a imagem não existir, faz o pull
    echo "A imagem ${MONGO_IMAGE} não existe. Fazendo o pull..."
    docker pull ${MONGO_IMAGE}
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
        echo "O container ${CONTAINER_NAME} não existe. Fazendo o pull da imagem e iniciando..."
        docker run -d -p 27017:27017 --name ${CONTAINER_NAME} -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=${PASSWORD} ${MONGO_IMAGE}
    fi
fi
