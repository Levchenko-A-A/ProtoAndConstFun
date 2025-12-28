import { ForceConstructor } from "./myForceConstructor";

describe("ForceConstructor", () => {
  test("works with new keyword", () => {
    const obj = new ForceConstructor("test", 123, true);
    expect(obj.param1).toBe("test");
    expect(obj.param2).toBe(123);
    expect(obj.param3).toBe(true);
  });
  test("works without new keyword", () => {
    const obj = ForceConstructor("test", 123, true);
    expect(obj.param1).toBe("test");
    expect(obj.param2).toBe(123);
    expect(obj.param3).toBe(true);
  });
  test("creates same result with and without new", () => {
    const withNew = new ForceConstructor("a", "b", "c");
    const withoutNew = ForceConstructor("a", "b", "c");
    expect(withNew.param1).toBe(withoutNew.param1);
    expect(withNew.param2).toBe(withoutNew.param2);
    expect(withNew.param3).toBe(withoutNew.param3);
  });
});
