const http = require('http');
const routerTrigger = require('../router');
const convertController = require('../controllers/convert');
const sseController = require('../controllers/sse');
jest.mock('../controllers/convert', () => jest.fn(() => true));
jest.mock('../controllers/sse', () => jest.fn(() => true));

describe('Test router', () => {
  test('Should be trigger convert controller on /convert path', () => {
    const req = new http.IncomingMessage();
    const res = new http.ServerResponse(req);

    req.method = 'GET';
    req.url = 'convert';
    req.protocol = 'http';
    req.headers.host = 'localhost';
    expect(routerTrigger(req, res)).toBe(true);
    expect(convertController).toHaveBeenCalled();
    expect(convertController.mock.results[0].value).toBe(true);
    expect(convertController).toHaveBeenCalledWith(req, res);
  });

  test('Should execute default route on /notexist path', () => {
    const req = new http.IncomingMessage();
    const res = new http.ServerResponse(req);

    req.method = 'GET';
    req.url = 'nonexist';
    req.protocol = 'http';
    req.headers.host = 'localhost';
    routerTrigger(req, res);
    expect(res.statusCode).toBe(404);
  });

  test('Should be trigger sse controller on /subscribe path', () => {
    const req = new http.IncomingMessage();
    const res = new http.ServerResponse(req);

    req.method = 'GET';
    req.url = 'subscribe';
    req.protocol = 'http';
    req.headers.host = 'localhost';
    expect(routerTrigger(req, res)).toBe(true);
    expect(sseController).toHaveBeenCalled();
    expect(sseController.mock.results[0].value).toBe(true);
    expect(sseController).toHaveBeenCalledWith(req, res);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
