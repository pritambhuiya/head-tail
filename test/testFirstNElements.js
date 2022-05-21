const { firstNElements } = require('../src/headLib.js');
const assert = require('assert');

describe('firstNElements', () => {
  it('Should return 1 line', () => {
    assert.strictEqual(firstNElements('hello\nbye',
      { maxLines: 1, maxBytes: 0 }), 'hello');
  });

  it('Should return multiple lines', () => {
    assert.strictEqual(firstNElements('hello\nbye\nhi',
      { maxLines: 2, maxBytes: 0 }), 'hello\nbye');
  });

  it('Should return given lines having empty line', () => {
    assert.strictEqual(firstNElements('', { maxLines: 1, maxBytes: 0 }), '');
    assert.strictEqual(firstNElements('hello\n', { maxLines: 2, maxBytes: 0 }),
      'hello\n');
    assert.strictEqual(firstNElements('hello\n\nbye',
      { maxLines: 3, maxBytes: 0 }), 'hello\n\nbye');
  });

  it('Should return 1 byte', () => {
    assert.strictEqual(firstNElements('ab', { maxbytes: 0, maxBytes: 1 }), 'a');
  });

  it('Should return multiple bytes', () => {
    assert.strictEqual(firstNElements('abc', { maxbytes: 0, maxBytes: 2 }),
      'ab');
  });

  it('Should return given bytes having empty lines', () => {
    assert.strictEqual(firstNElements('a\n', { maxLines: 0, maxBytes: 1 }),
      'a');
    assert.strictEqual(firstNElements('a\nb', { maxLines: 0, maxBytes: 2 }),
      'a\n');
    assert.strictEqual(firstNElements('a\nb', { maxLines: 0, maxBytes: 3 }),
      'a\nb');
  });

  it('Should return given bytes having empty lines', () => {
    assert.strictEqual(firstNElements('a ', { maxLines: 0, maxBytes: 1 }), 'a');
    assert.strictEqual(firstNElements('a b', { maxLines: 0, maxBytes: 2 }),
      'a ');
    assert.strictEqual(firstNElements('a b', { maxLines: 0, maxBytes: 3 }),
      'a b');
  });
});

