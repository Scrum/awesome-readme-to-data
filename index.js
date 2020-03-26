const {lexer} = require('marked');
const createTree = require('./libs/tree');
const {
  isParseStart,
  isParseEnd
} = require('./libs/helpers');

const awesomeReadmeToData = md => new Promise(resolve => {
    let parse = false;
    const nodes = lexer(md).filter(node => {
      if (isParseStart(node) || isParseEnd(node)) {
        parse = isParseStart(node) ? true : false;
        return false;
      };

      return parse;
    });

    resolve(createTree(nodes));
});

module.exports = awesomeReadmeToData;