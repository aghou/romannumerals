const http = require('http');
const defaultRouter = require('./router');

module.exports = http.createServer(defaultRouter);
