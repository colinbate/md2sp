import * as file from './files';
import { slice } from './utils';
import path from 'path';
import pathIsAbsolute from 'path-is-absolute';
import Document from './tuberia-document';
import pipeline from './tuberia';

class ReadFilesModule {
  constructor(search) {
    this.search = search;
    this.mergeDocs = false;
  }

  merge() {
    this.mergeDocs = true;
    return this;
  }

  execute(docs, ctx) {
    console.log('I am the ReadFilesModule.');
    let pathFn = this.search;
    let pathList = new Set();
    let docList = docs;
    if (!this.mergeDocs) {
      docList = [];
    }
    for (let doc of docs) {
      let pattern = pathFn.call(null, doc, ctx);
      // TODO: add glob support.
      pathList.add(pattern);
    }
    let fileProms = [];
    let cwd = process.cwd();
    for (let filename of pathList.keys()) {
      if (!pathIsAbsolute(filename)) {
        filename = path.join(cwd, filename);
      }
      fileProms.push(file.read(filename).then(Document.create).then(d => {
        let lfile = filename,
            readFileExtention = path.extname(lfile),
            readFileDirectory = path.dirname(lfile),
            readFileBasename = path.join(readFileDirectory, path.basename(lfile, readFileExtention)),
            relativeFilePath = path.relative(cwd, lfile),
            relativeBasename = path.join(path.relative(cwd, readFileDirectory), path.basename(lfile, readFileExtention));
        d.addMeta({
          readFilename: lfile,
          readFileExtention,
          readFileDirectory,
          readFileBasename,
          relativeFilePath,
          relativeBasename
        });
        return d;
      }));
    }
    return Promise.all(fileProms).then(newdocs => {
      return docList.concat(newdocs);
    });
  }
}

export function readFiles(val) {
  if (typeof val === 'string') {
    val = () => val;
  }
  return new ReadFilesModule(val);
}

function findConfig(dir, filename, required) {
  var checkFile = path.join(dir, filename);
  return file.read(checkFile).catch(function () {
    var updir = path.join(dir, '..');
    if (updir === dir) {
      if (!required) {
        return '';
      }
      throw new Error('Could not find ' + filename + ' file in current or parent folder.');
    }
    return findConfig(updir, filename, required);
  });
}

let createDoc = function (content) {
  let doc = Document.create(content);
  return [doc];
};

class ReadConfigModule {
  constructor(filename, mods = []) {
    mods.unshift('ReadConfigModule.parse');
    this.pipeline = pipeline.apply(null, mods);
    this.filename = filename;
    this.required = true;
  }

  optional() {
    this.required = false;
    return this;
  }

  execute(docs, ctx) {
    console.log('I am the ReadConfigModule starting.');
    let configFile = this.filename;
    let configDir = process.cwd();
    if (ctx.config && ctx.config.config) {
      configFile = ctx.config.config;
    }
    if (pathIsAbsolute(configFile)) {
      configDir = path.dirname(configFile);
      configFile = path.basename(configFile);
    }
    return findConfig(configDir, configFile, this.required).then(createDoc).then(ldocs => {
      return this.pipeline.run(ctx, {docs: ldocs});
    }).then(ldocs => {
      ctx.config = ctx.config || {};
      let oneTrue = ldocs[0].meta;
      for (let key of Object.keys(oneTrue)) {
        if (!(key in ctx.config)) {
          ctx.config[key] = oneTrue[key];
        }
      }
      return docs;
    });
  }
}

export function readConfig() {
  let mods = slice(arguments);
  let file;
  if (mods.length && typeof mods[0] === 'string') {
    file = mods.shift();
  }
  return new ReadConfigModule(file, mods);
}