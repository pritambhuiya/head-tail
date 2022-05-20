const { head } = require('../src/headLib.js');
const assert = require('assert');

describe('head', () => {
  it('Should return 1 line', () => {
    assert.strictEqual(head('hello', { maxLines: 1, maxBytes: 0 }), 'hello');
    assert.strictEqual(head('hello\nbye', { maxLines: 1, maxBytes: 0 }),
      'hello');
  });

  it('Should return 2 lines', () => {
    assert.strictEqual(head('hello\nbye', { maxLines: 2, maxBytes: 0 }),
      'hello\nbye');
    assert.strictEqual(head('hello\nbye\nhi', { maxLines: 2, maxBytes: 0 }),
      'hello\nbye');
  });

  it('Should return given lines having empty line', () => {
    assert.strictEqual(head('', { maxLines: 1, maxBytes: 0 }), '');
    assert.strictEqual(head('hello\n', { maxLines: 1, maxBytes: 0 }), 'hello');
    assert.strictEqual(head('hello\n', { maxLines: 2, maxBytes: 0 }),
      'hello\n');
    assert.strictEqual(head('hello\n\nbye', { maxLines: 2, maxBytes: 0 }),
      'hello\n');
    assert.strictEqual(head('hello\n\nbye', { maxLines: 3, maxBytes: 0 }),
      'hello\n\nbye');
  });
});
