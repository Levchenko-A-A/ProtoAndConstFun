import { User } from "./myUser.js";

describe("User", () => {
  beforeEach(() => {
    global.prompt = jest
      .fn()
      .mockReturnValueOnce("Иван")
      .mockReturnValueOnce("30");
    global.alert = jest.fn();
    global.console.log = jest.fn();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("creates instance with null properties", () => {
    const user = new User();
    expect(user.name).toBeNull();
    expect(user.age).toBeNull();
  });
  test("methods support chaining", () => {
    const user = new User();
    const result = user.askName().askAge();
    expect(result).toBe(user);
    expect(user.name).toBe("Иван");
    expect(user.age).toBe(30);
  });
  test("full chain from task works", () => {
    const user = new User();
    const result = user.askName().askAge().showAgeInConsole().showNameInAlert();

    expect(result).toBe(user);
    expect(console.log).toHaveBeenCalledWith("Возраст: 30");
    expect(alert).toHaveBeenCalledWith("Имя: Иван");
  });
});
