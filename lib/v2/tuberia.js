import { Document } from './tuberia-document';

let slice = Function.prototype.call.bind(Array.prototype.slice);
let pipelineCount = 0;

function isPromise(obj) {
  return obj != null && typeof obj.then === 'function';
}

class Pipeline {

  constructor(name, modules) {
    this.name = name || 'pipeline ' + (++pipelineCount);
    this.modules = modules || [];
    this.running = false;
  }

  run(opts = {}) {
    if (this.running) {
      return;
    }
    this.running = true;
    let docs = opts.docs || [new Document()];
    let context = opts.context || {};
    let mods = slice(this.modules);

    let handle = function handle(d, c, m) {
      let mod = m.shift();
      let result = mod.execute(d, c);
      let thenable = isPromise(result) ? result : Promise.resolve(result);
      thenable.then(res => {
        if (m.length) {
          handle(res, c, m);
        } else {
          this.running = false;
          console.log('Pipeline "' + this.name + '" ran with', this.modules.length, 'modules', opts.debug ? ' in debug mode' : '');
        }
      });
    };

    handle(docs, context, mods);
    
  }
}

export function pipeline() {
  let args = slice(arguments);
  let name;
  if (args.length && typeof args[0] === 'string') {
    name = args.shift();
  }
  return new Pipeline(name, args);
}

let util = require('util');
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

export function dump() {
  return new DumpModule();
}