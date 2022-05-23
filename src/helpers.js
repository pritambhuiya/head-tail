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

const seperateArgs = (args) => {
  const seperatedArgs = args.flatMap((element) => element.startsWith('-')
    ? [element.slice(0, 2), element.slice(2)] : element);

  return seperatedArgs.filter((arg) => arg.length > 0);
};

exports.readAllFiles = readAllFiles;
exports.formatContents = formatContents;
exports.seperateArgs = seperateArgs;
