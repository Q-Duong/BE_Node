from node:16

workdir /usr/src/app

copy package*.json ./

run npm install

copy . ./

expose 8080

cmd ['node', 'server.js']