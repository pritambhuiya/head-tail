const { firstNElements } = require('../src/headLib.js');
const assert = require('assert');

describe('firstNElements', () => {
  it('Should return 1 line', () => {
    assert.strictEqual(firstNElements('hello\nbye', 'lines', 1), 'hello');
  });

  it('Should return multiple lines', () => {
    assert.strictEqual(firstNElements('hello\nbye\nhi', 'lines', 2),
      'hello\nbye');
  });

  it('Should return given lines having empty line', () => {
    assert.strictEqual(firstNElements('', 'lines', 1), '');
    assert.strictEqual(firstNElements('hello\n', 'lines', 2), 'hello\n');
    assert.strictEqual(firstNElements('hello\n\nbye', 'lines', 3),
      'hello\n\nbye');
  });

  it('Should return 1 byte', () => {
    assert.strictEqual(firstNElements('ab', 'bytes', 1), 'a');
  });

  it('Should return multiple bytes', () => {
    assert.strictEqual(firstNElements('abc', 'bytes', 2), 'ab');
  });

  it('Should return given bytes having empty lines', () => {
    assert.strictEqual(firstNElements('a\n', 'bytes', 1), 'a');
    assert.strictEqual(firstNElements('a\nb', 'bytes', 2), 'a\n');
    assert.strictEqual(firstNElements('a\nb', 'bytes', 3), 'a\nb');
  });

  it('Should return given bytes having spaces', () => {
    assert.strictEqual(firstNElements('a ', 'bytes', 1), 'a');
    assert.strictEqual(firstNElements('a b', 'bytes', 2), 'a ');
    assert.strictEqual(firstNElements('a b', 'bytes', 3), 'a b');
  });
});
