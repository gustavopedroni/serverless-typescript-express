from node:lts-fermium AS dependencies

WORKDIR /var/www/app

COPY package.json .
COPY yarn.lock .

RUN yarn install
