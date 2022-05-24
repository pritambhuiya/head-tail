const warnIfFilesNotFound = (filePaths) => {
  if (filePaths.length === 0) {
    throw { name: 'FileRead Error', message: 'Can\'t read file' };
  }
};

const warnIfOptionIsInvalid = ({ option }) => {
  if (!['-c', '-n'].includes(option)) {
    throw {
      name: 'head', message: `illegal option -- ${option}`, code: '--help'
    };
  }
};

const warnIfValueLessThanEqualZero = ({ option, value }) => {
  if (value <= 0) {
    const flag = option === '-c' ? 'byte' : 'line';
    throw { name: 'head', message: `illegal ${flag} count -- ${value}` };
  }
};

const warnIfMultipleOptionsAreEntered = ([currentArg, nextArg]) => {
  if (currentArg.option !== nextArg.option) {
    throw { name: 'head', message: 'can\'t combine line and byte counts' };
  }
};

exports.warnIfFilesNotFound = warnIfFilesNotFound;
exports.warnIfOptionIsInvalid = warnIfOptionIsInvalid;
exports.warnIfValueLessThanEqualZero = warnIfValueLessThanEqualZero;
exports.warnIfMultipleOptionsAreEntered = warnIfMultipleOptionsAreEntered;
