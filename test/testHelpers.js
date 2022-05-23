const { formatContents, seperateArgs } = require('../src/helpers.js');

const assert = require('assert');

describe('formatContents', () => {
  it('Should not format fileName if only one file is present', () => {
    assert.deepStrictEqual(formatContents(['a\nb'], ['file1.txt']), ['a\nb']);
  });

  it('Should format fileName if only multiple files are present', () => {
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
