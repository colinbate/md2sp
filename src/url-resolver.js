import url from 'url';
import http from 'http';
import https from 'https';

const maxRedirects = 3;

export default function resolveUrl(origUrl, cert = null, redirectsSoFar = 0) {
  if (redirectsSoFar >= maxRedirects) {
    return Promise.resolve(origUrl)
  }
  var reqUrl = url.parse(origUrl),
      isHttps = reqUrl.protocol === 'https:',
      client = isHttps ? https : http,
      opts = {
        hostname: reqUrl.hostname,      
        path: reqUrl.pathname || '/',
        port: reqUrl.port,
        method: 'HEAD'
      };
  if (cert) {
    opts.ca = cert;
  }
  return new Promise(ok => {
    let req = client.request(opts, res => {
      if ((res.statusCode >= 300 && res.statusCode < 400) && ('location' in res.headers)) {        
        ok(resolveUrl(url.resolve(reqUrl, res.headers.location), cert, redirectsSoFar++));
      } else {
        ok(url.format(reqUrl));
      }
    });
    req.end();
  }); 
};