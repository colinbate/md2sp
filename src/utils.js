
export function isPromise(obj) {
  return obj != null && typeof obj.then === 'function';
}

export function forcePromise(fn, ...args) {
  if (typeof fn !== 'function') {
    throw new Error('forcePromise takes a function as the first parameter');
  }
  let val;
  try {
    val = fn.apply(null, args);
  } catch (e) {
    return Promise.reject(e);
  }
  return isPromise(val) ? val : Promise.resolve(val);
}

export function denode(fn, ...args) {
  if (typeof fn !== 'function') {
    throw new Error('denode takes a function as the first parameter');
  }
  return new Promise(function (res, rej) {
    args.push(function (err, ...cbarg) {
      if (err) {
        rej(err);
        return;
      }
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