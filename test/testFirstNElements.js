const { firstNElements } = require('../src/headLib.js');
const assert = require('assert');

describe('firstNElements', () => {
  it('Should return 1 line', () => {
    assert.strictEqual(firstNElements('hello\nbye',
      { lines: 1, bytes: 0 }), 'hello');
  });

  it('Should return multiple lines', () => {
    assert.strictEqual(firstNElements('hello\nbye\nhi',
      { lines: 2, bytes: 0 }), 'hello\nbye');
  });

  it('Should return given lines having empty line', () => {
    assert.strictEqual(firstNElements('', { lines: 1, bytes: 0 }), '');
    assert.strictEqual(firstNElements('hello\n', { lines: 2, bytes: 0 }),
      'hello\n');
    assert.strictEqual(firstNElements('hello\n\nbye',
      { lines: 3, bytes: 0 }), 'hello\n\nbye');
  });

  it('Should return 1 byte', () => {
    assert.strictEqual(firstNElements('ab', { lines: 0, bytes: 1 }), 'a');
  });

  it('Should return multiple bytes', () => {
    assert.strictEqual(firstNElements('abc', { lines: 0, bytes: 2 }),
      'ab');
  });

  it('Should return given bytes having empty lines', () => {
    assert.strictEqual(firstNElements('a\n', { lines: 0, bytes: 1 }),
      'a');
    assert.strictEqual(firstNElements('a\nb', { lines: 0, bytes: 2 }),
      'a\n');
    assert.strictEqual(firstNElements('a\nb', { lines: 0, bytes: 3 }),
      'a\nb');
  });

  it('Should return given bytes having empty lines', () => {
    assert.strictEqual(firstNElements('a ', { lines: 0, bytes: 1 }), 'a');
    assert.strictEqual(firstNElements('a b', { lines: 0, bytes: 2 }),
      'a ');
    assert.strictEqual(firstNElements('a b', { lines: 0, bytes: 3 }),
      'a b');
  });
});

