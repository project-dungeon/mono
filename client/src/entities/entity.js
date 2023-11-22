export const EntityType = {
  Dummy: 0,
  Terrain: 1,
  GameObject: 2,
};

export default class Entity {
  id = window.crypto.randomUUID();

  get movementSpeed() {
    return 0;
  }

  get type() {
    throw new Error("type getter must be implemented");
  }

  get gameObject() {
    throw new Error("gameObject getter must be implemented");
  }

  click(x, y, z) {}

  update() {
    throw new Error("animate() method must be implemented");
  }

  destroy() {
    throw new Error("destroy() method must be implemented");
  }
}
