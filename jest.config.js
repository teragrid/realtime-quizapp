const path = require('path');

module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  testRegex: '.*\\.test\\.js$',
  collectCoverageFrom: [
    '**/controllers/**/*.(t|j)s',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  setupFiles: [path.join(__dirname, '.jest/mock-env.js')],
};
