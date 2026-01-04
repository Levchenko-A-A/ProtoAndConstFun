export async function fetchRetry(url, retries, delay) {
  if (typeof url !== "string" || !url) {
    throw new Error("URL должен быть непустой строкой");
  }
  if (!Number.isInteger(retries) || retries <= 0) {
    throw new Error("retries должен быть положительным целым числом");
  }
  if (!Number.isInteger(delay) || delay < 0) {
    throw new Error("delay должен быть неотрицательным целым числом");
  }
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      console.error(
        `Попытка ${attempt} из ${retries} не удалась:`,
        error.message,
      );
      if (attempt === retries) {
        throw new Error(
          `Все ${retries} попыток завершились неудачно. Последняя ошибка: ${error.message}`,
        );
      }
      console.log(`Повторная попытка через ${delay}мс...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// fetchRetry('https://mail.ru', 3, 1000)
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.error('Ошибкампосле всех попыток:', error));
