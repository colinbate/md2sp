import prompt from 'prompt';
import pify from 'pify';

prompt.message = '';
prompt.delimiter = '';

// ===== Internal ======

function pick (field) {
  return function (obj) {
    return obj[field];
  };
}

let forMultiple = pify(::prompt.get);
let question = pify(::prompt.confirm);

// ======= API =========

export { forMultiple, question };

export function forString(label) {
  return Promise.resolve([{
    name: 'mystring',
    description: label
  }]).then(promptAsync).then(pick('mystring'));
}

export function forPassword(label) {
  return Promise.resolve([{
    name: 'password',
    description: label,
    hidden: true
  }]).then(promptAsync).then(pick('password'));
}

export function start() {
  prompt.start();
}
