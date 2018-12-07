FROM node:alpine

LABEL maintainer="aalferez"

COPY . /app

WORKDIR /app

EXPOSE 3000

RUN npm install

ENTRYPOINT ["npm","start"]


