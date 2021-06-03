from node:lts-fermium

WORKDIR /var/www/app

COPY package.json .
COPY yarn.lock .

RUN yarn install
RUN mkdir .webpack
RUN chmod -R 777 .webpack node_modules
