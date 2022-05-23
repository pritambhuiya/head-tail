const { parseArgs } = require('../src/paresArgs.js');

const assert = require('assert');

describe('parseArgs', () => {
  it('Should return parameters of overridden -c -c', () => {
    assert.deepStrictEqual(parseArgs(['-c', 2, '-c', 1, 'a\nb\nc']),
      { filePaths: ['a\nb\nc'], option: '-c', value: 1 });
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

  it('Should return parameters, option: --help', () => {
    assert.deepStrictEqual(parseArgs(['-a', 2, 'a\nb\nc']),
      { filePaths: ['a\nb\nc'], option: '--help' });
  });

  it('Should throw error because of 0', () => {
    assert.throws(() => parseArgs(['-c', '0', '-n', '1', 'a\nb\nc']),
      { name: 'Parse error', message: 'Illegal count 0' });
  });

  it('Should throw error because of -c & -n', () => {
    assert.throws(() => parseArgs(['-c', '1', '-n', '1', 'a\nb\nc']),
      { name: 'Parse error', message: 'Can\'t work on -c & -n' });
  });

});
