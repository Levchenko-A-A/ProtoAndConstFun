export function promisify(fn) {
  return function promisify(...args) {
    return new Promise((resolve, reject) => {
      const callback = (err, ...results) => {
        if (err != null) {
          reject(err);
        } else if (results.length <= 1) {
          resolve(results[0]);
        } else {
          resolve(results);
        }
      };
      try {
        fn.apply(this, [...args, callback]);
      } catch (err) {
        reject(err);
      }
    });
  };
}
