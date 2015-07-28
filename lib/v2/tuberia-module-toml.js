import tomllib from 'toml';
import tomlify from 'tomlify';

class TomlModule {
  execute(docs, ctx) {
    for (let doc of docs) {
      doc.addMeta(tomllib.parse(doc.content));
      doc.content = '';
    }
    return docs;
  }
}

class TomlifyModule {
  constructor(delim) {
    this.delim = delim || '+++';
  }
  execute(docs, ctx) {
    for (let doc of docs) {
      doc.content = tomlify(doc.meta, {delims: this.delim});
      doc.meta = {};
    }
    return docs;
  }
}

let toml = function toml() {
  return new TomlModule();
}

toml.generate = function (delim) {
  return new TomlifyModule(delim);
}

export { toml as default };