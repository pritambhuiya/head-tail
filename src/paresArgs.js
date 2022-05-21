/* eslint-disable max-statements */

const mapOptionToWord = ({ option }) => option === '-c' ? 'bytes' : 'lines';

const updateParameters = ({ option, value }, key, argument) => {
  if (argument === 0) {
    throw { message: 'Illegal count 0' };
  }
  let parameters = { option, value };

  if (option.includes(key)) {
    parameters = { option: key, value: argument };
  }
  return parameters;
};

const parseArgs = (args) => {
  let parameters = { option: '-c-n', value: 10 };
  let index = 0;

  while (index < args.length) {
    const key = args[index];
    if (key.startsWith('-')) {
      parameters = updateParameters(parameters, key, args[index + 1]);
      index++;
    }

    parameters.fileContents = key;
    index++;
  }

  parameters.option = mapOptionToWord(parameters);
  return parameters;
};

exports.parseArgs = parseArgs;
