FROM node:14-alpine

WORKDIR /app

COPY packege*.json ./

RUN npm install 

COPY  . .

CMD ["npm", "run", "start:dev"]