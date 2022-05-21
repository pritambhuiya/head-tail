const { firstNElements } = require('../src/headLib.js');

const assert = require('assert');

describe('firstNElements', () => {
  it('Should return 1 line', () => {
    assert.strictEqual(firstNElements('hello\nbye', '\n', 1), 'hello');
  });

  it('Should return multiple lines', () => {
    assert.strictEqual(firstNElements('hello\nbye\nhi', '\n', 2), 'hello\nbye');
  });

  it('Should return given lines having empty line', () => {
    assert.strictEqual(firstNElements('', '\n', 1), '');
    assert.strictEqual(firstNElements('hello\n', '\n', 2), 'hello\n');
    assert.strictEqual(firstNElements('hello\n\nbye', '\n', 3), 'hello\n\nbye');
  });

  it('Should return 1 byte', () => {
    assert.strictEqual(firstNElements('ab', '', 1), 'a');
  });

  it('Should return multiple bytes', () => {
    assert.strictEqual(firstNElements('abc', '', 2), 'ab');
  });

  it('Should return given bytes having empty lines', () => {
    assert.strictEqual(firstNElements('a\n', '', 1), 'a');
    assert.strictEqual(firstNElements('a\nb', '', 2), 'a\n');
    assert.strictEqual(firstNElements('a\nb', '', 3), 'a\nb');
  });

  it('Should return given bytes having spaces', () => {
    assert.strictEqual(firstNElements('a ', '', 1), 'a');
    assert.strictEqual(firstNElements('a b', '', 2), 'a ');
    assert.strictEqual(firstNElements('a b', '', 3), 'a b');
  });
});
