import { prompt } from 'prompt';
import { denode } from './utils';

prompt.message = '';
prompt.delimiter = '';

// ===== Internal ======

function pick (field) {
  return function (obj) {
    return obj[field];
  };
}

// ======= API =========

export function forMultiple(specs) {
  return denode(::prompt.get, specs);
}

export function question(question) {
  return denode(::prompt.confirm, question);
}

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
