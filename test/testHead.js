const { head } = require('../src/head.js');
const assert = require('assert');

describe('head', () => {
  it('Head should return given contents', () => {
    assert.strictEqual(head('hello'), 'hello');
  });
});
