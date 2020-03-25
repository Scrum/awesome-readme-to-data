module.exports = {
  isParseStart(node) {
    return node.type === 'html' && node.text.includes('md-parser-start');
  },
  isParseEnd(node) {
    return node.type === 'html' && node.text.includes('md-parser-end');
  }
};
