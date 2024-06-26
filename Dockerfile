FROM node:lts-alpine AS builder

WORKDIR /usr/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:lts-alpine

COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/package*.json ./
COPY --from=builder /usr/app/build ./build
COPY --from=builder /usr/app/prisma ./prisma

EXPOSE 3001

RUN apt-get update -y && apt-get install -y openssl

CMD [ "npm", "run", "start:migrate:prod" ]