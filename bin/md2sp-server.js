#!/usr/bin/env node
var md2sp = require('../index');
var config = require('../lib/config');
var http = require('http');
var args = process.argv.slice(2);
var port = args[0] || process.env.PORT || 6327;
var data;

var handlers = {
  GET: function (req, res) {
    res.end('<html><head><title>md2sp server</title><style>body{font-family:Arial,sans-serif;}</style></head><body><h1>md2sp server</h1><p>Send a TOML POST to <code>/new</code> or <code>/edit</code> on this server to post it to ' + data.blogname + '</p></body></html>')
  },
  POST: function (req, res) {
    var body = '', edit;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    if (req.url === '/new' || req.url === '/edit') {
      edit = (req.url === '/edit');
      // Add a post
      req.on('data', function (chunk) {
        body += chunk;
      });
      req.on('end', function () {
        md2sp.post(body, edit).then(function (r) {
          res.end(JSON.stringify(r));
        });
      });
    } else {
      res.statusCode = 404;
      res.end();
    }
  }
};

var server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method in handlers) {
    handlers[req.method].call(null, req, res);
  }
});
config.get().then(function (cfg) {
  if (!cfg.password) {
    console.log('The md2sp server requires you store your password (for now).');
    process.exit(1);
  }
  data = cfg;
  server.listen(port);
  console.log('md2sp server listening on port', port);
});
