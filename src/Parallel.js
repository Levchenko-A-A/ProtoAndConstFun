export class Parallel {
  constructor(limit = Infinity) {
    this.maxConcurrent = limit;
    this.tasks = [];
    this.results = [];
    this.running = 0;
    this.doneCallback = null;
    this.taskIndex = 0;
    this.isStarted = false;
  }
  job(fn) {
    this.tasks.push({ fn, index: this.taskIndex++ });
    return this;
  }
  done(cb) {
    this.doneCallback = cb;
    this.results = new Array(this.tasks.length);
    if (this.tasks.length === 0) {
      setTimeout(() => cb([]), 0);
      return;
    }
    this.isStarted = true;
    this._runNextTasks();
  }
  _runNextTasks() {
    while (this.running < this.maxConcurrent && this.tasks.length > 0) {
      this._runTask();
    }
  }
  _runTask() {
    if (this.tasks.length === 0) return;
    const task = this.tasks.shift();
    this.running++;
    task.fn((result) => {
      this.results[task.index] = result;
      this.running--;
      if (this.tasks.length === 0 && this.running === 0) {
        this._complete();
      } else {
        this._runNextTasks();
      }
    });
  }
  _complete() {
    if (this.doneCallback) {
      this.doneCallback(this.results);
    }
    this.isStarted = false;
  }
}
