import { debounce } from "./debounce.js";

describe("debounce", () => {
  jest.useFakeTimers();
  test("basic delay", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);
    debouncedFn();
    expect(mockFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  test("timer reset on re-call", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);
    debouncedFn();
    jest.advanceTimersByTime(50);
    debouncedFn();
    jest.advanceTimersByTime(50);
    expect(mockFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(50);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  test("passing arguments", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);
    debouncedFn("hello", 42);
    jest.advanceTimersByTime(100);
    expect(mockFn).toHaveBeenCalledWith("hello", 42);
  });
});
