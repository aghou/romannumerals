const http = require('http');
const { randomUUID } = require('crypto');
const cache = require('../lib/cache');

const authorizedMethods = ['GET', 'HEAD'];
/**
 * Server Side Events Subscription controller
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
module.exports = (req, res) => {
  if (authorizedMethods.indexOf(req.method) === -1) {
    // 405 Method Not Allowed
    res.statusCode = 405;
    return res.end();
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connetion', 'keep-alive');

  const sessionId = randomUUID();
  res.write(getInitMessageMessage(sessionId));

  cache.sse_response[sessionId] = res;
  req.on('close', () => {
    delete cache.sse_response[sessionId];
  });
};

/**
 * Generate Initial Event Message with init as eventName
 * @param {string} sessionId as uuid
 * @return {string}
 */
function getInitMessageMessage(sessionId) {
  let message = `event: init\n`;
  message += `data: ${sessionId}\n\n`;
  return message;
}
