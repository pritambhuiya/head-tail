/* eslint-disable max-statements */

const isOption = (arg) => arg.startsWith('-');

const isOptionNotValid = (flag) => !['-c', '-n'].includes(flag);

const validateLimit = ({ flag, count }) => {
  if (count <= 0 || !isFinite(count)) {
    const option = flag === '-c' ? 'byte' : 'line';
    throw { name: 'head', message: `illegal ${option} count -- ${count}` };
  }
};

const validateOption = ({ flag, count }) => {
  if (isOptionNotValid(flag)) {
    throw {
      name: 'head', message: `illegal option -- ${flag}`, option: '--help'
    };
  }

  validateLimit({ flag, count });
};

const validateCombination = ([firstOption, ...restOptions]) => {
  restOptions.forEach(option => {
    if (option !== firstOption) {
      throw { name: 'head', message: 'can\'t combine line and byte counts' };
    }
  });
};

const getAllFilePaths = (args, index) => args.slice(index);

const parseArgs = (args) => {
  let index = 0;
  const options = [];
  const parsedArguments = { option: '-n', limit: 10, filePaths: [] };

  while (isOption(args[index])) {
    const flagCountPair = { flag: args[index], count: args[index + 1] };
    validateOption(flagCountPair);

    parsedArguments.option = flagCountPair.flag;
    parsedArguments.limit = flagCountPair.count;

    options.push(args[index]);
    index += 2;
  }

  const filePaths = getAllFilePaths(args, index);
  parsedArguments.filePaths.push(...filePaths);

  validateCombination(options);
  return parsedArguments;
};

exports.parseArgs = parseArgs;
exports.isOption = isOption;
exports.validateCombination = validateCombination;
exports.validateOption = validateOption;
exports.validateLimit = validateLimit;
