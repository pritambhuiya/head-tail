const assert = require('assert');

const lib = require('../../src/head/parseArgs.js');

const { parseArgs, validateCombination, validateOption, validateLimit }
  = lib;

describe('parseArgs', () => {
  it('Should return parameters of overridden -c -c', () => {
    assert.deepStrictEqual(parseArgs(['-c', '2', '-c', '1', 'a\nb\nc']),
      { option: '-c', limit: '1', filePaths: ['a\nb\nc'] });
  });

  it('Should return parameters of overridden -n -n', () => {
    assert.deepStrictEqual(parseArgs(['-n', 2, '-n', 1, 'a\nb\nc']),
      { filePaths: ['a\nb\nc'], option: '-n', limit: 1 });
  });

  it('Should return parameters when only fileName is given, option: -n', () => {
    assert.deepStrictEqual(parseArgs(['a\nb\nc']),
      { option: '-n', limit: 10, filePaths: ['a\nb\nc'] });
  });

  it('Should return files name, option: -n', () => {
    assert.deepStrictEqual(parseArgs(['file1.txt']),
      { option: '-n', limit: 10, filePaths: ['file1.txt'] });
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

  it('Should throw error because of invalid option, option: --help', () => {
    assert.throws(() => parseArgs(['-a', '1', 'file1.txt']),
      { name: 'head', message: 'illegal option -- -a', option: '--help' });
  });

  it('Should throw error because of invalid option & zero together', () => {
    assert.throws(() => parseArgs(['-a', '0', 'file1.txt']),
      { name: 'head', message: 'illegal option -- -a', option: '--help' });
  });

  it('Should throw error because of non-finite value', () => {
    assert.throws(() => parseArgs(['-a', 'b', 'file1.txt']),
      { name: 'head', message: 'illegal option -- -a', option: '--help' });
  });

  it('Should throw error because of -c1, -n2, -b3', () => {
    assert.throws(() => parseArgs(['-c', '1', '-n', '2', '-b', '3',
      'file1.txt']), {
      name: 'head', message: 'illegal option -- -b', option: '--help'
    });
  });
});

describe('validateCombination', () => {
  it('Should not throw error for same options', () => {
    assert.strictEqual(validateCombination(['-c', '-c']), undefined);
  });

  it('Should throw error for different options', () => {
    assert.throws(() => validateCombination(['-c', '-n']),
      { name: 'head', message: 'can\'t combine line and byte counts' });
  });
});

describe('validateOption', () => {
  it('Should not throw error for valid options', () => {
    assert.strictEqual(validateOption({ flag: '-c', count: '2' }), undefined);
  });

  it('Should throw error for invalid option', () => {
    assert.throws(() => validateOption({ flag: '-a', count: '2' }),
      { name: 'head', message: 'illegal option -- -a', option: '--help' });
  });

  it('Should throw error for invalid count', () => {
    assert.throws(() => validateLimit({ flag: '-c', count: '-a' }),
      { name: 'head', message: 'illegal byte count -- -a' });
  });
});

describe('validateLimit', () => {
  it('Should not throw error for valid limit', () => {
    assert.strictEqual(validateLimit({ flag: '-c', count: '2' }), undefined);
  });

  it('Should throw error for invalid limit', () => {
    assert.throws(() => validateLimit({ flag: '-c', count: '-a' }),
      { name: 'head', message: 'illegal byte count -- -a' });
  });
});
