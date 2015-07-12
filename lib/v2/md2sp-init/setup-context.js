
class SetupContextModule {
  execute(docs, ctx) {
    console.log('I am the SetupContextModule.');
    let newDocs = [];
    for (let doc of docs) {
      doc.meta.title = 'Whee!';
      newDocs.push(doc);
    }
    return newDocs;
  }
}

export default function setupContext() {
  return new SetupContextModule();
}