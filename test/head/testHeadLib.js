const { seperateArgs, formatContents, contentsUpto, head } =
  require('../../src/head/headLib.js');
const assert = require('assert');

describe('formatContents', () => {
  it('Should not format fileName if only one file is present', () => {
    assert.deepStrictEqual(formatContents(['a\nb'], ['file1.txt']), ['a\nb']);
  });

  it('Should format fileName if multiple files are present', () => {
    assert.deepStrictEqual(formatContents(['a\nb', 'a b'], ['a.txt', 'b.txt']),
      ['==> a.txt <==', 'a\nb', '==> b.txt <==', 'a b']);
  });
});

describe('seperateArgs', () => {
  it('Should seperate values form option if together', () => {
    assert.deepStrictEqual(seperateArgs(['-n5']), ['-n', '5']);
  });

  it('Should not seperate values form option if not-together', () => {
    assert.deepStrictEqual(seperateArgs(['-n', '5']), ['-n', '5']);
  });

  it('Should not care if option & value together or not', () => {
    assert.deepStrictEqual(seperateArgs(['-n5', '-c', '5', 'file.txt']),
      ['-n', '5', '-c', '5', 'file.txt']);
  });
});

describe('contentsUpto', () => {
  it('Should return 1 element', () => {
    assert.deepStrictEqual(contentsUpto(['a'], 1), ['a']);
    assert.deepStrictEqual(contentsUpto(['a', 'b'], 1), ['a']);
  });

  it('Should return multiple elements', () => {
    assert.deepStrictEqual(contentsUpto(['a', 'b'], 2), ['a', 'b']);
    assert.deepStrictEqual(contentsUpto(['a', 'b', 'c'], 2), ['a', 'b']);
  });

  it('Should return all elements when limit is greater then elements', () => {
    assert.deepStrictEqual(contentsUpto([], 2), []);
    assert.deepStrictEqual(contentsUpto(['a'], 3), ['a']);
    assert.deepStrictEqual(contentsUpto(['a', 'b'], 3), ['a', 'b']);
  });
});

describe('head', () => {
  it('Should return contents for option -c', () => {
    assert.deepStrictEqual(head(['a\nb\nc'], '-c', 1), ['a']);
  });

  it('Should return contents for option -n', () => {
    assert.deepStrictEqual(head(['a\nb\nc'], '-n', 1), ['a']);
  });

  it('Should work for multi-contents', () => {
    assert.deepStrictEqual(head(['a\nb\nc', 'a\nb'], '-n', 10),
      ['a\nb\nc', 'a\nb']);
  });
});
