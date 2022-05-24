/* eslint-disable max-statements */
const isOption = (arg) => arg.startsWith('-');

const doesNoFileExist = ({ filePaths }) => filePaths.length === 0;

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

const validateSameOptionOrNot = (options) => {
  if (options.length === 0) {
    return;
  }

  options.reduce((option1, option2) => {
    if (option1 !== option2) {
      throw { name: 'head', message: 'can\'t combine line and byte counts' };
    }
    return option2;
  });
};

const validateOptionAndLimit = (args, index, optionLimitPair) => {
  const flagCountPair = { flag: args[index], count: args[index + 1] };
  validateOption(flagCountPair);
  validateLimit(flagCountPair);

  optionLimitPair.option = flagCountPair.flag;
  optionLimitPair.limit = flagCountPair.count;
};

const parseArgs = (args) => {
  let index = 0;
  const options = [];
  const optionLimitPair = { option: '-n', limit: 10, filePaths: [] };

  while (index < args.length) {
    if (isOption(args[index])) {
      validateOptionAndLimit(args, index, optionLimitPair);
      options.push(args[index]);
      index++;

    } else {
      optionLimitPair.filePaths.push(args[index]);
    }
    index++;
  }

  validateSameOptionOrNot(options);
  if (doesNoFileExist(optionLimitPair)) {
    throw { name: 'FileRead Error', message: 'Can\'t read file' };
  }
  return optionLimitPair;
};

exports.parseArgs = parseArgs;
