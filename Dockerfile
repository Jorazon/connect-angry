FROM jorazon/connect-angry:latest
LABEL Name=connectangry Version=0.0.1
RUN apt-get -y update
ENV TOKEN="bot token"

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

CMD ["sh", "-c", "/usr/games/fortune -a | cowsay"]
