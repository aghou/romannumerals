const http = require('http');
const sseController = require('../../controllers/sse');
const cache = require('../../lib/cache');

describe('Test subscribe [sse] route path', () => {
  /*
   * @type {http.IncomingMessage}
   */
  let req;

  /* @type {http.ServerResponse} */
  let res;

  beforeEach(() => {
    cache.sse_response = {};
    req = new http.IncomingMessage();
    res = new http.ServerResponse(req);
    req.url = 'subscribe';
    req.protocol = 'http';
    req.headers.host = 'localhost';
  });

  test('It Should return the right Content-Type response header', async () => {
    req.method = 'GET';
    sseController(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.getHeader('Content-Type')).toBe('text/event-stream');
  });

  test('It should send init event', async () => {
    req.method = 'GET';
    sseController(req, res);
    expect(/event: init\n/.test(res.outputData[0].data)).toBe(true);
  });

  test('It should return http error code 405', async () => {
    req.method = 'POST';
    sseController(req, res);
    expect(res.statusCode).toBe(405);
  });

  test('req onClose should delete res from cache', async () => {
    req.method = 'GET';
    sseController(req, res);
    expect(Object.keys(cache.sse_response).length).toBe(1);
    req.emit('close');
    expect(Object.keys(cache.sse_response).length).toBe(0);
  });
});
