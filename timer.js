class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    if (callbacks) {
      const { onStart, onTick, onComplete } = callbacks;
      this.onStart = onStart;
      this.onTick = onTick;
      this.onComplete = onComplete;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  start = () => {
    this.onStart && this.onStart(this.timeRemaining);
    this.tick();
    this.intervalId = setInterval(this.tick, 10);
  };

  pause = () => {
    clearInterval(this.intervalId);
    this.onComplete();
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      this.onComplete && this.onComplete();
    } else {
      this.onTick();
      this.timeRemaining = this.timeRemaining - 0.01;
      this.onTick && this.onTick(this.timeRemaining);
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
