export default class Vector {
  #v;

  constructor(...args) {
    this.#v = args;
  }

  get x() {
    return this.#v[0];
  }

  set x(value) {
    this.#v[0] = value;
  }

  get y() {
    return this.#v[1];
  }

  set y(value) {
    this.#v[1] = value;
  }

  get length() {
    return this.#v.length;
  }

  vector() {
    return this.#v;
  }

  distance(other) {
    let sum = 0;
    for (let i = 0; i < this.length; i++) {
      sum += (other.vector()[i] - this.#v[i]) ** 2;
    }
    return Math.sqrt(sum);
  }

  equals(other) {
    for (let i = 0; i < this.length; i++) {
      if (this.#v[i] !== other.vector()[i]) {
        return false;
      }
    }
    return true;
  }

  fuzzyEquals(other, fuzziness = 0.1) {
    for (let i = 0; i < this.length; i++) {
      if (Math.abs(this.#v[i] - other.vector()[i]) > fuzziness) {
        return false;
      }
    }
    return true;
  }

  location() {
    return { x: this.x, y: this.y };
  }

  angle(other) {
    return Math.atan2(other.x - this.x, other.y - this.y);
  }
}
