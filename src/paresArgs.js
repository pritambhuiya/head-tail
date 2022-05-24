/* eslint-disable max-statements */

const { warnIfFilesNotFound, warnIfOptionIsInvalid,
  warnIfValueLessThanEqualZero, warnIfMultipleOptionsAreEntered } =
  require('./errorHandlingFunctions.js');

const pushIfArgIsNotNumber = (filePaths, argument) => {
  if (!isFinite(argument)) {
    filePaths.push(argument);
  }
};

const validateOption = (argObject) => {
  warnIfValueLessThanEqualZero(argObject);
  warnIfOptionIsInvalid(argObject);
};

const validateAllOptions = (argsObjectsArray) => {
  for (let index = 0; index < argsObjectsArray.length - 1; index++) {
    const argObject = argsObjectsArray[index];
    validateOption(argObject);

    warnIfMultipleOptionsAreEntered(argsObjectsArray.slice(index, index + 2));
  }
};

const filterArgs = (argsObjectsArray) => {
  if (argsObjectsArray.length === 0) {
    return { option: '-n', value: 10 };
  }

  if (argsObjectsArray.length < 2) {
    validateOption(argsObjectsArray[0]);
    return argsObjectsArray[0];
  }

  validateAllOptions(argsObjectsArray);
  return argsObjectsArray[argsObjectsArray.length - 1];

};

const parseArgs = (args) => {
  const argsObject = [];
  const filePaths = [];
  let index = 0;

  while (index < args.length) {
    const arg = args[index];
    const nextArg = args[index + 1];

    if (arg.startsWith('-')) {
      if (isFinite(nextArg)) {
        argsObject.push({ option: arg, value: nextArg });
        index++;
      }
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
