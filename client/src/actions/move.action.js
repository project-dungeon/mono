import Action from "./action";

export default class MoveAction extends Action {
  #x;
  #y;

  constructor(subject, x, y) {
    super(subject);
    this.#x = x;
    this.#y = y;
  }

  perform() {
    this.subject.gameObject.position.x = this.#x;
    this.subject.gameObject.position.y = this.#y;
  }
}
