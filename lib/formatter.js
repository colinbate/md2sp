import {marked} from 'marked';
import {highlightjs} from 'highlight.js';
import {mixtur} from './ext/mixtur';
import {files} from './files';

marked.setOptions({
  sanitize: false,
  smartypants: true,
  highlight: function (code) {
    return highlightjs.highlightAuto(code).value;
  }
});

export class Formatter {
  constructor(config) {
    this.config = config;
  }

  generateHtml(post, next) {
    if (this.config.cssFile) {
      return files.readAsync(this.config.cssFile).then(function (css) {
        return mixtur(marked(rawMarkdown), css);
      });
    }
    return Promise.resolve(marked(rawMarkdown));
  }
}