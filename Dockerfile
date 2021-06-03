FROM alpine

LABEL Name=connectangry
LABEL Version=0.0.1

ENV TOKEN "bot token"

RUN apk update && apk upgrade && apk add npm

WORKDIR /data

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT ["node", "main.js"]
