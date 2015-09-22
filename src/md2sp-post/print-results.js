export default function printResults() {
  return {
    execute(docs, ctx) {
      for (let doc of docs) {
        console.log((doc.meta.isNew ? 'Created' : 'Updated'), 'post id', doc.meta.post.postid, 'from', doc.meta.relativeFilePath);
      }
    }
  };
}