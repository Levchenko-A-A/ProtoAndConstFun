import { curry } from "./myCurry.js";

describe("curry function", () => {
  test("basic currying works", () => {
    const sum2 = (a, b) => a + b;
    expect(curry(sum2)(1, 2)).toBe(3);
    expect(curry(sum2)(1)(2)).toBe(3);
  });

  test("task examples work", () => {
    function sum2(x, y) {
      return x + y;
    }
    function sum4(a, b, c, d) {
      return a + b + c + d;
    }

    expect(curry(sum2)(1)(2)).toBe(3);
    expect(curry(sum4)(2)(3)(4)(5)).toBe(14);
  });

  test("partial application works", () => {
    const multiply = (a, b, c) => a * b * c;
    const curried = curry(multiply);
    const double = curried(2);
    const triple = double(3);

    expect(triple(4)).toBe(24);
    expect(triple(5)).toBe(30);
  });

  test("works with different number of arguments", () => {
    expect(curry(() => 42)()).toBe(42);
    expect(curry((x) => x * 2)(5)).toBe(10);
    expect(curry((a, b, c) => a + b + c)(1)(2)(3)).toBe(6);
  });
});
