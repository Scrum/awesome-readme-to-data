# awesome-readme-to-data
> Transform awesome readme to data

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

awesomeReadmeToData('path/to/config/file', options)
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