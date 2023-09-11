const express = require('express');

const app = express();

app.get('/api', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello! ${name}!!!`);
});

app.get('/api/goodbye', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Goodbye ${name}!`);
});

const port = parseInt(process.env.PORT, 10);
const host = '0.0.0.0';
app.listen(port, host, () => {
  console.log(`Listening on port: ${port}`);
});
