const { parseAndValidateQuery } = require('../../controllers/convert');

describe('Test parseAndValidateQuery function', () => {
  test('requestUrl without n queryParam should return false', () => {
    expect(parseAndValidateQuery('/convert', 'http://localhost')).toBe(false);
  });

  test("requestUrl with n = '' should return false", () => {
    expect(parseAndValidateQuery('/convert?n=', 'http://localhost')).toBe(false);
  });

  test('requestUrl with n non numeric value should return false', () => {
    expect(parseAndValidateQuery('/convert?n=abc', 'http://localhost')).toBe(false);
    expect(parseAndValidateQuery('/convert?n=true', 'http://localhost')).toBe(false);
  });

  test('requestUrl with n < 0 or n > 100', () => {
    expect(parseAndValidateQuery('/convert?n=-1', 'http://localhost')).toBe(false);
    expect(parseAndValidateQuery('/convert?n=101', 'http://localhost')).toBe(false);
  });

  test('requestUrl with 0 <= n <= 100', () => {
    let obj = parseAndValidateQuery('/convert?n=0', 'http://localhost');
    expect(obj).not.toBe(false);
    expect(obj.get('n')).toBe('0');

    obj = parseAndValidateQuery('/convert?n=43', 'http://localhost');
    expect(obj).not.toBe(false);
    expect(obj.get('n')).toBe('43');

    obj = parseAndValidateQuery('/convert?n=100', 'http://localhost');
    expect(obj).not.toBe(false);
    expect(obj.get('n')).toBe('100');
  });
});
