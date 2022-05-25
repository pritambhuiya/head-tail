const { split, join } = require('../../src/head/headLib.js');

const decideStrategy = (option) => option === '-n' ? 'lines' : 'bytes';

const formatNumber = (number) => number.includes('-') ? `${-number}` : number;

const decideIndex = (contents, from) =>
  from.includes('+') ? from - 1 : contents.length - from;

const contentsFrom = (contents, from) => contents.slice(from);

const tail = (fileContents, strategy, from) => {
  const contents = split[strategy](fileContents);
  const index = decideIndex(contents, from);
  const requiredContents = contentsFrom(contents, index);

  return join[strategy](requiredContents);
};

const tailMain = (fileContents, option, from) => {
  const formattedFrom = formatNumber(from);
  const strategy = decideStrategy(option);
  return tail(fileContents, strategy, formattedFrom);
};

exports.tail = tail;
exports.tailMain = tailMain;
