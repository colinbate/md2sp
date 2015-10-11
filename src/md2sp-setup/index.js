import pipeline from 'tuberia-core';

let checkAccess = pipeline('Check Access'
  //resolveUrl(),
  //metaweblogGetUsersBlogs()
);

export default function setup() {
// readConfig('md2sp.toml', toml()).optional(),
// where((d,c) => c.config.url), print('There is already a blog here!')),
// ask.yesNo('Do you want to setup a blog here?').key('setupHere')
// stop('Quitting').when(d => !d.meta.setupHere)
// ask.yesNo('Is it a sharepoint blog?').key('isSharepoint'),
// ask.string(d => d.meta.isSharepoint ? 'Enter blog URL:' : 'Enter metaweblog endpoint:').key('url'),
// normalizeUrl(),
// ask.string('Username:'),
// ask.password('Password:'),
// ask.string('Stylesheet (blank for none):').key('cssFile'),
// ask.string('Enter cert file (blank for none):').key('cert'),
// ask.yesNo('Save password to config file (will be plain text)').key('savePwd'),
// // Setup Context (Set no NTLM, load cert, etc)
// setupContext(false), // no NTLM
// checkAccess(),
// where(d => !d.meta.blogName, setupContext(true), checkAccess()),
// stop('Could not fetch blog information.').when(d => !d.meta.blogName),
// writeConfig('md2sp.toml', removeSensitiveInfo(), toml.generate())
}