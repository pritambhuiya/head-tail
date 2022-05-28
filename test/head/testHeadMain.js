const { headMain } = require('../../src/head/headLib.js');
const assert = require('assert');

const shouldReturn = (expectedFiles) => {
  let index = 0;
  return (actualFileName, encoding) => {
    assert.strictEqual(actualFileName, expectedFiles[index].fileName);
    assert.strictEqual(encoding, 'utf8');

    const content = expectedFiles[index].content;
    index++;
    return content;
  };
};

describe('headMain', () => {
  it('Should work for single file, no option given', () => {
    const mockedReadFileSync = shouldReturn(
      [{ fileName: 'file1.txt', content: 'hello' }]);

    assert.strictEqual(headMain(mockedReadFileSync, 'file1.txt'), 'hello');
  });

  it('Should work for single file, with option', () => {
    const mockedReadFileSync = shouldReturn(
      [{ fileName: 'file1.txt', content: 'hello' }]);

    assert.strictEqual(headMain(mockedReadFileSync, '-c', '3', 'file1.txt'),
      'hel');
  });

  it('Should work if option & value are together', () => {
    const mockedReadFileSync = shouldReturn(
      [{ fileName: 'file1.txt', content: 'hello' }]);

    assert.strictEqual(headMain(mockedReadFileSync, '-c2', 'file1.txt'), 'he');
  });

  it('Should work for multi-contents', () => {
    const mockedReadFileSync = shouldReturn(
      [
        { fileName: 'file1.txt', content: 'hello' },
        { fileName: 'file2.txt', content: 'bye' }
      ]);

    assert.strictEqual(headMain(mockedReadFileSync, 'file1.txt', 'file2.txt'),
      '==> file1.txt <==\nhello\n==> file2.txt <==\nbye');
  });

  it('Should show usage when wrong option is encountered', () => {
    const mockedReadFileSync = shouldReturn({ 'file1.txt': 'hello' });

    assert.throws(() => headMain(mockedReadFileSync, '-a', '1', 'file1.txt'),
      { name: 'head', message: 'illegal option -- -a', option: '--help' });
  });

  it('Should throw error because of -c & -n', () => {
    const mockedReadFileSync = shouldReturn('file1.txt', 'hello');

    assert.throws(() => headMain(mockedReadFileSync, '-c1', '-n2', 'file1.txt'),
      { name: 'head', message: 'can\'t combine line and byte counts' });
  });

  it('Should throw error because of 0 as value', () => {
    const mockedReadFileSync = shouldReturn('file1.txt', 'hello');

    assert.throws(() => headMain(mockedReadFileSync, '-c0', 'file1.txt'),
      { name: 'head', message: 'illegal byte count -- 0' });
  });

  it('Should throw contents & errors while reading files', () => {
    const mockedReadFileSync = shouldReturn('file1.txt', 'hello');

    assert.throws(() => headMain(mockedReadFileSync, 'file2.txt'),
      { name: 'FileRead Error', message: 'Can\'t read file' });
  });
});
