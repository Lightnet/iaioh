import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
  console.log(`Example app listening on port http://localhost:${port}/plugintest01.html`);
  console.log(`Example app listening on port http://localhost:${port}/plugintest02.html`);
})