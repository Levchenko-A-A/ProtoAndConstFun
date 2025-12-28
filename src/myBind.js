Function.prototype.myBind = function (context, ...boundArgs) {
  const originalFunction = this;
  return function (...args) {
    const tempKey = Symbol("temp");
    context[tempKey] = originalFunction;
    const result = context[tempKey](...boundArgs, ...args);
    delete context[tempKey];
    return result;
  };
};

export default Function.prototype.myBind;
