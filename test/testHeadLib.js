const { head, getDelimiter, contentsUpto } = require('../src/headLib.js');
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

  it('Should return 1 byte', () => {
    assert.strictEqual(head('a', { maxbytes: 0, maxBytes: 1 }), 'a');
    assert.strictEqual(head('ab', { maxbytes: 0, maxBytes: 1 }), 'a');
  });

  it('Should return multiple bytes', () => {
    assert.strictEqual(head('ab', { maxbytes: 0, maxBytes: 2 }), 'ab');
    assert.strictEqual(head('abc', { maxbytes: 0, maxBytes: 2 }), 'ab');
  });

  it('Should return given bytes having empty lines', () => {
    assert.strictEqual(head('\n', { maxLines: 0, maxBytes: 1 }), '\n');
    assert.strictEqual(head('a\n', { maxLines: 0, maxBytes: 1 }), 'a');
    assert.strictEqual(head('a\n', { maxLines: 0, maxBytes: 2 }), 'a\n');
    assert.strictEqual(head('a\n\b', { maxLines: 0, maxBytes: 2 }), 'a\n');
    assert.strictEqual(head('a\n\b', { maxLines: 0, maxBytes: 3 }), 'a\n\b');
  });

  it('Should return given bytes having empty lines', () => {
    assert.strictEqual(head(' ', { maxLines: 0, maxBytes: 1 }), ' ');
    assert.strictEqual(head('a ', { maxLines: 0, maxBytes: 1 }), 'a');
    assert.strictEqual(head('a ', { maxLines: 0, maxBytes: 2 }), 'a ');
    assert.strictEqual(head('a b', { maxLines: 0, maxBytes: 2 }), 'a ');
    assert.strictEqual(head('a b', { maxLines: 0, maxBytes: 3 }), 'a b');
  });
});

describe('getDelimiter', () => {
  it('Should return \\n for key maxLines', () => {
    assert.strictEqual(getDelimiter('maxLines'), '\n');
  });

  it('Should return \'\' for key maxBytes', () => {
    assert.strictEqual(getDelimiter('maxBytes'), '');
  });
});

describe('contentsUpto', () => {
  it('Should return 1 element', () => {
    assert.deepStrictEqual(contentsUpto(['a'], 1), ['a']);
    assert.deepStrictEqual(contentsUpto(['ab'], 1), ['ab']);
    assert.deepStrictEqual(contentsUpto(['a', 'b'], 1), ['a']);
  });

  it('Should return multiple elements', () => {
    assert.deepStrictEqual(contentsUpto(['a', 'b'], 2), ['a', 'b']);
    assert.deepStrictEqual(contentsUpto(['a', 'b', 'c'], 2), ['a', 'b']);
  });

  it('Should return all elements when upto is greater then elements', () => {
    assert.deepStrictEqual(contentsUpto(['a'], 2), ['a']);
    assert.deepStrictEqual(contentsUpto(['a', 'b'], 3), ['a', 'b']);
  });
});
