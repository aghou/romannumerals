const http = require('http');
const { URL } = require('url');
const { convert2roman } = require('../lib/converttoroman');

const authorizedMethods = ['GET', 'HEAD'];

/**
 * Convert controller convert positive decimal number
 * to Roman transcription
 *
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
module.exports = (req, res) => {
  if (authorizedMethods.indexOf(req.method) === -1) {
    // 405 Method Not Allowed
    res.statusCode = 405;
    return res.end();
  }

  const baseUrl = req.protocol + '://' + req.headers.host + '/';
  const data = parseAndValidateQuery(req.url, baseUrl);
  if (!data) {
    res.statusCode = 400;
    return res.end('Invalid query');
  }

  const romanTranscription = convert2roman(data.get('n'));
  res.setHeader('Content-Type', 'text/plain');
  res.end(romanTranscription);
};

/**
 * Parse and validate queryParams as user Input
 * valide URLSearchParams must have:
 * - n: defined and his value must be an number between [1-100]
 *
 * @param {string} requestUrl
 * @param {string} baseUrl
 * @return {URLSearchParams|false}
 */
function parseAndValidateQuery(requestUrl, baseUrl) {
  const queryParams = new URL(requestUrl, baseUrl).searchParams;

  // Check required queryParams
  if (queryParams.get('n') != null) {
    const numberRangeRegex = /^([0-9]|[1-9][0-9]|100)$/;

    // Check validity of fields in queryParams
    if (numberRangeRegex.test(queryParams.get('n'))) {
      return queryParams;
    }
  }
  return false;
}
module.exports.parseAndValidateQuery = parseAndValidateQuery;
