const path = require('path');
const fs = require('fs');
const {lexer} = require('marked');
const createTree = require('./libs/tree');
const {
  isParseStart,
  isParseEnd
} = require('./libs/helpers');

const awesomeReadmeToData = filePath => new Promise(resolve => {
  const processing = (err, md) => {
    if (err) throw err;

    let parse = false;
    const nodes = lexer(md).filter(node => {
      if (isParseStart(node) || isParseEnd(node)) {
        parse = isParseStart(node) ? true : false;
        return false;
      };

      return parse;
    });

    resolve(createTree(nodes));
  }

  fs.readFile(path.resolve(filePath), 'utf8', processing);
});

module.exports = awesomeReadmeToData;