export const attributeType = {
  Position: 1,
  Movement: 2,
  Rotation: 3,
  Chat: 4,
};

export class Attribute {
  get type() {
    throw new Error("type getter must be implemented");
  }

  json() {
    throw new Error("json  must be implemented");
  }
}
