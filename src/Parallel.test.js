import { Parallel } from "./Parallel";

describe("Parallel", () => {
  test("must be a constructor", () => {
    const runner = new Parallel();
    expect(runner).toBeInstanceOf(Parallel);
  });
  test("must support channing", () => {
    const runner = new Parallel();
    const result = runner.job(() => {}).job(() => {});
    expect(result).toBe(runner);
  });
  test("must perform tasks in parallel with the limit", async () => {
    const order = [];
    const runner = new Parallel(2);
    const result = await new Promise((resolve) => {
      runner
        .job((done) =>
          setTimeout(() => {
            order.push("A");
            done("A");
          }, 50),
        )
        .job((done) =>
          setTimeout(() => {
            order.push("B");
            done("B");
          }, 30),
        )
        .job((done) =>
          setTimeout(() => {
            order.push("C");
            done("C");
          }, 10),
        )
        .done(resolve);
    });
    expect(result).toEqual(["A", "B", "C"]);
    expect(order).toEqual(["B", "C", "A"]);
  });
});
