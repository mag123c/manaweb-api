FROM node:18-alpine

RUN mkdir -p /app
WORKDIR /app
ADD . /app/

RUN npm install
RUN npm run build

EXPOSE 8080

ENTRYPOINT npm run start:prod