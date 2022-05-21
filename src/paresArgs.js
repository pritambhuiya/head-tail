/* eslint-disable max-statements */

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

exports.parseArgs = parseArgs;
