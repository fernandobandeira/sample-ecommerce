import { App } from './app';

const {
  PORT = 3000,
  MONGODB_URI = 'mongodb://localhost:27017/Ecommerce',
} = process.env;

const { app } = new App({ MONGODB_URI });

app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`);
});
