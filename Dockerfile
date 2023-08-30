FROM node:alpine
RUN apk add --no-cache yarn

WORKDIR /usr/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

EXPOSE 3001

CMD [ "yarn",  "start" ]