import Document from './tuberia-document';
import MetaWeblogApi from '../metaweblog-api';

class MetaWeblogPostModule {
  constructor(editFn) {
    this.editFn = editFn || function () {
      return false;
    };
  }

  execute(docs, ctx) {
    console.log('I am the MetaWeblogPostModule.');
    if (!this.api) {
      let opts = {
        // Get from ctx
      };
      this.api = new MetaWeblogApi(opts);
    }
    return Promise.all(docs.map(doc => {
      let shouldEdit = this.editFn.call(null, doc, ctx);
      let apiFn = shouldEdit ? 'editPost' : 'newPost';
      let post = doc.cloneMeta({description: doc.content}).meta;
      return this.api[apiFn](post.meta);
    }));
  }
}

export default function metaweblogPost(idField = 'postid') {
  let editFn = idField;
  if (typeof idField === 'string') {
    editFn = (d) => !!d.meta[idField];
  }
  return new MetaWeblogApiModule(editFn);
}