const test = require('ava');
const core = require('../');

test('title', async t => {
  const expected = [
    {
      "name": "Link 1",
      "children": [
        {
          "name": "Link 1.1",
          "description": "*description*",
          "children": [
            {
              "name": "link",
              "path": "https://link-1",
              "description": " - A description link 1 [site](https://site.ru)"
            },
            {
              "name": "link",
              "path": "https://link-2",
              "description": " - A description link 2"
            }
          ]
        }
      ]
    }
  ];
  
  t.deepEqual(await core('./test/test.md'), expected);
});