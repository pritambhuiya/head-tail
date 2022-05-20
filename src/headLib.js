const splitLines = (lines) => lines.split('\n');
const joinLines = (lines) => lines.join('\n');

const head = (contents, maxLines) => {
  const lines = splitLines(contents);
  const requiredLines = lines.slice(0, maxLines);

  return joinLines(requiredLines);
};

exports.head = head;
