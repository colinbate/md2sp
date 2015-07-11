

export function readFiles() {

}

class ReadConfigModule {
  execute(docs, ctx) {
    console.log('I am the ReadConfigModule starting.');
    return new Promise((a, r) => {
      setTimeout(() => {
        console.log('I am the ReadConfigModule finishing.')
        a(docs);
      }, 1000);
    });
  }
}

export function readConfig() {
  return new ReadConfigModule();
}