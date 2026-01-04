import { serialProcess } from "./serialProcess";

describe("serialProcess", () => {
  test("processes the array sequentially", async () => {
    const order = [];
    const results = await serialProcess([1, 2, 3], (el, idx, arr, done) => {
      order.push(`start-${el}`);
      setTimeout(
        () => {
          order.push(`end-${el}`);
          done(el * 10);
        },
        (3 - el) * 10,
      );
    });
    expect(results).toEqual([10, 20, 30]);
    expect(order).toEqual([
      "start-1",
      "end-1",
      "start-2",
      "end-2",
      "start-3",
      "end-3",
    ]);
  });
  test("preserves the order of the results regardless of the execution time", async () => {
    const results = await serialProcess([1, 2, 3], (el, idx, arr, done) => {
      setTimeout(
        () => {
          done(el * 100);
        },
        (3 - el) * 100,
      );
    });
    expect(results).toEqual([100, 200, 300]);
  });
  test("works with an empty array", async () => {
    const results = await serialProcess([], (el, idx, arr, done) => {
      done(el);
    });
    expect(results).toEqual([]);
  });
  test("passes the correct arguments to the handler", async () => {
    const calls = [];
    await serialProcess(["a", "b"], (el, idx, arr, done) => {
      calls.push({ el, idx, arr: [...arr] });
      done(null);
    });
    expect(calls).toEqual([
      { el: "a", idx: 0, arr: ["a", "b"] },
      { el: "b", idx: 1, arr: ["a", "b"] },
    ]);
  });
  test("handles synchronous handlers", async () => {
    const results = await serialProcess([1, 2, 3], (el, idx, arr, done) => {
      done(el * 2);
    });
    expect(results).toEqual([2, 4, 6]);
  });
  test("works with asynchronous operations", async () => {
    const results = await serialProcess([1, 2], (el, idx, arr, done) => {
      Promise.resolve().then(() => {
        done(el + 10);
      });
    });
    expect(results).toEqual([11, 12]);
  });
});
