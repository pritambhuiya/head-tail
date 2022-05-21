const { headMain } = require('../src/headLib.js');
const assert = require('assert');

const shouldReturn = (mockFile, content) => {
  return function (fileName, encoding) {
    assert.equal(mockFile, fileName);
    assert.equal(encoding, 'utf8');
    return content;
  };
};

describe('headMain', () => {
  it('Should work for single file, no option given', () => {
    const mockReadFileSync = shouldReturn('file1.txt', 'hello');
    assert.strictEqual(headMain(mockReadFileSync, 'file1.txt'), 'hello');
  });

  it('Should work for single file, with option', () => {
    const mockReadFileSync = shouldReturn('file1.txt', 'he');
    assert.strictEqual(headMain(mockReadFileSync, '-c', '2', 'file1.txt'),
      'he');
  });

  it.skip('Should work for multi-contents', () => {
    assert.strictEqual(headMain('test/file1.txt', 'test/file2.txt'),
      'a\nb\nc,a\nb');
  });
});
