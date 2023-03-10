const request = require('supertest');
const app = require('../../app');

describe('Test default route path', () => {
  test('It should return index.html content', async () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('text/html');
      });
  });

  test('It should return main.js content', async () => {
    return request(app)
      .get('/main.js')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('text/javascript');
      });
  });

  test('It should return http error code 405', async () => {
    return request(app)
      .post('/')
      .then((response) => {
        expect(response.statusCode).toBe(405);
      });
  });

  test('It should return http error code 404', async () => {
    return request(app)
      .get('/notfound')
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });
});
