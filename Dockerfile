FROM node:14

LABEL Name=connectangry
LABEL Version=0.0.1

ENV TOKEN="bot token"

WORKDIR /data

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "main.js"]
