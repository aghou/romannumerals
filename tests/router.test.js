const http = require('http');
const routerTrigger = require('../router');
const convertController = require('../controllers/convert');
jest.mock('../controllers/convert', () => jest.fn(() => true));

describe('Test router', () => {
  test('Should be trigger convert controller on /convert path', () => {
    const req = new http.IncomingMessage();
    const res = new http.ServerResponse(req);

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

    req.url = 'nonexist';
    req.protocol = 'http';
    req.headers.host = 'localhost';
    routerTrigger(req, res);
    expect(res.statusCode).toBe(404);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
