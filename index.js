const path = require('path');
const fs = require('fs');
const {lexer} = require('marked');
const createTree = require('./libs/tree');
const {
  isParseStart,
  isParseEnd
} = require('./libs/helpers');

// const md = `
// <!-- test -->
// # Link 1

// ## Link 1.1
// *description*
// - [link](https://link-1) - A description link 1 [site](https://site.ru)
// - [link](https://link-2) - A description link 2
// `
// console.dir({tree: lexer(md)})

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