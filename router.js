const http = require('http');
const { URL } = require('url');
const convertController = require('./controllers/convert');
/**
 * Main router ( defaut request handler )
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
module.exports = (req, res) => {
  const baseUrl = req.protocol + '://' + req.headers.host + '/';
  const pathname = new URL(req.url, baseUrl).pathname;

  switch (pathname) {
    case '/convert':
      return convertController(req, res);
    default:
      res.statusCode = 404;
      return res.end();
  }
};
