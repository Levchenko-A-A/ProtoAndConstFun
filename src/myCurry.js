export function curry(fn) {
  return function curried(...args) {
    const context = this;
    if (args.length >= fn.length) {
      return fn.apply(context, args);
    } else {
      return function (...args2) {
        return curried.apply(context, args.concat(args2));
      };
    }
  };
}
