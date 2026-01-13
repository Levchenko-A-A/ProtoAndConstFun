import "./myBind.js";

describe("myBind", () => {
  test("should bind context correctly", () => {
    function getName() {
      return this.name;
    }
    const obj = { name: "John" };
    const boundFunc = getName.myBind(obj);

    expect(boundFunc()).toBe("John");
  });
  test("should bind context with arguments", () => {
    function sum(a, b) {
      return this.base + a + b;
    }
    const obj = { base: 10 };
    const boundFunc = sum.myBind(obj, 5);

    expect(boundFunc(3)).toBe(18);
  });
  test("binds context correctly", () => {
    function greet() {
      return `Hello, ${this.name}`;
    }

    const person = { name: "Alice" };
    const greetAlice = greet.myBind(person);

    expect(greetAlice()).toBe("Hello, Alice");
  });
});
