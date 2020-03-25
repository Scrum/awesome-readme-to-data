class Header {
  constructor({text, description}) {
    this.name = text;
    if (description) {
      this.description = description;
    }
  }
}

module.exports = Header;
