const splitLines = (lines) => lines.split('\n');
const joinLines = (lines) => lines.join('\n');

const liinesUpto = (contents, { maxLines }) => {
  const lines = splitLines(contents);
  const requiredLines = lines.slice(0, maxLines);

  return joinLines(requiredLines);
};

const head = (contents, { maxLines, maxBytes }) => {
  return liinesUpto(contents, { maxLines, maxBytes });
};

exports.head = head;
