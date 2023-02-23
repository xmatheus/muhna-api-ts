#!/bin/bash

CONTAINER_NAME="mongo-muhna"
PASSWORD="wq5&R3w2RWE^"

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
        docker run -d -p 27017:27017 --name ${CONTAINER_NAME} -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=${PASSWORD} mongo
    fi
fi