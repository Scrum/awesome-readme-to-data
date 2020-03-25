const Header = require('./header');
const Description = require('./description');
const Link = require('./link');

const createTree = (nodes = []) => {
  nodes = [{depth: 0, type: 'heading'}, ...nodes]
    .filter(node => ['heading', 'paragraph', 'text'].includes(node.type))
    .map(node => {
      if (node.type === 'heading') {
        node.children = [];
      }

      return node;
    })
    .reduce((previous, curr) => {
      if (curr.type === 'paragraph') {
        const [last, ...rest] = [previous.pop(), ...previous];
        Object.assign(last, new Description(curr));
        return [...rest, last];
      }

      if (curr.type === 'text') {
        const [last, ...rest] = [previous.pop(), ...previous];
        last.children.push({...new Link(curr)});
        return [...rest, last];
      }

      return [...previous, curr];
    }, []);

  let pointer = 0;
  const [result] = (function loop(level = 0) {
    const children = [];
    while (pointer < nodes.length) {
      const node = nodes[pointer];

      if (node.depth < level) {
        return children;
      }

      pointer++;

      children.push({
        ...new Header(node),
        children: node.children.concat(loop(level + 1))
      });
    }

    return children;
  })();

  return result.children;
};

module.exports = createTree;
