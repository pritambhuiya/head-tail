const { parseArgs } = require('./parseArgs.js');

const split = {
  lines: (contents) => contents.split('\n'),
  bytes: (contents) => contents.split('')
};

const join = {
  lines: (contents) => contents.join('\n'),
  bytes: (contents) => contents.join('')
};

const contentsUpto = (contents, upto) => contents.slice(0, upto);

const firstNElements = (fileContents, strategy, upto) => {
  const contents = split[strategy](fileContents);
  const requiredContents = contentsUpto(contents, upto);
  return join[strategy](requiredContents);
};

const isOption = (arg) => arg.startsWith('-');

const seperateOptionsFromLimits = (arg) =>
  isOption(arg) ? [arg.slice(0, 2), arg.slice(2)] : arg;

const seperateArgs = (args) => {
  const seperatedArgs = args.flatMap(seperateOptionsFromLimits);
  return seperatedArgs.filter((arg) => arg.length > 0);
};

const readAllFiles = (readFile, filePaths) => {
  try {
    return filePaths.map((filePath) => readFile(filePath, 'utf8'));
  } catch (error) {
    throw { name: 'FileRead Error', message: 'Can\'t read file' };
  }
};

const head = (fileContents, option, limit) => {
  const strategy = option === '-c' ? 'bytes' : 'lines';
  return fileContents.map(content => firstNElements(content, strategy, limit));
};

const isSingleFile = (filePaths) => filePaths.length === 1;

const formatFileNames = (fileContents, filePaths) => {
  const contents = [];

  for (let index = 0; index < filePaths.length; index++) {
    contents.push(`==> ${filePaths[index]} <==`, fileContents[index]);
  }
  return contents;
};

const formatContents = (fileContents, filePaths) => isSingleFile(filePaths) ?
  fileContents : formatFileNames(fileContents, filePaths);

const headMain = (readFile, ...args) => {
  const seperatedArgs = seperateArgs(args);
  const { filePaths, option, limit } = parseArgs(seperatedArgs);
  const fileContents = readAllFiles(readFile, filePaths);

  const requiredContents = head(fileContents, option, limit);
  return formatContents(requiredContents, filePaths).join('\n');
};

exports.firstNElements = firstNElements;
exports.contentsUpto = contentsUpto;
exports.head = head;
exports.headMain = headMain;
exports.formatContents = formatContents;
exports.seperateArgs = seperateArgs;
exports.split = split;
exports.join = join;
