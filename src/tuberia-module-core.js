import pipeline from './tuberia';
import Document from './tuberia-document';

class FrontmatterModule {
  constructor(separator, mods) {
    mods.unshift('FrontmatterModule.parse');
    this.pipeline = pipeline.apply(null, mods);
    this.separator = separator || function () {};
  }

  execute(docs, ctx) {
    return Promise.all(docs.map(doc => {
      let sep = this.separator.call(null, doc, ctx);
      if (!sep) {
        return doc;
      }
      let parts = doc.content.split(sep);
      if (parts.length && !(parts[0].trim())) {
        parts.shift();
      }
      if (parts.length !== 2) {
        return doc;
      }
      doc.content = parts[1].trim();
      return this.pipeline.run(ctx, {docs: [Document.create(parts[0].trim())]}).then(r => {
        if (r.length) {
          doc.addMeta(r[0].meta);
        }
        return doc;
      });
    }));
  }
}

export function frontmatter(...mods) {
  let separator;
  if (mods.length) {
    if (typeof mods[0] === 'string') {
      let str = mods.shift();
      separator = () => str;
    } else if (typeof mods[0] === 'function') {
      separator = mods.shift();
    }
  }
  return new FrontmatterModule(separator, mods);
}

// if
// branch
// concat