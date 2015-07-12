import util from 'util';

class DumpModule {
  execute(docs, ctx) {
    console.log('I am the DumpModule.');
    console.log('Context:');
    console.log(util.inspect(ctx));
    console.log('Docs:');
    console.log(util.inspect(docs));
    return docs;
  }
}

export default function dump() {
  return new DumpModule();
}