const head = (contents, maxLines) => {
  return contents.split('\n').slice(0, maxLines).join('\n');
};

exports.head = head;
