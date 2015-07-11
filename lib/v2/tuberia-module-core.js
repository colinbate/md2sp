
class ParseArgumentsModule {
  execute(docs, ctx) {
    console.log('I am the ParseArgumentsModule.');
    ctx.runMode = 'makePost';
    return docs;
  }
}

export function parseArguments() {
  return new ParseArgumentsModule();
}

class FrontmatterModule {
  execute(docs, ctx) {
    console.log('I am the FrontmatterModule.');
    return docs;
  }
}

export function frontmatter() {
  return new FrontmatterModule();
}