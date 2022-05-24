const { parseArgs } = require('../src/paresArgs.js');

const assert = require('assert');

describe('parseArgs', () => {
  it('Should return parameters of overridden -c -c', () => {
    assert.deepStrictEqual(parseArgs(['-c', '2', '-c', '1', 'a\nb\nc']),
      { option: '-c', value: '1', filePaths: ['a\nb\nc'] });
  });

  it('Should return parameters of overridden -n -n', () => {
    assert.deepStrictEqual(parseArgs(['-n', 2, '-n', 1, 'a\nb\nc']),
      { filePaths: ['a\nb\nc'], option: '-n', value: 1 });
  });

  it('Should return parameters when only fileName is given, option: -n', () => {
    assert.deepStrictEqual(parseArgs(['a\nb\nc']),
      { option: '-n', value: 10, filePaths: ['a\nb\nc'] });
  });

  it('Should return files name, option: -n', () => {
    assert.deepStrictEqual(parseArgs(['file1.txt']),
      { option: '-n', value: 10, filePaths: ['file1.txt'] });
  });

  it('Should throw error because of 0', () => {
    assert.throws(() => parseArgs(['-c', '0', '-n', '1', 'a\nb\nc']),
      { name: 'head', message: 'illegal byte count -- 0' });
  });

  it('Should throw error because of negative limit', () => {
    assert.throws(() => parseArgs(['-c', '-1', '-n', '1', 'a\nb\nc']),
      { name: 'head', message: 'illegal byte count -- -1' });
  });

  it('Should throw error because of -c & -n', () => {
    assert.throws(() => parseArgs(['-c', '1', '-n', '1', 'a\nb\nc']),
      { name: 'head', message: 'can\'t combine line and byte counts' });
  });

  it('Should return parameters, option: --help', () => {
    assert.throws(() => parseArgs(['-a', '1', 'file1.txt']),
      { name: 'head', message: 'illegal option -- -a', code: '--help' });
  });

  it('Should throw error because of no arguments', () => {
    assert.throws(() => parseArgs([]),
      { name: 'FileRead Error', message: 'Can\'t read file' });
  });
});
