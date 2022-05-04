FROM node

WORKDIR /app

COPY package*.json /app

COPY .gitignore /app

RUN npm i

COPY . /app

EXPOSE 3000

CMD ["node", "server.js"]