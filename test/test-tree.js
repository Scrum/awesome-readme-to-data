const test = require('ava');

const createTree = require('../libs/tree');

test('should return empty array', t => {
  t.deepEqual(createTree(), []);
});

test('should return header item', t => {
  const node = [{type: 'heading', depth: 1, text: 'Link 1'}];
  const expected = [{
    name: 'Link 1',
    children: []
  }];
  t.deepEqual(createTree(node), expected);
});

test('should return 2 header item', t => {
  const node = [
    {type: 'heading', depth: 1, text: 'Link 1'},
    {type: 'heading', depth: 1, text: 'Link 2'}
  ];
  const expected = [{
    name: 'Link 1',
    children: []
  }, {
    name: 'Link 2',
    children: []
  }];
  t.deepEqual(createTree(node), expected);
});

test('should return header item with description', t => {
  const node = [
    {type: 'heading', depth: 1, text: 'Link 1'},
    {type: 'paragraph', text: '*description*'}
  ];
  const expected = [{
    name: 'Link 1',
    description: '*description*',
    children: []
  }];
  t.deepEqual(createTree(node), expected);
});

test('should return 2 header item with description', t => {
  const node = [
    {type: 'heading', depth: 1, text: 'Link 1'},
    {type: 'paragraph', text: '*description*'},
    {type: 'heading', depth: 1, text: 'Link 2'},
    {type: 'paragraph', text: '*description*'}
  ];
  const expected = [{
    name: 'Link 1',
    children: [],
    description: '*description*'
  }, {
    name: 'Link 2',
    children: [],
    description: '*description*'
  }];
  t.deepEqual(createTree(node), expected);
});

test('should return header item with subheader', t => {
  const node = [
    {type: 'heading', depth: 1, text: 'Link 1'},
    {type: 'heading', depth: 2, text: 'Link 1.1'}
  ];
  const expected = [{
    name: 'Link 1',
    children: [{
      name: 'Link 1.1',
      children: []
    }]
  }];
  t.deepEqual(createTree(node), expected);
});

test('should return simple header item with 2 subheader', t => {
  const nodes = [
    {type: 'heading', depth: 1, text: 'Link 1'},
    {type: 'heading', depth: 2, text: 'Link 1.1'},
    {type: 'heading', depth: 1, text: 'Link 2'},
    {type: 'heading', depth: 2, text: 'Link 2.1'}
  ];
  const expected = [{
    name: 'Link 1',
    children: [{
      name: 'Link 1.1',
      children: []
    }]
  }, {
    name: 'Link 2',
    children: [{
      name: 'Link 2.1',
      children: []
    }]
  }];
  t.deepEqual(createTree(nodes), expected);
});

test('should return header item with 2 subheader', t => {
  const node = [
    {type: 'heading', depth: 1, text: 'Link 1'},
    {type: 'heading', depth: 2, text: 'Link 1.1'},
    {type: 'heading', depth: 2, text: 'Link 1.2'},
    {type: 'heading', depth: 1, text: 'Link 2'},
    {type: 'heading', depth: 2, text: 'Link 2.1'},
    {type: 'heading', depth: 2, text: 'Link 2.2'}
  ];
  const expected = [{
    name: 'Link 1',
    children: [{
      name: 'Link 1.1',
      children: []
    }, {
      name: 'Link 1.2',
      children: []
    }]
  }, {
    name: 'Link 2',
    children: [{
      name: 'Link 2.1',
      children: []
    }, {
      name: 'Link 2.2',
      children: []
    }]
  }];
  t.deepEqual(createTree(node), expected);
});

test('should return header item with links', t => {
  const node = [
    {type: 'heading', depth: 1, text: 'Link 1'},
    {type: 'text', text: '[link](https://link-1) - A description link 1 [site](https://site.ru)'},
    {type: 'text', text: '[link](https://link-2) - A description link 2'}

  ];
  const expected = [{
    name: 'Link 1',
    children: [
      {
        description: ' - A description link 1 [site](https://site.ru)',
        name: 'link',
        path: 'https://link-1'
      },
      {
        description: ' - A description link 2',
        name: 'link',
        path: 'https://link-2'
      }
    ]
  }];
  t.deepEqual(createTree(node), expected);
});
