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

  json() {
    return {
      x: this.x,
      y: this.y,
    };
  }
}
