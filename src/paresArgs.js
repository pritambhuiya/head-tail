/* eslint-disable complexity */
/* eslint-disable max-statements */

const updateParameters = ({ option }, key, limit) => {
  const switches = ['-n', '-c'];

  if (limit === 0) {
    throw { name: 'Parse error', message: 'Illegal count 0' };
  }

  if (!switches.includes(key)) {
    return { option: '--help' };
  }

  if (!option.includes(key)) {
    throw { name: 'Parse error', message: 'Can\'t work on -c & -n' };
  }
  return { option: key, value: limit };
};

const parseArgs = (args) => {
  const filePaths = [];
  let parameters = { option: '-c-n', value: 10 };
  let index = 0;

  while (index < args.length) {
    const key = args[index];
    if (key.startsWith('-')) {
      parameters = updateParameters(parameters, key, +args[index + 1]);
      index++;
    }

    if (!isFinite(args[index])) {
      filePaths.push(args[index]);
    }
    index++;
  }

  parameters.filePaths = filePaths;
  if (parameters.option === '-c-n') {
    parameters.option = '-n';
  }

  return parameters;
};

exports.parseArgs = parseArgs;
