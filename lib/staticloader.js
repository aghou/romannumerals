const { readdirSync, readFileSync } = require('fs');
const path = require('path');
const cache = require('./cache');

/**
 * Static files loader function
 * Load and store html, js and css files from /static directory
 * and store files content into memory cache object
 */
module.exports = () => {
  const authorizedExtensions = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
  };
  // define static directory path
  const staticPath = path.join(__dirname, '..', 'static');
  const allFiles = readdirSync(staticPath);
  const authorizedFiles = allFiles.filter((filePath) => {
    const fileExtension = path.extname(filePath);
    return Object.keys(authorizedExtensions).indexOf(fileExtension) !== -1;
  });

  /**
   * Load and store files content into cache
   */
  authorizedFiles.forEach((filePath) => {
    const fileExtension = path.extname(filePath);
    const fileContent = readFileSync(path.join(__dirname, '..', 'static', filePath));
    const cacheKey = `/${path.basename(filePath)}`;
    const cacheItem = {
      mimeType: authorizedExtensions[fileExtension],
      content: fileContent,
    };
    cache.static_resources[cacheKey] = cacheItem;
  });
};
