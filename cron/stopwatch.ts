export class Stopwatch {
  private startTime: number | null;
  private stopTime: number | null;

  constructor() {
    this.startTime = null;
    this.stopTime = null;
  }

  start() {
    if (this.startTime === null) {
      this.startTime = Date.now();
      this.stopTime = null;
    } else {
      console.error('Stopwatch is already running.');
    }
  }

  stop() {
    if (this.startTime !== null && this.stopTime === null) {
      this.stopTime = Date.now();
    } else {
      console.error('Stopwatch is not running.');
    }
  }

  reset() {
    this.startTime = null;
    this.stopTime = null;
  }

  getElapsedTime(): number {
    if (this.startTime !== null) {
      const stopTime = this.stopTime !== null ? this.stopTime : Date.now();

      return stopTime - this.startTime;
    } else {
      console.error('Stopwatch has not been started.');

      return 0;
    }
  }

  convertToHHMMSS(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}
