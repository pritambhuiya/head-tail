const { head, linesUpto, bytesUpto } = require('../src/headLib.js');
const assert = require('assert');

describe('head', () => {
  it('Should return 1 line', () => {
    assert.strictEqual(head('hello', { maxLines: 1, maxBytes: 0 }), 'hello');
    assert.strictEqual(head('hello\nbye', { maxLines: 1, maxBytes: 0 }),
      'hello');
  });

  it('Should return multiple lines', () => {
    assert.strictEqual(head('hello\nbye', { maxLines: 2, maxBytes: 0 }),
      'hello\nbye');
    assert.strictEqual(head('hello\nbye\nhi', { maxLines: 2, maxBytes: 0 }),
      'hello\nbye');
  });
});

describe('linesUpto', () => {
  it('Should return 1 line', () => {
    assert.strictEqual(linesUpto('hello', { maxLines: 1 }), 'hello');
    assert.strictEqual(linesUpto('hello\nbye', { maxLines: 1 }), 'hello');
  });

  it('Should return multiple lines', () => {
    assert.strictEqual(linesUpto('hello\nbye', { maxLines: 2 }), 'hello\nbye');
    assert.strictEqual(linesUpto('hello\nbye\nhi', { maxLines: 2 }),
      'hello\nbye');
  });

  it('Should return given lines having empty line', () => {
    assert.strictEqual(linesUpto('', { maxLines: 1 }), '');
    assert.strictEqual(linesUpto('hello\n', { maxLines: 1 }), 'hello');
    assert.strictEqual(linesUpto('hello\n', { maxLines: 2 }), 'hello\n');
    assert.strictEqual(linesUpto('hello\n\nbye', { maxLines: 2 }), 'hello\n');
    assert.strictEqual(linesUpto('hello\n\nbye', { maxLines: 3 }),
      'hello\n\nbye');
  });
});

describe('bytesUpto', () => {
  it('Should return 1 byte', () => {
    assert.strictEqual(bytesUpto('a', { maxBytes: 1 }), 'a');
    assert.strictEqual(bytesUpto('ab', { maxBytes: 1 }), 'a');
  });

  it('Should return multiple bytes', () => {
    assert.strictEqual(bytesUpto('ab', { maxBytes: 2 }), 'ab');
    assert.strictEqual(bytesUpto('abc', { maxBytes: 3 }), 'abc');
  });

  it('Should return given lines having empty bytes', () => {
    assert.strictEqual(bytesUpto('', { maxBytes: 1 }), '');
    assert.strictEqual(bytesUpto('a b', { maxBytes: 3 }), 'a b');
    assert.strictEqual(bytesUpto('a b', { maxBytes: 2 }), 'a ');
    assert.strictEqual(bytesUpto('a\nb', { maxBytes: 3 }), 'a\nb');
    assert.strictEqual(bytesUpto('a\nb', { maxBytes: 2 }), 'a\n');
    assert.strictEqual(bytesUpto('a\n\nb', { maxBytes: 3 }), 'a\n\n');
  });

});
