const { parseArgs } = require('./paresArgs.js');
const { readAllFiles, formatContents, seperateArgs } = require('./helpers.js');

const split = (contents, seperator) => contents.split(seperator);

const join = (contents, delimiter) => contents.join(delimiter);

const contentsUpto = (contents, upto) => contents.slice(0, upto);

const firstNElements = (fileContents, delimiter, upto) => {
  const contents = split(fileContents, delimiter);
  const requiredContents = contentsUpto(contents, upto);

  return join(requiredContents, delimiter);
};

const head = (fileContents, delimiter, value) => {
  return fileContents.map(content =>
    firstNElements(content, delimiter, value));
};

const headMain = (readFile, ...args) => {
  try {
    const seperatedArgs = seperateArgs(args);
    const { filePaths, option, value } = parseArgs(seperatedArgs);
    const fileContents = readAllFiles(readFile, filePaths);

    const delimiter = option === '-c' ? '' : '\n';
    const requiredContents = head(fileContents, delimiter, value);
    return formatContents(requiredContents, filePaths).join('\n');

  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    if (error.code === '--help') {
      return 'usage: head [-n lines | -c bytes] [file ...]';
    }
  }
};

exports.firstNElements = firstNElements;
exports.contentsUpto = contentsUpto;
exports.head = head;
exports.headMain = headMain;
