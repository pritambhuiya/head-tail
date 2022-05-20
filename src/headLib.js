const split = (contents, seperator) => contents.split(seperator);

const join = (contents, delimiter) => contents.join(delimiter);

const contentsUpto = (contents, upto) => contents.slice(0, upto);

const getDelimiter = (key) => {
  const delimiter = { 'maxLines': '\n', 'maxBytes': '' };
  return delimiter[key];
};

const head = (contents, { maxLines, maxBytes }) => {
  const option = maxBytes === 0 ? { maxLines } : { maxBytes };
  const delimiter = getDelimiter(Object.keys(option));
  const contentsArray = split(contents, delimiter);
  const requiredContents = contentsUpto(contentsArray, Object.values(option));

  return join(requiredContents, delimiter);
};

exports.head = head;
