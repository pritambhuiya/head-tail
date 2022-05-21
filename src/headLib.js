const { parseArgs } = require('./paresArgs.js');
const fs = require('fs');

const split = (contents, seperator) => contents.split(seperator);

const join = (contents, delimiter) => contents.join(delimiter);

const contentsUpto = (contents, upto) => contents.slice(0, upto);

const firstNElements = (fileContents, delimiter, upto) => {
  const contents = split(fileContents, delimiter);
  const requiredContents = contentsUpto(contents, upto);

  return join(requiredContents, delimiter);
};

const head = (fileContents, delimiter, value) => {
  return fileContents.map(content =>
    firstNElements(content, delimiter, value));
};

const headMain = (...args) => {
  const { filePaths, option, value } = parseArgs(args);
  const fileContents = fs.readFileSync(filePaths[0], 'utf8');

  const delimiter = option === '-c' ? '' : '\n';
  return head([fileContents], delimiter, value) + '';
};

exports.firstNElements = firstNElements;
exports.contentsUpto = contentsUpto;
exports.head = head;
exports.headMain = headMain;
