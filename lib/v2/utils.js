
let slice = Function.prototype.call.bind(Array.prototype.slice);

export { slice };

export function isPromise(obj) {
  return obj != null && typeof obj.then === 'function';
}

export function forcePromise() {
  let args = slice(arguments);
  if (!args.length || typeof args[0] !== 'function') {
    throw new Error('forcePromise takes a function as the first parameter');
  }
  let fn = args.shift();
  let val;
  try {
    val = fn.apply(null, args);
  } catch (e) {
    return Promise.reject(e);
  }
  return isPromise(val) ? val : Promise.resolve(val);
}

export function denode() {
  let args = slice(arguments);
  if (!args.length || typeof args[0] !== 'function') {
    throw new Error('denode takes a function as the first parameter');
  }
  return new Promise(function (res, rej) {
    let fn = args.shift();
    args.push(function () {
      let cbarg = slice(arguments);
      if (cbarg[0]) {
        rej(cbarg[0]);
        return;
      }
      cbarg.shift();
      if (cbarg.length === 1) {
        res(cbarg[0]);
      } else {
        res(cbarg);
      }
    });
    let val = fn.apply(null, args);
    if (typeof val !== 'undefined') {
      res(val);
    }
  });
}

export function setAddRange(dest, iter) {
  for (let val of iter) {
    dest.add(val);
  }
}