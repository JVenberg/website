const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const host = '0.0.0.0';
const port = parseInt(process.env.PROXY_PORT, 10) || 8080;
const apiPort = parseInt(process.env.API_PORT, 10) || 9090;
const webPort = parseInt(process.env.WEB_PORT, 10) || 5000;

const app = express();
app.use('/api', createProxyMiddleware('/api', {
  target: `http://api:${apiPort}`,
  changeOrigin: true,
  ws: true,
}));

app.use('/', createProxyMiddleware({
  target: `http://web:${webPort}`,
  changeOrigin: true,
  ws: true,
}));

app.listen(port, host, () => {
  console.log(`Listening on port: ${port}`);
});
