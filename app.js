const http = require('http');
const defaultRouter = require('./router');
const loadStaticResources = require('./lib/staticloader');
loadStaticResources();

module.exports = http.createServer(defaultRouter);
