import Store from "../store.js";
import Model from "./model.js";

export default class WorldLocationModel extends Model {
  store = new Store();

  set(id, location) {
    this.store.set(id, location);
  }

  get(id) {
    return this.store.get(id);
  }

  delete(id) {
    this.store.delete(id);
  }
}
