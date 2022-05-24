/* eslint-disable max-statements */

const { warnIfFilesNotFound, warnIfMultipleOptionsAreEntered,
  validateOptionAndLimit } = require('./validators.js');

const pushIfArgIsNotNumber = (filePaths, argument) => {
  if (!isFinite(argument)) {
    filePaths.push(argument);
  }
};

const validate = (argsObjectsArray) => {
  validateOptionAndLimit(argsObjectsArray);

  if (argsObjectsArray.length < 2) {
    return argsObjectsArray[0];
  }

  for (let index = 0; index < argsObjectsArray.length - 1; index++) {
    warnIfMultipleOptionsAreEntered(argsObjectsArray.slice(index, index + 2));
  }
};

const filterArgs = (argsObjectsArray) => {
  if (argsObjectsArray.length === 0) {
    return { option: '-n', limit: 10 };
  }

  validate(argsObjectsArray);
  return argsObjectsArray[argsObjectsArray.length - 1];
};

const isOption = (arg) => arg.startsWith('-');

const parseArgs = (args) => {
  const argsObject = [];
  const filePaths = [];
  let index = 0;

  while (index < args.length) {
    const arg = args[index];
    const nextArg = args[index + 1];

    if (isOption(arg)) {
      argsObject.push({ option: arg, limit: nextArg });
      index++;
    }

    pushIfArgIsNotNumber(filePaths, args[index]);
    index++;
  }

  const filteredArgs = filterArgs(argsObject);
  warnIfFilesNotFound(filePaths);
  filteredArgs.filePaths = filePaths;
  return filteredArgs;
};

exports.parseArgs = parseArgs;
