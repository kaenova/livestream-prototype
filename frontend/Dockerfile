FROM node:17-alpine3.14

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]