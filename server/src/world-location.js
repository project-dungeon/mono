export default class WorldLocation {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distance(other) {
    return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }

  fuzzyEquals(other, fuzziness = 0.1) {
    return (
      Math.abs(this.x - other.x) <= fuzziness &&
      Math.abs(this.y - other.y) <= fuzziness
    );
  }

  json() {
    return {
      x: this.x,
      y: this.y,
    };
  }
}
