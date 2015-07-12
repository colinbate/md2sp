import yargs from 'yargs';

class ParseArgumentsModule {
  constructor(conf) {
    this.conf = conf;
  }

  execute(docs, ctx) {
    console.log('I am the ParseArgumentsModule.');
    ctx.config = yargs.argv;
    return docs;
  }
}

export function parseArguments(confFn) {
  return new ParseArgumentsModule(confFn);
}