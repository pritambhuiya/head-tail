const splitLines = (lines) => lines.split('\n');
const joinLines = (lines) => lines.join('\n');

const splitCharacters = (lines) => lines.split('');
const joinCharacters = (lines) => lines.join('');

const bytesUpto = (contents, { maxBytes }) => {
  const lines = splitCharacters(contents);
  const requiredLines = lines.slice(0, maxBytes);

  return joinCharacters(requiredLines);
};

const linesUpto = (contents, { maxLines }) => {
  const lines = splitLines(contents);
  const requiredLines = lines.slice(0, maxLines);

  return joinLines(requiredLines);
};

const head = (contents, { maxLines, maxBytes }) => {
  const fnToCall = maxBytes > 0 && maxLines === 0 ? bytesUpto : linesUpto;
  return fnToCall(contents, { maxLines, maxBytes });
};

exports.head = head;
exports.linesUpto = linesUpto;
exports.bytesUpto = bytesUpto;
