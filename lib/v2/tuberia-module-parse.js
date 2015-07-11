class TomlModule {
  execute(docs, ctx) {
    console.log('I am the TomlModule.');
    return docs;
  }
}

export function toml() {
  return new TomlModule();
}

export function markdown() {

}