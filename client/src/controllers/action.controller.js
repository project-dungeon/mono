import Controller from "./controller";

export default class ActionController extends Controller {
  static #actions = [];

  static dispatch(action) {
    this.#actions.push(action);
  }

  static update() {
    for (const action of this.#actions) {
      action.perform();
    }
    this.#actions = [];
  }
}
