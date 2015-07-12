

export default class Document {
  static create(content, meta = {}) {
    let nd = new Document();
    nd.content = content;
    nd.meta = meta;
    return nd;
  }

  constructor() {
    this.meta = {};
    this.content = '';
  }

  addMeta(newMeta = {}, newVal = null) {
    if (typeof newMeta === 'string') {
      this.meta[newMeta] = newVal;
      return;
    }
    for (let key of Object.keys(newMeta)) {
      this.meta[key] = newMeta[key];
    }
  }
}