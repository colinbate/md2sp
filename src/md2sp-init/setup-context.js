import { RunMode } from '../md2sp-common';
import pathIsAbsolute from 'path-is-absolute';
import path from 'path';
import * as file from 'file-oath';

function loadCertFile(ctx, docs) {
  let certPath = path.join(ctx.configFolder, ctx.config.certFile);
  return file.read(certPath).then(ca => {
    ctx.apiOptions.caCert = ca;
    return docs;
  }).catch(err => {
    throw new Error('Could not load cert file from ' + certPath + ': ' + err);
  });
}

class SetupContextModule {
  execute(docs, ctx) {
    if (ctx.argv._.length === 1) {
      ctx.runMode = RunMode.makePost;
    }
    ctx.apiOptions = {
      url: ctx.config.url,
      blogId: ctx.config.blogid || '',
      username: ctx.config.ntlm ? '' : ctx.config.username,
      password: ctx.config.ntlm ? '' : ctx.config.password,
      apiKey: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      sanitize: false
    };
    if (ctx.config.ntlm) {
      ctx.apiOptions.ntlm = {
        username: ctx.config.username,
        password: ctx.config.password,
        workstation: ctx.config.workstation || process.env.COMPUTERNAME || 'WORKSTATION',
        domain: ctx.config.domain || ''
      };
    } else {
      ctx.apiOptions.ntlm = false;
    }
    if (ctx.config.cert) {
      return loadCertFile(ctx, docs);
    }
    return docs;
  }
}

export default function setupContext() {
  return new SetupContextModule();
}