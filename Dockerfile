FROM node:10-alpine

RUN mkdir /app

COPY . /app/

CMD node /app/index.js
