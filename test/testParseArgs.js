const { parseArgs } = require('../src/paresArgs.js');

const assert = require('assert');

describe('parseArgs', () => {
  it('Should return parameters of overridden -c -c', () => {
    assert.deepStrictEqual(parseArgs(['-c', 2, '-c', 1, 'a\nb\nc']),
      { fileContents: ['a\nb\nc'], option: '-c', value: 1 });
  });

  it('Should return parameters of overridden -n -n', () => {
    assert.deepStrictEqual(parseArgs(['-n', 2, '-n', 1, 'a\nb\nc']),
      { fileContents: ['a\nb\nc'], option: '-n', value: 1 });
  });

  it('Should return parameters when only fileName is given', () => {
    assert.deepStrictEqual(parseArgs(['a\nb\nc']),
      { option: '-c-n', value: 10, fileContents: ['a\nb\nc'] });
  });
});
