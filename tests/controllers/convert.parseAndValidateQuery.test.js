const { randomUUID } = require('crypto');
const { parseAndValidateQuery } = require('../../controllers/convert');

describe('Test parseAndValidateQuery function', () => {
  const uuid = randomUUID();
  test('requestUrl without n and sid queryParam should return false', () => {
    expect(parseAndValidateQuery('/convert', 'http://localhost')).toBe(false);
  });

  test('requestUrl without n or sid queryParam should return false', () => {
    expect(parseAndValidateQuery('/convert?n=9', 'http://localhost')).toBe(false);
    expect(parseAndValidateQuery(`/convert?sid=${uuid}`, 'http://localhost')).toBe(false);
  });

  test("requestUrl with n = '' should return false", () => {
    expect(parseAndValidateQuery(`/convert?sid=${uuid}&n=`, 'http://localhost')).toBe(false);
  });

  test('requestUrl with sid diffrent to UUID format should return false', () => {
    expect(parseAndValidateQuery(`/convert?n=9&sid=e5ew4`, 'http://localhost')).toBe(false);
    expect(parseAndValidateQuery(`/convert?n=9&sid=444666`, 'http://localhost')).toBe(false);
    expect(parseAndValidateQuery(`/convert?n=9&sid=`, 'http://localhost')).toBe(false);
    expect(parseAndValidateQuery(`/convert?n=9&sid=true`, 'http://localhost')).toBe(false);
  });

  test('requestUrl with n non numeric value should return false', () => {
    expect(parseAndValidateQuery(`/convert?sid=${uuid}&n=abc`, 'http://localhost')).toBe(false);
    expect(parseAndValidateQuery(`/convert?sid=${uuid}&n=true`, 'http://localhost')).toBe(false);
  });

  test('requestUrl with n < 0 or n > 100', () => {
    expect(parseAndValidateQuery(`/convert?sid=${uuid}&n=-1`, 'http://localhost')).toBe(false);
    expect(parseAndValidateQuery(`/convert?sid=${uuid}&n=101`, 'http://localhost')).toBe(false);
  });

  test('requestUrl with 0 <= n <= 100', () => {
    let obj = parseAndValidateQuery(`/convert?sid=${uuid}&n=0`, 'http://localhost');
    expect(obj).not.toBe(false);
    expect(obj.get('n')).toBe('0');

    obj = parseAndValidateQuery(`/convert?sid=${uuid}&n=43`, 'http://localhost');
    expect(obj).not.toBe(false);
    expect(obj.get('n')).toBe('43');

    obj = parseAndValidateQuery(`/convert?sid=${uuid}&n=100`, 'http://localhost');
    expect(obj).not.toBe(false);
    expect(obj.get('n')).toBe('100');
  });
});
