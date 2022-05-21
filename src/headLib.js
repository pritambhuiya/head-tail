/* eslint-disable complexity */
const split = (contents, seperator) => contents.split(seperator);

const join = (contents, delimiter) => contents.join(delimiter);

const contentsUpto = (contents, upto) => contents.slice(0, upto);

const firstNElements = (fileContents, { lines, bytes }) => {
  const upto = lines || bytes;
  const delimiter = bytes ? '' : '\n';
  const contents = split(fileContents, delimiter);
  const requiredContents = contentsUpto(contents, upto);

  return join(requiredContents, delimiter);
};

// eslint-disable-next-line max-statements
const parseArgs = (args) => {
  const switches = {
    '-n': { name: 'lines', value: 0 },
    '-c': { name: 'bytes', value: 0 }
  };

  const parameters = { options: { lines: 0, bytes: 0 } };
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

const areBothValuesSet = ({ lines, bytes }) => lines && bytes;

const areBothValuesZero = ({ lines, bytes }) => !(lines || bytes);

const setDefault = (options) => {
  if (areBothValuesZero(options)) {
    options.lines = 10;
  }
  return options;
};

const head = (...args) => {
  const { fileContents, options } = parseArgs(args);

  if (areBothValuesSet(options)) {
    throw { message: 'Can not handle -n & -c.' };
  }

  setDefault(options);
  return firstNElements(fileContents, options);
};

exports.firstNElements = firstNElements;
exports.contentsUpto = contentsUpto;
exports.parseArgs = parseArgs;
exports.head = head;
