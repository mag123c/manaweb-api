FROM node:18-alpine
ENV PORT=8080

WORKDIR /app
COPY package.json /app

RUN npm install
COPY . /app
RUN npm run build

EXPOSE $PORT
CMD ["npm", "run", "start"]
# CMD [ "node", "./dist/main.js" ]