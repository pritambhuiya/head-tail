const split = (contents, seperator) => contents.split(seperator);

const join = (contents, delimiter) => contents.join(delimiter);

const getKey = (object) => Object.keys(object);

const getValue = (object) => Object.values(object);

const contentsUpto = (contents, upto) => contents.slice(0, upto);

const getDelimiter = (key) => {
  const delimiter = { 'maxLines': '\n', 'maxBytes': '' };
  return delimiter[key];
};

const head = (fileContents, { maxLines, maxBytes }) => {
  const option = maxBytes ? { maxBytes } : { maxLines };
  const delimiter = getDelimiter(getKey(option));
  const contents = split(fileContents, delimiter);
  const requiredContents = contentsUpto(contents, getValue(option));

  return join(requiredContents, delimiter);
};

exports.head = head;
exports.getDelimiter = getDelimiter;
exports.contentsUpto = contentsUpto;
