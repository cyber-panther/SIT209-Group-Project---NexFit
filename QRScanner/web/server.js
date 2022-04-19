const express = require('express');
const app = express();

const port = 3000;
const base = `${__dirname}`;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${base}/index.html`);
});

app.get('/send-command', (req, res) => {
  res.sendFile(`${base}/send-command.html`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});