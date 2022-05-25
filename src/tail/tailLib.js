const { split, join } = require('../../src/head/headLib.js');

const decideStrategy = (option) => option === '-n' ? 'lines' : 'bytes';

const isMinusPresent = (letters,) => letters.includes('-');

const isPlusPresent = (letters,) => letters.includes('+');

const formatLimit = (limit) => isMinusPresent(limit) ? `${-limit}` : limit;

const decideIndex = (contents, limit) =>
  isPlusPresent(limit) ? limit - 1 : contents.length - limit;

const contentsFrom = (contents, index) => contents.slice(index);

const tail = (fileContents, strategy, limit) => {
  const contents = split[strategy](fileContents);
  const index = decideIndex(contents, limit);
  const requiredContents = contentsFrom(contents, index);

  return join[strategy](requiredContents);
};

const tailMain = (fileContents, option, limit) => {
  const formattedLimit = formatLimit(limit);
  const strategy = decideStrategy(option);
  return tail(fileContents, strategy, formattedLimit);
};

exports.tail = tail;
exports.tailMain = tailMain;
