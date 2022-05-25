const { headMain } = require('../../src/head/headLib.js');
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

  it('Should show usage when wrong option is encountered', () => {
    const mockReadFileSync = shouldReturn({ 'file1.txt': 'hello' });
    assert.throws(() => headMain(mockReadFileSync, '-a', '1', 'file1.txt'),
      { name: 'head', message: 'illegal option -- -a', option: '--help' });
  });

  it('Should work if option & value are together', () => {
    const mockReadFileSync = shouldReturn({ 'file1.txt': 'hello' });
    assert.strictEqual(headMain(mockReadFileSync, '-c2', 'file1.txt'),
      'he');
  });

  it('Should return undefined because of -c & -n', () => {
    const mockReadFileSync = shouldReturn('file1.txt', 'hello');
    assert.throws(() => headMain(mockReadFileSync, '-c1', '-n2', 'file1.txt'),
      { name: 'head', message: 'can\'t combine line and byte counts' });
  });

  it('Should return undefined because of 0 as value', () => {
    const mockReadFileSync = shouldReturn('file1.txt', 'hello');
    assert.throws(() => headMain(mockReadFileSync, '-c0', 'file1.txt'),
      { name: 'head', message: 'illegal byte count -- 0' });
  });

  it.skip('Should throw contents & errors while reading files', () => {
    const mockReadFileSync = shouldReturn('file1.txt', 'hello');
    assert.throws(() => headMain(mockReadFileSync, 'file2.txt'),
      { name: 'FileReadError', message: 'Unable to read missing.txt' });
  });
});
