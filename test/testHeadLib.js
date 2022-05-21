const { contentsUpto, head } = require('../src/headLib.js');
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

describe('head', () => {
  it('Should work on overridden -c', () => {
    assert.deepStrictEqual(head(['a\nb\nc'], '', 1), ['a']);
  });

  it('Should work on overridden -n', () => {
    assert.deepStrictEqual(head(['a\nb\nc'], '\n', 1), ['a']);
  });

  it('Should return all contets when only contents is given', () => {
    assert.deepStrictEqual(head(['a\nb\nc'], '\n', 10), ['a\nb\nc']);
  });

  it('Should work for multi-contents', () => {
    assert.deepStrictEqual(head(['a\nb\nc', 'a\nb'], '\n', 10),
      ['a\nb\nc', 'a\nb']);
  });
});
