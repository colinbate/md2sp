import * as files from './files';
import { slice } from './utils';
import path from 'path';
import pathIsAbsolute from 'path-is-absolute';
import Document from './tuberia-document';
import pipeline from './tuberia';

export function readFiles() {

}

function findConfig(dir, filename, required) {
  var checkFile = path.join(dir, filename);
  return files.read(checkFile).catch(function () {
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

var loadConfig = function () {
  var cwd = process.cwd();

  return readConfig(cwd).then(toml.parse).then(function (config) {
    if (!config || !config.url) {
      throw new Error('Config file could not be parsed, or invalid.');
    }
    config._folder = currentFolder;
    if (!config.frontmatter) {
      config.frontmatter = {};
    }
    config.frontmatter.separator = config.frontmatter.separator || '+++';
    config.apiUser = config.ntlm ? '' : config.username;
    config.apiPass = config.ntlm ? '' : config.password;
    config.blogid = config.blogid || '';
    return config;
  });
};

let createDoc = function (content) {
  console.dir(content);
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
    console.log('Config dir', configDir, 'and file', configFile);
    return findConfig(configDir, configFile, this.required).then(createDoc).then(ldocs => {
      return this.pipeline.run(ctx, {docs: ldocs});
    }).then(ldocs => {
      console.log('parsed, now add to context...');
      ctx.config = ctx.config || {};
      let oneTrue = ldocs[0].meta;
      console.dir(oneTrue);
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