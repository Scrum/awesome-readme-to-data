const test = require('ava');
const Header = require('../libs/header');
const Description = require('../libs/description');
const Link = require('../libs/link');
const {
  isParseStart,
  isParseEnd
} = require('../libs/helpers');

test('is parse start node test', t => {
  const node = {type: 'html', pre: false, text: '<!-- test -->\n'};
  t.false(isParseStart(node));
  t.false(isParseEnd(node));
});

test('is parse start node start', t => {
  const node = {type: 'html', pre: false, text: '<!-- md-parser-start -->\n'};
  t.true(isParseStart(node));
});

test('is parse start node end', t => {
  const node = {type: 'html', pre: false, text: '<!-- md-parser-end -->\n'};
  t.true(isParseEnd(node));
});

test('create node header', t => {
  const node = {type: 'heading', depth: 1, text: 'Link 1'};
  const expectedNode = {
    name: 'Link 1'
  };
  const value = new Header(node);
  t.is(value.constructor.name, 'Header');
  t.deepEqual({...value}, expectedNode);
});

test('create node header description', t => {
  const node = {type: 'paragraph', text: '*description*'};
  const expectedNode = {
    description: '*description*'
  };
  const value = new Description(node);
  t.is(value.constructor.name, 'Description');
  t.deepEqual({...value}, expectedNode);
});

test('create node link with description', t => {
  const node = {
    type: 'text',
    text: '[link](https://link-1) - A description link 1 [site](https://site.ru)'
  };
  const expectedNode = {
    name: 'link',
    path: 'https://link-1',
    description: ' - A description link 1 [site](https://site.ru)'
  };
  const value = new Link(node);
  t.is(value.constructor.name, 'Link');
  t.deepEqual({...value}, expectedNode);
});

test('create node link without description', t => {
  const node = {
    type: 'text',
    text: '[link](https://link-1)'
  };
  const expectedNode = {
    name: 'link',
    path: 'https://link-1'
  };
  const value = new Link(node);
  t.is(value.constructor.name, 'Link');
  t.deepEqual({...value}, expectedNode);
});

test('create node link without link', t => {
  const node = {
    type: 'text',
    text: 'link'
  };
  const expectedNode = {
    description: 'link'
  };
  const value = new Link(node);
  t.is(value.constructor.name, 'Link');
  t.deepEqual({...value}, expectedNode);
});

test('create node link with incorrect start link', t => {
  const node = {
    type: 'text',
    text: 'link [test](https://test.ru) sadasd asda'
  };
  const expectedNode = {
    description: 'link [test](https://test.ru) sadasd asda'
  };
  const value = new Link(node);
  t.is(value.constructor.name, 'Link');
  t.deepEqual({...value}, expectedNode);
});
