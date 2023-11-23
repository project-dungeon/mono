import Store from "../store.js";
import Model from "./model.js";

export default class ObjectModel extends Model {
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

  nearby(id, radius) {
    const location = this.get(id)?.position;
    if (!location) {
      return [];
    }
    return this.store
      .filter(([, value]) => {
        const distance = location.distance(value.position);
        return distance <= radius;
      })
      .map(([key]) => key);
  }
}
