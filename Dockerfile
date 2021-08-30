FROM alpine

LABEL Name=connectangry
LABEL Version=0.0.1

ENV TOKEN "bot token"

RUN apk update && apk upgrade && apk add npm

WORKDIR "/data"

VOLUME [ "/data" ]

COPY package*.json ./

RUN npm i

COPY . .

ENTRYPOINT ["node", "main.js"]
