const warnIfFilesNotFound = (filePaths) => {
  if (filePaths.length === 0) {
    throw { name: 'FileRead Error', message: 'Can\'t read file' };
  }
};

const warnIfMultipleOptionsAreEntered = ([currentArg, nextArg]) => {
  if (currentArg.option !== nextArg.option) {
    throw { name: 'head', message: 'can\'t combine line and byte counts' };
  }
};

const warnIfOptionIsInvalid = ({ option }) => {
  if (!['-c', '-n'].includes(option)) {
    throw {
      name: 'head', message: `illegal option -- ${option}`,
      code: '--help'
    };
  }
};

const warnIfValueIsInvalid = ({ option, limit }) => {
  if (limit <= 0 || !isFinite(limit)) {
    const flag = option === '-c' ? 'byte' : 'line';
    throw { name: 'head', message: `illegal ${flag} count -- ${limit}` };
  }
};

const validateOptionAndLimit = (array) => {
  for (const element of array) {
    warnIfOptionIsInvalid(element);
    warnIfValueIsInvalid(element);
  }
};

exports.warnIfFilesNotFound = warnIfFilesNotFound;
exports.warnIfMultipleOptionsAreEntered = warnIfMultipleOptionsAreEntered;
exports.validateOptionAndLimit = validateOptionAndLimit;
