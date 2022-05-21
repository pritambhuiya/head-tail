const setOptions = (option, value, parameters) => {
  const switches = {
    '-n': 'lines',
    '-c': 'bytes'
  };

  const key = switches[option];
  parameters.options[key] = value;
  return parameters;
};

const isValueZero = (value) => value === 0;

const parseArgs = (args) => {
  let parameters = { options: { lines: 0, bytes: 0 } };

  for (let index = 0; index < args.length; index++) {
    if (args[index].startsWith('-')) {

      if (isValueZero(args[index + 1])) {
        throw { message: 'Illegal count 0' };
      }

      parameters = setOptions(args[index], args[index + 1], parameters);
      index++;
    }

    parameters.fileContents = args[index];
  }
  return parameters;
};

exports.parseArgs = parseArgs;
