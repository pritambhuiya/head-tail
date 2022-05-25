const { tail, tailMain } = require('../../src/tail/tailLib.js');
const assert = require('assert');

describe('tail', () => {
  it('Should return last line', () => {
    assert.strictEqual(tail('hello', 'lines', '1'), 'hello');
  });

  it('Should return given number of lines from end', () => {
    assert.strictEqual(tail('hello\nbye\nhi', 'lines', '2'), 'bye\nhi');
  });

  it('Should return given number of bytes from end', () => {
    assert.strictEqual(tail('hello', 'bytes', '1'), 'o');
  });

  it('Should return given number of bytes from end including \\n', () => {
    assert.strictEqual(tail('hello\n', 'bytes', '1'), '\n');
  });

  it('Should return given number of bytes from end including space', () => {
    assert.strictEqual(tail('hello ', 'bytes', '1'), ' ');
  });

  it('Should return given number of bytes from end for +', () => {
    assert.strictEqual(tail('hello', 'bytes', '+2'), 'ello');
  });

  it('Should return given number of lines from end for +', () => {
    assert.strictEqual(tail('hello', 'lines', '+1'), 'hello');
  });
});

describe('tailMain', () => {
  it('Should return last line for -n', () => {
    assert.strictEqual(tailMain('hello', '-n', '1'), 'hello');
  });

  it('Should return last byte for -c', () => {
    assert.strictEqual(tailMain('hello', '-c', '1'), 'o');
  });

  it('Should return given number of lines from end for +', () => {
    assert.strictEqual(tailMain('hello', '-n', '+1'), 'hello');
  });

  it('Should return given number of bytes from end for -', () => {
    assert.strictEqual(tailMain('hello', '-c', '-2'), 'lo');
  });
});
