import chatboxUi from "../ui/chatbox/chatbox.ui";
import Controller from "./controller";

export default class UiController extends Controller {
  static #root;

  static #mountUi(ui) {
    const { script, html } = ui;
    this.#root.innerHTML += html;
    const scriptEl = document.createElement("script");
    scriptEl.innerHTML = script;
    this.#root.appendChild(scriptEl);
  }

  static #mountChatbox() {
    this.#mountUi(chatboxUi);
  }

  static {
    UiController.#root = document.getElementById("ui-root");
    this.#mountChatbox();
  }

  static update() {}
}
