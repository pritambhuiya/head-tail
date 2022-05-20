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

const parseArgs = (args) => {
  const switches = { '-n': 'maxLines', '-c': 'maxBytes' };
  return switches[args];
};

const headMain = (fileContents, args, value) => {
  if (value === 0) {
    return; //throw error
  }

  const options = { maxLines: 10, maxBytes: 0 };
  options[parseArgs(args)] = value;
  return head(fileContents, options);
};

exports.head = head;
exports.getDelimiter = getDelimiter;
exports.contentsUpto = contentsUpto;
exports.parseArgs = parseArgs;
exports.headMain = headMain;
