const { contentsUpto, headMain } = require('../src/headLib.js');

const assert = require('assert');

describe('contentsUpto', () => {
  it('Should return 1 element', () => {
    assert.deepStrictEqual(contentsUpto(['a'], 1), ['a']);
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

describe('headMain', () => {
  it('Should work on overridden -c', () => {
    assert.strictEqual(headMain('-c', 2, '-c', 1, 'a\nb\nc'), 'a');
  });

  it('Should work on overridden -n', () => {
    assert.strictEqual(headMain('-n', 2, '-n', 1, 'a\nb\nc'), 'a');
  });

  it('Should return all contets when only contents is given', () => {
    assert.strictEqual(headMain('a\nb\nc'), 'a\nb\nc');
  });

  it('Should work for multi-contents', () => {
    assert.strictEqual(headMain('a\nb\nc', 'a\nb'), 'a\nb\nc,a\nb');
  });
});
