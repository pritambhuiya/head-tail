const { headMain } = require('../src/headLib.js');
const assert = require('assert');

const shouldReturn = (mockFiles) => {
  return (fileName, encoding) => {
    assert.strictEqual(encoding, 'utf8');
    return mockFiles[fileName];
  };
};

describe('headMain', () => {
  it('Should work for single file, no option given', () => {
    const mockReadFileSync = shouldReturn({ 'file1.txt': 'hello' });
    assert.strictEqual(headMain(mockReadFileSync, 'file1.txt'), 'hello');
  });

  it('Should work for single file, with option', () => {
    const mockReadFileSync = shouldReturn({ 'file1.txt': 'hello' });
    assert.strictEqual(headMain(mockReadFileSync, '-c', '2', 'file1.txt'),
      'he');
  });

  it('Should work for multi-contents', () => {
    const mockReadFileSync = shouldReturn(
      { 'file1.txt': 'hello', 'file2.txt': 'bye' });
    assert.strictEqual(headMain(mockReadFileSync, 'file1.txt', 'file2.txt'),
      '==> file1.txt <==\nhello\n==> file2.txt <==\nbye');
  });
});
