import pipeline from '../tuberia';
import dump from '../tuberia-module-dump';

export default function setup() {
// check config
// if config warn about overwriting
// "Do you want to setup a blog here?" (No exit)
// "Is it a Sharepoint blog?"
// sharepoint ? 'Enter blog URL:' : 'Enter metaweblog endpoint:'
// Normalize SP Url
// Url, username, password, style sheet
// Save password?
// Need cert? Enter cert (can be blank for none)
// Setup Context (Set no NTLM, load cert, etc)
// Check URL (redirects)
// API Call: getUsersBlogs
// If fail:
//   Update Context (Set NTLM)
//   API Call: getUsersBlogs
//   If fail: abort
// Strip password if not saving it
// Save config info to config file
}