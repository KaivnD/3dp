/// <reference types="three" />

declare type AttributeArrayType =
  | "Uint16Array"
  | "Uint32Array"
  | "Float32Array";

declare interface AttributeArray {
  itemSize: number;
  type: AttributeArrayType;
  array: number[];
}

declare interface MeshBufferData {
  index: AttributeArray;
  attributes: Record<string, AttributeArray>;
}

declare interface MeshBuffer {
  data: MeshBufferData;
}

declare type Vec3 = [number, number, number];

declare type Vec3Array = Array<Vec3>;
declare type BufferArray = Array<number>;

declare interface WireDisplayOption {
  color?: THREE.ColorRepresentation;
  lineWidth?: number;
}

declare interface Wire {
  data: Vec3Array;
  options?: WireDisplayOption;
}

declare interface WireBuffer {
  data: BufferArray;
  options?: WireDisplayOption;
}

declare interface DisplayPortalWiresOption {
  color?: THREE.ColorRepresentation;
  lineWidth?: number;
}

declare interface DisplayPortalBuffersOption {
  defaultMatParams: THREE.MeshStandardMaterialParameters;
}

declare interface DisplayPortalOption {
  wires?: DisplayPortalWiresOption;
  buffers?: DisplayPortalBuffersOption;
}
