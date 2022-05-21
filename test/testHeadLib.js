const { contentsUpto, parseArgs, head } = require('../src/headLib.js');
const assert = require('assert');

describe('contentsUpto', () => {
  it('Should return 1 element', () => {
    assert.deepStrictEqual(contentsUpto(['a'], 1), ['a']);
    assert.deepStrictEqual(contentsUpto(['a', 'b'], 1), ['a']);
  });

  it('Should return multiple elements', () => {
    assert.deepStrictEqual(contentsUpto(['a', 'b'], 2), ['a', 'b']);
    assert.deepStrictEqual(contentsUpto(['a', 'b', 'c'], 2), ['a', 'b']);
  });

  it('Should return all elements when upto is greater then elements', () => {
    assert.deepStrictEqual(contentsUpto(['a'], 2), ['a']);
    assert.deepStrictEqual(contentsUpto(['a', 'b'], 3), ['a', 'b']);
  });
});

describe('parseArgs', () => {
  it('Should return parameters of overridden -c -c', () => {
    assert.deepStrictEqual(parseArgs(['-c', 2, '-c', 1, 'a\nb\nc']),
      { fileContents: 'a\nb\nc', options: { bytes: 1, lines: 0 } });
  });

  it('Should return parameters of overridden -n -n', () => {
    assert.deepStrictEqual(parseArgs(['-n', 2, '-n', 1, 'a\nb\nc']),
      { fileContents: 'a\nb\nc', options: { bytes: 0, lines: 1 } });
  });

  it('Should return parameters when only fileName is given', () => {
    assert.deepStrictEqual(parseArgs(['a\nb\nc']),
      { fileContents: 'a\nb\nc', options: { bytes: 0, lines: 0 } });
  });
});

describe('head', () => {
  it('Should work on overridden -c', () => {
    assert.deepStrictEqual(head('-c', 2, '-c', 1, 'a\nb\nc'), 'a');
  });

  it('Should work on overridden -n', () => {
    assert.deepStrictEqual(head('-n', 2, '-n', 1, 'a\nb\nc'), 'a');
  });

  it('Should return all contets when only contents is given', () => {
    assert.deepStrictEqual(head('a\nb\nc'), 'a\nb\nc');
  });
});
