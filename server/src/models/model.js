export default class Model {
  subscribe(key, action, cb) {
    return this.store.subscribe(key, action, cb);
  }

  unsubscribe(key, action, cb) {
    this.store.unsubscribe(key, action, cb);
  }
}
