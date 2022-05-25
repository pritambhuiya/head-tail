const { tail, tailMain } = require('../../src/tail/tailLib.js');
const assert = require('assert');

describe('tail', () => {
  it('Should return last line', () => {
    assert.strictEqual(tail('hello', 'lines', 1), 'hello');
  });

  it('Should return given number of lines from end', () => {
    assert.strictEqual(tail('hello\nbye\nhi', 'lines', 2), 'bye\nhi');
  });
});

describe('tailMain', () => {
  it('Should return last line', () => {
    assert.strictEqual(tailMain('hello', '-n', 1), 'hello');
  });
});
