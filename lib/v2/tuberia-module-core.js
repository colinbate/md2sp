
class FrontmatterModule {
  execute(docs, ctx) {
    console.log('I am the FrontmatterModule.');
    return docs;
  }
}

export function frontmatter() {
  return new FrontmatterModule();
}

// if
// branch
// concat