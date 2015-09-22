import marked from 'marked';
import highlightjs from 'highlight.js';

marked.setOptions({
  sanitize: false,
  smartypants: true,
  highlight: function (code) {
    return highlightjs.highlightAuto(code).value;
  }
});

class MarkdownModule {
  constructor(opts) {
    this.opts = opts || {};
  }

  execute(docs, ctx) {
    for (let doc of docs) {
      doc.content = marked(doc.content);
    }
    return docs;
  }
}

export default function markdown(opts) {
  return new MarkdownModule(opts);
}
