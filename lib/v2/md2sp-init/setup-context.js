import { RunMode } from '../md2sp-common';

class SetupContextModule {
  execute(docs, ctx) {
    console.log('I am the SetupContextModule.');
    if (ctx.config._.length === 1) {
      ctx.runMode = RunMode.makePost;
    }
    return docs;
  }
}

export default function setupContext() {
  return new SetupContextModule();
}