import { fetchRetry } from "./fetchRetry.js";

global.fetch = jest.fn();

describe("fetchRetry", () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  describe("Validation of arguments", () => {
    test("error with invalid URL", async () => {
      await expect(fetchRetry("", 3, 1000)).rejects.toThrow(
        "URL должен быть непустой строкой",
      );
      await expect(fetchRetry(123, 3, 1000)).rejects.toThrow(
        "URL должен быть непустой строкой",
      );
      await expect(fetchRetry(null, 3, 1000)).rejects.toThrow(
        "URL должен быть непустой строкой",
      );
    });
    test("should throw an error if the retries are invalid", async () => {
      await expect(fetchRetry("https://test.com", 0, 1000)).rejects.toThrow(
        "retries должен быть положительным целым числом",
      );
      await expect(fetchRetry("https://test.com", -1, 1000)).rejects.toThrow(
        "retries должен быть положительным целым числом",
      );
      await expect(fetchRetry("https://test.com", 1.5, 1000)).rejects.toThrow(
        "retries должен быть положительным целым числом",
      );
      await expect(fetchRetry("https://test.com", "3", 1000)).rejects.toThrow(
        "retries должен быть положительным целым числом",
      );
    });
    test("should throw an error if the delay is invalid", async () => {
      await expect(fetchRetry("https://test.com", 3, -1)).rejects.toThrow(
        "delay должен быть неотрицательным целым числом",
      );
      await expect(fetchRetry("https://test.com", 3, 1.5)).rejects.toThrow(
        "delay должен быть неотрицательным целым числом",
      );
      await expect(fetchRetry("https://test.com", 3, "1000")).rejects.toThrow(
        "delay должен быть неотрицательным целым числом",
      );
    });
    test("should accept delay = 0 as a valid value", async () => {
      fetch.mockResolvedValueOnce({ ok: true });
      await expect(fetchRetry("https://test.com", 1, 0)).resolves.not.toThrow();
    });
  });
  describe("notification on successful request", () => {
    test("It should return a successful response on the first attempt.", async () => {
      const mockResponse = { ok: true };
      fetch.mockResolvedValueOnce(mockResponse);
      const result = await fetchRetry("https://test.com", 3, 1000);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("https://test.com");
      expect(result).toEqual(mockResponse);
    });
    test("should stop after a successful attempt (not all attempts)", async () => {
      const mockResponse = { ok: true };
      fetch
        .mockRejectedValueOnce(new Error("Network error"))
        .mockResolvedValueOnce(mockResponse);
      const result = await fetchRetry("https://test.com", 3, 100);
      expect(fetch).toHaveBeenCalledTimes(2); // только 2 попытки, а не 3
      expect(result).toEqual(mockResponse);
    });
  });
});
