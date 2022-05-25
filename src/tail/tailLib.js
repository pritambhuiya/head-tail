const { split, join } = require('../../src/head/headLib.js');

const contentsFrom = (contents, from) => contents.slice(from);

const tail = (fileContents, from) => {
  const contents = split.lines(fileContents);
  const index = contents.length - from;
  const requiredContents = contentsFrom(contents, index);

  return join.lines(requiredContents);
};

exports.tail = tail;
