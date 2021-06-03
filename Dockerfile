from bitnami/node:14

WORKDIR /var/www/app

COPY package.json .
COPY yarn.lock .

RUN yarn install
RUN mkdir .webpack
