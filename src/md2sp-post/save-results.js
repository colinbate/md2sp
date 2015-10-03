import pipeline, { Document } from 'tuberia-core';
import * as file from 'file-oath';

class SaveResultsModule {
  constructor(parser, mods) {
    mods.unshift('SaveResultsModule.generateFrontmatter');
    this.pipeline = pipeline.apply(null, mods);
    this.parser = pipeline.call(null, parser);
  }

  execute(docs, ctx) {
    let parse = orig => {
      return this.parser.run(ctx, {docs: [orig]});
    };
    return Promise.all(docs.map(doc => {
      let postMetaDoc = Document.create('', doc.meta.post);
      delete postMetaDoc.meta.description;
      postMetaDoc.meta.date = postMetaDoc.meta.dateCreated;
      delete postMetaDoc.meta.dateCreated;
      if (!postMetaDoc.meta.date) {
        postMetaDoc.meta.date = new Date();
      }
      return Promise.all([file.read(doc.meta.readFilename).then(Document.create).then(parse),
                         this.pipeline.run(ctx, {docs: [postMetaDoc]})])
        .then(results => {
          let singleParsed = results[0][0];
          let strMeta = results[1][0];
          let merged = Document.create(strMeta.content + '\n' + singleParsed.content);
          return file.write(doc.meta.readFilename, merged.content).then(x => doc); 
        });
    }));
  }
}

export default function saveResults(parser, ...mods) {
  return new SaveResultsModule(parser, mods);
}