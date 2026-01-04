import { promisify } from "./promisify";
describe("promisify", () => {
  test("successful execution resolve", async () => {
    const func = (a, b, cb) => setTimeout(() => cb(null, a + b), 0);
    const promisified = promisify(func);
    expect(await promisified(2, 3)).toBe(5);
  });
  test("error in the callback rejection", async () => {
    const func = (cb) => setTimeout(() => cb("error"), 0);
    const promisified = promisify(func);
    await expect(promisified()).rejects.toBe("error");
  });
  test("passes the correct number of arguments", async () => {
    const func = (a, b, c, cb) => setTimeout(() => cb(null, a + b + c), 0);
    const promisified = promisify(func);
    expect(await promisified(1, 2, 3)).toBe(6);
  });
});
