const { parseArgs } = require('./paresArgs.js');

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

const readAllFiles = (readFile, filePaths) => {
  try {
    return filePaths.map((filePath) => readFile(filePath, 'utf8'));
  } catch (error) {
    throw { name: 'FileRead Error', message: 'Can\'t read file' };
  }
};

const formatContents = (fileContents, filePaths) => {
  if (filePaths.length === 1) {
    return fileContents;
  }
  const contents = [];

  for (let index = 0; index < filePaths.length; index++) {
    contents.push(`==> ${filePaths[index]} <==`, fileContents[index]);
  }
  return contents;
};

const headMain = (readFile, ...args) => {
  try {
    const { filePaths, option, value } = parseArgs(args);
    const fileContents = readAllFiles(readFile, filePaths);

    if (option === '--help') {
      return 'usage: head [-n lines | -c bytes] [file ...]';
    }

    const delimiter = option === '-c' ? '' : '\n';
    const requiredContents = head(fileContents, delimiter, value);
    return formatContents(requiredContents, filePaths).join('\n');
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  }
};

exports.firstNElements = firstNElements;
exports.contentsUpto = contentsUpto;
exports.head = head;
exports.headMain = headMain;
