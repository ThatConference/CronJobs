
FROM node:carbon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

COPY ./src/ /usr/src/app

EXPOSE 80

CMD ["node", "server.js"]
