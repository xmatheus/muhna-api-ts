FROM node:alpine
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/
RUN npm install
RUN npx prisma generate
COPY . ./
RUN npm run build

FROM node:alpine
RUN apk add dumb-init
ENV NODE_ENV production
WORKDIR /usr/app
COPY . ./
RUN npm ci --omit=dev
CMD ["dumb-init", "node", "build/"]