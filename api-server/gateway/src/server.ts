import { App } from './app';

const { PORT = 4000 } = process.env;
const { app } = new App();

app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`);
});
