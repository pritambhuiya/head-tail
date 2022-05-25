const { split, join } = require('../../src/head/headLib.js');

const contentsFrom = (contents, from) => contents.slice(from);

const decideStrategy = (option) => option === '-n' ? 'lines' : 'bytes';

const getIndex = (contents, contentsFrom) => contents.length - contentsFrom;

const tail = (fileContents, strategy, from) => {
  const contents = split[strategy](fileContents);
  const index = getIndex(contents, from);
  const requiredContents = contentsFrom(contents, index);

  return join.lines(requiredContents);
};

const tailMain = (fileContents, option, from) => {
  const strategy = decideStrategy(option);
  return tail(fileContents, strategy, from);
};

exports.tail = tail;
exports.tailMain = tailMain;
