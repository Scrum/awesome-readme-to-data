# <img valign="text-bottom" height="49" src="assets/logo.svg" align="right"> awesome-readme-to-data
> Transform awesome readme to data

[![Actions Status](https://github.com/Scrum/vue-2-breadcrumbs/workflows/Actions%20Status/badge.svg?style=flat-square)](https://github.com/Scrum/vue-2-breadcrumbs/actions?query=workflow%3A%22CI+tests%22)[![node](https://img.shields.io/node/v/awesome-readme-to-data.svg?style=flat-square)]()[![npm version](https://img.shields.io/npm/v/awesome-readme-to-data.svg?style=flat-square)](https://www.npmjs.com/package/awesome-readme-to-data)[![Dependency Status](https://david-dm.org/Scrum/awesome-readme-to-data.svg?style=flat-square)](https://david-dm.org/Scrum/awesome-readme-to-data)[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/xojs/xo)[![Coveralls status](https://img.shields.io/coveralls/Scrum/awesome-readme-to-data.svg?style=flat-square)](https://coveralls.io/r/Scrum/awesome-readme-to-data)

[![npm downloads](https://img.shields.io/npm/dm/awesome-readme-to-data.svg?style=flat-square)](https://www.npmjs.com/package/awesome-readme-to-data)[![npm](https://img.shields.io/npm/dt/awesome-readme-to-data.svg?style=flat-square)](https://www.npmjs.com/package/awesome-readme-to-data)[![Package Quality](http://npm.packagequality.com/shield/awesome-readme-to-data.svg?style=flat-square)](http://packagequality.com/#?package=awesome-readme-to-data)

## Why?
Required to create data from awesome readme files

## Install

```bash
$ npm install awesome-readme-to-data
```

> **Note:** This project is compatible with node v10+

## Usage

```js
const awesomeReadmeToData = require('awesome-readme-to-data');
const md = `
# awesome you project
<!-- md-parser-start -->
## Level 1

### Level 1.1

*Description leve 1.1*

- [text link 1](https://url-link-1) - A description link 1
- [text link 2](https://url-link-2) - A description link 2
<!-- md-parser-end -->
`;

awesomeReadmeToData(md, options)
  .then(data => {
    console.log(data);
  });
```

# Example

```md
/* readme.md */
# awesome you project
<!-- md-parser-start -->
## Level 1

### Level 1.1

*Description leve 1.1*

- [text link 1](https://url-link-1) - A description link 1
- [text link 2](https://url-link-2) - A description link 2

### Level 1.2

*Description leve 1.1*

- [text link 1](https://url-link-1)
- [text link 2](https://url-link-2)
<!-- md-parser-end -->
```

```js
/* output-data.js */
[
  {
    name: 'Level 1',
    children: [{
      name: 'Level 1.1',
      children: [{
        name: 'text link 1',
        path: 'https://url-link-1',
        description: 'A description link 1'
      },{
        name: 'text link 2',
        path: 'https://url-link-2',
        description: 'A description link 2'
      }]
    },{
      name: 'Level 1.2',
      description: '*Description leve 1.2*',
      children: [{
        name: 'text link 1',
        path: 'https://url-link-1'
      },{
        name: 'text link 2',
        path: 'https://url-link-2'
      }]
    }]
  }
]
```
