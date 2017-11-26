FROM node:8.9.0

ENV PORT 3005
ENV MONGODB_URI mongodb://192.168.99.100:27017,192.168.99.101:27017,192.168.99.102:27017/Ecommerce?replicaSet=mongo-repl

EXPOSE 3004

COPY . .
RUN npm install

RUN npm run build

CMD ["node", "build/server.js"]