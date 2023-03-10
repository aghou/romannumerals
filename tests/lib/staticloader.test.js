const cache = require('../../lib/cache');
const loadStaticResources = require('../../lib/staticloader');
jest.mock('fs', () => {
  const fs = jest.requireActual('fs');
  return {
    __esModule: false,
    ...fs,
    readdirSync: jest.fn(() => ['index.html', 'main.js', 'style.css', 'secret.txt']),
    readFileSync: jest.fn((filename) => 'file content'),
  };
});

describe('Test static loader', () => {
  test('Should load only authorized static files', () => {
    loadStaticResources();
    expect(Object.keys(cache.static_resources)).toHaveLength(3);
    expect(Object.keys(cache.static_resources)).toMatchObject(['/index.html', '/main.js', '/style.css']);
  });

  test('Should parse ans cache files with the right mimeType', () => {
    loadStaticResources();
    expect(cache.static_resources['/main.js'].content).toBe('file content');
    expect(cache.static_resources['/main.js'].mimeType).toBe('text/javascript');
    expect(cache.static_resources['/index.html'].mimeType).toBe('text/html');
    expect(cache.static_resources['/style.css'].mimeType).toBe('text/css');
  });

  afterEach(() => {
    cache.static_resources = {};
    jest.clearAllMocks();
  });
});
