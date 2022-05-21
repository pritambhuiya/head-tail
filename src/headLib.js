/* eslint-disable complexity */
const split = (contents, seperator) => contents.split(seperator);

const join = (contents, delimiter) => contents.join(delimiter);

const contentsUpto = (contents, upto) => contents.slice(0, upto);

const firstNElements = (fileContents, { maxLines, maxBytes }) => {
  const upto = maxLines || maxBytes;
  const delimiter = maxBytes ? '' : '\n';
  const contents = split(fileContents, delimiter);
  const requiredContents = contentsUpto(contents, upto);

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

const areBothValuesSet = ({ maxLines, maxBytes }) => maxLines && maxBytes;

const head = (...args) => {
  const { fileContents, options } = parseArgs(args);

  if (areBothValuesSet(options)) {
    throw { message: 'Can not handle -n & -c.' };
  }

  return firstNElements(fileContents, options);
};

exports.firstNElements = firstNElements;
exports.contentsUpto = contentsUpto;
exports.parseArgs = parseArgs;
exports.head = head;
