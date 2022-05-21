const { parseArgs } = require('./paresArgs.js');

const split = (contents, seperator) => contents.split(seperator);

const join = (contents, delimiter) => contents.join(delimiter);

const contentsUpto = (contents, upto) => contents.slice(0, upto);

const firstNElements = (fileContents, delimiter, upto) => {
  const contents = split(fileContents, delimiter);
  const requiredContents = contentsUpto(contents, upto);

  return join(requiredContents, delimiter);
};

const head = (...args) => {
  const { fileContents, option, value } = parseArgs(args);
  const delimiter = option === 'bytes' ? '' : '\n';

  return firstNElements(fileContents, delimiter, value);
};

exports.firstNElements = firstNElements;
exports.contentsUpto = contentsUpto;
exports.head = head;
