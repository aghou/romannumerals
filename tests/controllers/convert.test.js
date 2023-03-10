const request = require('supertest');
const app = require('../../app');

describe('Test /convert route path', () => {
  test('It should convert number to roman numeral', async () => {
    return request(app)
      .get('/convert?n=5')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('text/plain');
        expect(response.text).toBe('V');
      });
  });

  test('It should return http error code 405', async () => {
    return request(app)
      .post('/convert?n=5')
      .then((response) => {
        expect(response.statusCode).toBe(405);
      });
  });

  test('It should return http error code 400', async () => {
    return request(app)
      .get('/convert')
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });
});
