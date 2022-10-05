import { FC, useMemo } from "react";
import { BufferGeometryLoader } from "three";

interface MeshBufferGeometryProps {
  data: MeshBuffer;
  option?: DisplayPortalBuffersOption;
}

export const MeshBufferGeometry: FC<MeshBufferGeometryProps> = ({
  data,
  option,
}) => {
  const buffer = useMemo(() => {
    const loader = new BufferGeometryLoader();

    return loader.parse(data);
  }, [data]);
  return (
    <mesh geometry={buffer}>
      <meshStandardMaterial attach="material" {...option?.defaultMatParams} />
    </mesh>
  );
};
