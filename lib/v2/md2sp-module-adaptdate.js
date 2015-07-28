class AdaptDateModule {
  execute(docs, ctx) {
    for (let doc of docs) {
      doc.meta.post.dateCreated = doc.meta.post.date;
      delete doc.meta.post.date;
    }
    return docs;
  }
}

export default function adaptDate() {
  return new AdaptDateModule();
}