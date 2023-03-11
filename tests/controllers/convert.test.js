const request = require('supertest');
const { randomUUID } = require('crypto');
const app = require('../../app');
const cache = require('../../lib/cache');

describe('Test /convert route path', () => {
  const uuid = randomUUID();
  cache.sse_response[uuid] = { write: () => {} };
  test('It should convert number to roman numeral', async () => {
    return request(app)
      .get(`/convert?sid=${uuid}&n=5`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('');
      });
  });

  test('It should return http error code 405', async () => {
    return request(app)
      .post(`/convert?${uuid}&n=5`)
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

  test('It should return http error code 400 when sid not in cache', async () => {
    const sid = randomUUID();
    return request(app)
      .get(`/convert?sid=${sid}&n=9`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });
});
