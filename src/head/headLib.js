const { parseArgs, isOption } = require('./parseArgs.js');

const splitLines = (content) => content.split('\n');

const joinLines = (content) => content.join('\n');

const seperateCombinedOpitons = (arg) =>
  isOption(arg) ? [arg.slice(0, 2), arg.slice(2)] : arg;

const seperateArgs = (args) => {
  const seperatedArgs = args.flatMap(seperateCombinedOpitons);
  return seperatedArgs.filter((arg) => arg.length > 0);
};

const readAllFiles = (readFile, filePaths) => {
  try {
    return filePaths.map((filePath) => readFile(filePath, 'utf8'));
  } catch (error) {
    throw { name: 'FileRead Error', message: 'Can\'t read file' };
  }
};

const firstNLines = (fileContent, limit) => {
  const content = splitLines(fileContent);
  return joinLines(content.slice(0, limit));
};

const firstNBytes = (fileContent, limit) => fileContent.slice(0, limit);

const decideStrategy = (option) => {
  const switches = { '-c': firstNBytes, '-n': firstNLines };
  return switches[option];
};

const isSingleFile = (filePaths) => filePaths.length < 2;

const formatFileNames = (fileContents, filePaths) =>
  filePaths.flatMap((path, index) => [`==> ${path} <==`, fileContents[index]]);

const formatContents = (fileContents, filePaths) => isSingleFile(filePaths) ?
  fileContents : formatFileNames(fileContents, filePaths);

const head = (fileContents, option, limit) => {
  const strategy = decideStrategy(option);
  return fileContents.map(fileContent => strategy(fileContent, limit));
};

const headMain = (readFile, ...args) => {
  const seperatedArgs = seperateArgs(args);
  const { filePaths, option, limit } = parseArgs(seperatedArgs);
  const fileContents = readAllFiles(readFile, filePaths);

  const requiredContents = head(fileContents, option, limit);
  const formattedContents = formatContents(requiredContents, filePaths);
  return joinLines(formattedContents);
};

exports.seperateArgs = seperateArgs;
exports.formatContents = formatContents;
exports.head = head;
exports.headMain = headMain;
exports.splitLines = splitLines;
exports.joinLines = joinLines;
