export function serialProcess(array, handler) {
  return new Promise((resolve) => {
    const results = new Array(array.length);
    let index = 0;
    function processNext() {
      if (index >= array.length) {
        resolve(results);
        return;
      }
      const currentIndex = index;
      const element = array[currentIndex];
      handler(element, currentIndex, array, (result) => {
        results[currentIndex] = result;
        index++;
        processNext();
      });
    }
    processNext();
  });
}
