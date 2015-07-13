import util from 'util';

class DumpModule {
  constructor(opts) {
    this.opts = opts || {};
  }

  execute(docs, ctx) {
    console.log('I am the DumpModule.');
    if (!this.opts.noContext) {
      console.log('Context:');
      console.log(util.inspect(ctx));
    }
    if (!this.opts.noDocs) {
      console.log('Docs:');
      console.log(util.inspect(docs));
    }
    return docs;
  }
}

export default function dump(opts) {
  return new DumpModule(opts);
}