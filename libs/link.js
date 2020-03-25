class Link {
  constructor({text}) {
    const [description, link] = text.match(/^(\[.+?]\(.+?\))?(.+?)$/).reverse();
    const [path, name] = link.match(/^\[(.+?)]\((.+?)\)$/).reverse();

    this.name = name;
    this.path = path;
    this.description = description;
  }
}

module.exports = Link;
