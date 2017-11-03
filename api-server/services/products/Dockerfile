FROM node:8.9.0

ENV PORT 3001
ENV MONGODB_URI mongodb://192.168.99.100:27017/Ecommerce

EXPOSE 3001

COPY . .
RUN npm install

RUN npm run build

CMD ["node", "build/server.js"]