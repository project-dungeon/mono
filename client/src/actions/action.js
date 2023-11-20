export default class Action {
  subject;

  constructor(subject) {
    this.subject = subject;
  }

  perform() {
    throw new Error("perform() method must be implemented");
  }
}
