FROM node:12-alpine3.14
WORKDIR /app
COPY package.json /app
COPY . /app
RUN npm install --only=production && npm cache clean --force
CMD npm run start
EXPOSE 3001