const { tail } = require('../../src/tail/tailLib.js');
const assert = require('assert');

describe('tail', () => {
  it('Should return last line', () => {
    assert.strictEqual(tail('hello\nbye', 1), 'bye');
  });

  it('Should return given number of last lines', () => {
    assert.strictEqual(tail('hello\nbye\nhi', 2), 'bye\nhi');
  });
});
