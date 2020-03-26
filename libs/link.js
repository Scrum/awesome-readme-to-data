class Link {
  constructor({text}) {
    let [description, link] = text.match(/^(\[.+?]\(.+?\))?(.+?)$/).reverse();
    if (link === undefined && /^(\[.+?]\(.+?\))/.test(description)) {
      link = description;
    }

    if (link !== undefined) {
      const [path, name] = link.match(/^\[(.+?)]\((.+?)\)$/).reverse();
      this.name = name;
      this.path = path;
    }

    if (description !== link) {
      this.description = description;
    }
  }
}

module.exports = Link;
