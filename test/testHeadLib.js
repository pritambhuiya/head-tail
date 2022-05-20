const { getDelimiter, contentsUpto, parseArgs, headMain } = require('../src/headLib.js');
const assert = require('assert');

describe('getDelimiter', () => {
  it('Should return \\n for key maxLines', () => {
    assert.strictEqual(getDelimiter('maxLines'), '\n');
  });

  it('Should return \'\' for key maxBytes', () => {
    assert.strictEqual(getDelimiter('maxBytes'), '');
  });
});

describe('contentsUpto', () => {
  it('Should return 1 element', () => {
    assert.deepStrictEqual(contentsUpto(['a'], 1), ['a']);
    assert.deepStrictEqual(contentsUpto(['ab'], 1), ['ab']);
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
  it('Should return maxLines when args is -n', () => {
    assert.strictEqual(parseArgs('-n'), 'maxLines');
  });

  it('Should return maxBytes when args is -c', () => {
    assert.strictEqual(parseArgs('-c'), 'maxBytes');
  });
});

describe('headMain', () => {
  it('Should return first 2 lines when switch is -n', () => {
    assert.strictEqual(headMain('a\nb\nc', '-n', 2), 'a\nb');
  });

  it('Should return first 2 bytes when switch is -c', () => {
    assert.strictEqual(headMain('a\nb\nc', '-c', 2), 'a\n');
  });
});
