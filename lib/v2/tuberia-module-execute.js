class ExecuteModule {
  constructor(fn) {
    this.fn = fn;
  }

  execute(docs, ctx) {
    return Promise.all(docs.map(doc => {
      return this.fn.call(null, doc, ctx);
    }));
  }
}

export default function execute(fn) {
  if (typeof fn !== 'function') {
    throw new Error('ExecuteModule requires a function to execute.')
  }
  return new ExecuteModule(fn);
}