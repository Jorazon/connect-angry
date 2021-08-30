FROM node:16.8.0-alpine

LABEL Name=connectangry
LABEL Version=0.0.1

ENV TOKEN "bot token"

RUN apk update && apk upgrade

WORKDIR "/data"

COPY package*.json ./

RUN npm i

COPY . .

ENTRYPOINT ["node", "main.js"]
