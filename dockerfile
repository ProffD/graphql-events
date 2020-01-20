FROM node:10.16.3

WORKDIR /usr/src/event-app

COPY ./ ./

RUN npm install

CMD [ "bin/bash" ]