module.exports = class FSM {
  constructor(config) {
    this.states = config.states;
    this.initial= config.initial;
    this.arr    = [this.initial];
    this.count  = 0;
    this.bul    = true;
  }

  getState() {
    return this.initial;
  }

  changeState(state) {
    if (this.states.hasOwnProperty(state)) {
      this.initial = state;
      this.arr.push(this.initial);
      this.bul = true;
    } else throw new Error();
  }

  trigger(event) {
    for (let i in this.states[this.initial].transitions) {
      if (i === event) {
        this.initial = this.states[this.initial].transitions[event];
        this.arr.push(this.initial);
        this.bul = true;
        return;
      }
    }
    throw new Error();
  }

  reset() {
    this.initial = "normal";
  }

  getStates(event) {
    let arrEvent = [];
    for (let i in this.states) {
      if (arguments.length > 0 && this.states[i].transitions.hasOwnProperty(event) || arguments.length === 0) {
        arrEvent.push(i);
      }
    }
    return arrEvent;
  }

  undo() {
    if (this.arr.length - this.count > 1) {
      this.count++;
      this.initial = this.arr[this.arr.length - this.count - 1];
      this.bul = false;
      return true;
    } else return false;
  }

  redo() {
    if (!this.bul && this.count > 0) {
      this.count--;
      this.initial = this.arr[this.arr.length - this.count - 1];
      return true;
    } else return false;
  }

  clearHistory() {
    this.arr = [];
    this.count = 0;
  }
}
