/* eslint-disable max-statements */

const updateParameters = ({ option, value }, key, limit) => {
  if (limit === 0) {
    throw { message: 'Illegal count 0' };
  }

  let parameters = { option, value };
  if (option.includes(key)) {
    parameters = { option: key, value: limit };
  }
  return parameters;
};

const parseArgs = (args) => {
  const fileContents = [];
  let parameters = { option: '-c-n', value: 10 };
  let index = 0;

  while (index < args.length) {
    const key = args[index];
    if (key.startsWith('-')) {
      parameters = updateParameters(parameters, key, args[index + 1]);
      index++;
    }

    if (!isFinite(args[index])) {
      fileContents.push(args[index]);
    }
    index++;
  }

  parameters.fileContents = fileContents;
  return parameters;
};

exports.parseArgs = parseArgs;
