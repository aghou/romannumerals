const server = require('./app');
const host = process.env.SERVER_HOST || '127.0.0.1';
const port = process.env.SERVER_PORT || 8084;

try {
  server.listen(port, host, () => {
    console.log(`Server listen on http://${host}:${port}`);
  });
} catch (err) {
  console.error(err);
}
