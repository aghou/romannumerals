const { convert2roman } = require('../../lib/converttoroman');

describe('Test convert2roman function', () => {
  test("input = 0 its should return ''", () => {
    expect(convert2roman(0)).toBe('');
  });

  test('With 0 < input < 10 ', () => {
    expect(convert2roman(1)).toBe('I');
    expect(convert2roman(2)).toBe('II');
    expect(convert2roman(3)).toBe('III');
    expect(convert2roman(4)).toBe('IV');
    expect(convert2roman(5)).toBe('V');
    expect(convert2roman(6)).toBe('VI');
    expect(convert2roman(7)).toBe('VII');
    expect(convert2roman(8)).toBe('VIII');
    expect(convert2roman(9)).toBe('IX');
  });

  test('With 10 <= input <= 100 ', () => {
    expect(convert2roman(10)).toBe('X');
    expect(convert2roman(23)).toBe('XXIII');
    expect(convert2roman(45)).toBe('XLV');
    expect(convert2roman(50)).toBe('L');
    expect(convert2roman(67)).toBe('LXVII');
    expect(convert2roman(78)).toBe('LXXVIII');
    expect(convert2roman(94)).toBe('XCIV');
    expect(convert2roman(100)).toBe('C');
  });

  test("With input < 0 Or input > 100 should return 'Out of scope' ", () => {
    expect(convert2roman(101)).toBe('Out of scope');
    expect(convert2roman(9999)).toBe('Out of scope');
    expect(convert2roman(-1)).toBe('Out of scope');
    expect(convert2roman(-9999)).toBe('Out of scope');
  });
});
