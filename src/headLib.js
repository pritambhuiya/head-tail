const { parseArgs } = require('./paresArgs.js');

const split = (contents, seperator) => contents.split(seperator);

const join = (contents, delimiter) => contents.join(delimiter);

const contentsUpto = (contents, upto) => contents.slice(0, upto);

const firstNElements = (fileContents, { lines, bytes }) => {
  const upto = lines || bytes;
  const delimiter = bytes ? '' : '\n';

  const contents = split(fileContents, delimiter);
  const requiredContents = contentsUpto(contents, upto);

  return join(requiredContents, delimiter);
};

const areBothValuesSet = ({ lines, bytes }) => lines && bytes;

const areBothValuesZero = ({ lines, bytes }) => !(lines || bytes);

const setDefault = (options) => {
  if (areBothValuesZero(options)) {
    options.lines = 10;
  }
  return options;
};

const head = (...args) => {
  const { fileContents, options } = parseArgs(args);

  if (areBothValuesSet(options)) {
    throw { message: 'Can not handle -n & -c.' };
  }

  setDefault(options);
  return firstNElements(fileContents, options);
};

exports.firstNElements = firstNElements;
exports.contentsUpto = contentsUpto;
exports.head = head;
