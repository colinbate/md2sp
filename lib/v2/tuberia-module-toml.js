import tomllib from 'toml';

class TomlModule {
  execute(docs, ctx) {
    console.log('I am the TomlModule.');
    for (let doc of docs) {
      doc.addMeta(tomllib.parse(doc.content));
      doc.content = '';
    }
    return docs;
  }
}

class TomlifyModule {
  execute(docs, ctx) {
    console.log('I am the TomlifyModule.');
    return docs;
  }
}

let toml = function toml() {
  return new TomlModule();
}

toml.generate = function () {
  return new TomlifyModule();
}

export { toml as default };