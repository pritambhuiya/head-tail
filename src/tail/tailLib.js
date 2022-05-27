const split = {
  lines: (contents) => contents.split('\n'),
  bytes: (contents) => contents.split('')
};

const join = {
  lines: (contents) => contents.join('\n'),
  bytes: (contents) => contents.join('')
};

const decideStrategy = (option) => option === '-n' ? 'lines' : 'bytes';

const isMinusPresent = (letters) => letters.startsWith('-');

const isPlusPresent = (letters) => letters.startsWith('+');

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
exports.formatLimit = formatLimit;
exports.decideIndex = decideIndex;
