/**
 * Roman numerals map reference
 * Limited to 100
 * @constant {Object}
 */
const romanRef = {
  0: '',
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII',
  9: 'IX',
  10: 'X',
  20: 'XX',
  30: 'XXX',
  40: 'XL',
  50: 'L',
  60: 'LX',
  70: 'LXX',
  80: 'LXXX',
  90: 'XC',
  100: 'C',
};

/**
 * Convert number to Roman Numerals
 *
 * @param {Number} n
 * @return {String} roman numeral of n
 */
function convert2roman(n) {
  if (n < 0 || n > 100) {
    return 'Out of scope';
  }
  let roman = '';
  const nChar = String(n).split('');
  const leftChar = Number(nChar.shift()) * Math.pow(10, nChar.length);
  const leftCharRoman = romanRef[String(leftChar)];
  roman += leftCharRoman;
  if (nChar.length > 0) {
    const next = Number(nChar.join(''));
    roman += convert2roman(next);
  }
  return roman;
}

module.exports = {
  convert2roman,
};
