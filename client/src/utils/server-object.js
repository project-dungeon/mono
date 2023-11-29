import { attributeType } from "../constants";

export default class ServerObject {
  constructor(data) {
    const baseProxiedMixinProperties = {
      _attributes: data.attributes,
      id: data.id,
      gameObjectId: data.gameObjectId,
      name: data.name,
    };
    const attributeProxyGetterMap = {
      position: attributeType.Position,
      movement: attributeType.Movement,
      rotation: attributeType.Rotation,
      chat: attributeType.Chat,
    };
    return new Proxy(this, {
      get: function (_, prop) {
        if (prop in baseProxiedMixinProperties) {
          return baseProxiedMixinProperties[prop];
        } else {
          return baseProxiedMixinProperties._attributes.find(
            (attribute) => attribute.type === attributeProxyGetterMap[prop]
          )?.value;
        }
      },
      set() {
        throw new Error("Cannot set properties on immutable ServerObject");
      },
    });
  }
}
