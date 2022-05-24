/* eslint-disable max-statements */
const isOption = (arg) => arg.startsWith('-');

const isOptionNotValid = (flag) => !['-c', '-n'].includes(flag);

const validateOption = ({ flag }) => {
  if (isOptionNotValid(flag)) {
    throw {
      name: 'head', message: `illegal option -- ${flag}`, option: '--help'
    };
  }
};

const validateLimit = ({ flag, count }) => {
  if (count <= 0 || !isFinite(count)) {
    const option = flag === '-c' ? 'byte' : 'line';
    throw { name: 'head', message: `illegal ${option} count -- ${count}` };
  }
};

const validateDifferentOptions = ([firstOption, ...restOptions]) => {
  return restOptions.reduce((firstOption, option) => {
    if (option !== firstOption) {
      throw { name: 'head', message: 'can\'t combine line and byte counts' };
    }
    return firstOption;
  }, firstOption);
};

const validateOptionAndLimit = (flagCountPair, parsedArguments) => {
  validateOption(flagCountPair);
  validateLimit(flagCountPair);

  parsedArguments.option = flagCountPair.flag;
  parsedArguments.limit = flagCountPair.count;
};

const hasFileEncountered = ({ filePaths }) => filePaths.length !== 0;

const getAllFilePaths = (args, index) => args.slice(index);

const parseArgs = (args) => {
  let index = 0;
  const options = [];
  const parsedArguments = { option: '-n', limit: 10, filePaths: [] };

  while (!hasFileEncountered(parsedArguments)) {
    if (isOption(args[index])) {
      const flagCountPair = { flag: args[index], count: args[index + 1] };
      validateOptionAndLimit(flagCountPair, parsedArguments);
      options.push(args[index]);
      index++;

    } else {
      parsedArguments.filePaths.push(args[index]);
    }
    index++;
  }

  const filePaths = getAllFilePaths(args, index);
  parsedArguments.filePaths.push(...filePaths);
  validateDifferentOptions(options);
  return parsedArguments;
};

exports.parseArgs = parseArgs;
