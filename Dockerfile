FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
COPY yarn.lock ./
RUN npm install --global yarn
RUN yarn

COPY . .

EXPOSE 3001

CMD [ "yarn",  "start" ]