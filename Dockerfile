FROM node:alpine

WORKDIR /usr/src/dict-app

COPY ./ ./

RUN npm install

RUN apk update && apk add bash

CMD ["/bin/bash"]