const { head } = require('../src/headLib.js');
const assert = require('assert');

describe('head', () => {
  it('Should return 1 line', () => {
    assert.strictEqual(head('hello', 1), 'hello');
    assert.strictEqual(head('hello\nbye', 1), 'hello');
  });

  it('Should return 2 lines', () => {
    assert.strictEqual(head('hello\nbye', 2), 'hello\nbye');
    assert.strictEqual(head('hello\nbye\nhi', 2), 'hello\nbye');
  });

  it('Should return given lines having empty line', () => {
    assert.strictEqual(head('', 1), '');
    assert.strictEqual(head('hello\n', 1), 'hello');
    assert.strictEqual(head('hello\n', 2), 'hello\n');
    assert.strictEqual(head('hello\n\nbye', 2), 'hello\n');
    assert.strictEqual(head('hello\n\nbye', 3), 'hello\n\nbye');
  });
});
