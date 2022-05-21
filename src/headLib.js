/* eslint-disable complexity */
const split = (contents, seperator) => contents.split(seperator);

const join = (contents, delimiter) => contents.join(delimiter);

const getKey = (object) => Object.keys(object);

const getValue = (object) => Object.values(object);

const contentsUpto = (contents, upto) => contents.slice(0, upto);

const getDelimiter = (key) => {
  const delimiter = { 'maxLines': '\n', 'maxBytes': '' };
  return delimiter[key];
};

const firstNElements = (fileContents, { maxLines, maxBytes }) => {
  const option = maxBytes ? { maxBytes } : { maxLines };
  const delimiter = getDelimiter(getKey(option));
  const contents = split(fileContents, delimiter);
  const requiredContents = contentsUpto(contents, getValue(option));

  return join(requiredContents, delimiter);
};

// eslint-disable-next-line max-statements
const parseArgs = (args) => {
  const switches = {
    '-n': { name: 'maxLines', value: 0 },
    '-c': { name: 'maxBytes', value: 0 }
  };

  const parameters = { options: { maxLines: 0, maxBytes: 0 } };
  for (let index = 0; index < args.length; index++) {
    if (args[index].startsWith('-')) {

      if (args[index + 1] === 0) {
        throw { message: 'Illegal count 0' };
      }

      const option = switches[args[index]].name;
      parameters.options[option] = args[index + 1];
      index++;
    }
    parameters.fileContents = args[index];
  }
  return parameters;
};

const head = (...args) => {
  const { fileContents, options } = parseArgs(args);
  if (options.maxLines && options.maxBytes) {
    throw { message: 'Can not handle -n & -c.' };
  }

  if (options.maxLines === 0 && options.maxBytes === 0) {
    options.maxLines = 10;
  }

  return firstNElements(fileContents, options);
};

exports.firstNElements = firstNElements;
exports.getDelimiter = getDelimiter;
exports.contentsUpto = contentsUpto;
exports.parseArgs = parseArgs;
exports.head = head;
