import yargs from 'yargs';

class ParseArgumentsModule {
  constructor(conf) {
    this.conf = conf || (function () {});
  }

  execute(docs, ctx) {
    this.conf.call(null, yargs);
    ctx.config = yargs.argv;
    return docs;
  }
}

export function parseArguments(confFn) {
  return new ParseArgumentsModule(confFn);
}