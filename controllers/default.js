const http = require('http');
const cache = require('../lib/cache');

const authorizedMethods = ['GET', 'HEAD'];
/**
 * Default controller serving static resource (Html, Js and Css)
 * and Not Found resources
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
module.exports = (req, res) => {
  if (authorizedMethods.indexOf(req.method) === -1) {
    // 405 Method Not Allowed
    res.statusCode = 405;
    return res.end();
  }
  const resource = req.url === '/' ? '/index.html' : req.url;
  const staticContent = cache.static_resources[resource];
  if (staticContent == null) {
    res.statusCode = 404;
    return res.end();
  }
  res.setHeader('Content-Type', staticContent.mimeType);
  res.end(staticContent.content);
};
