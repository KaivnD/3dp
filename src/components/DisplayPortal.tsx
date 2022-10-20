import { GridHelper } from "./GridHelper";
import { OrbitControls, Line } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Scene } from "three";
import { MeshBufferGeometry } from "./MeshBufferGeometry";
import { useAppSelector } from "../store";

interface ThreeReference {
  scene: Scene;
}

const ThreeReference = forwardRef<ThreeReference>(({}, ref) => {
  const scene = useThree((state) => state.scene);

  useImperativeHandle(
    ref,
    () => {
      return {
        scene,
      };
    },
    []
  );
  return <group></group>;
});

export interface DisplayPortalInstance {
  scene?: Scene;
  clear(): void;
  addMeshes(buffer: MeshBuffer[]): void;
  addWires(buffer: WireBuffer[]): void;
}

interface DisplayPortalProps {
  option?: DisplayPortalOption;
  onMounted?(): void;
}

export const DisplayPortal = forwardRef<
  DisplayPortalInstance,
  DisplayPortalProps
>(({ onMounted, option }, ref) => {
  const threeRef = useRef<ThreeReference>(null);
  const meshes = useAppSelector((state) => state.app.meshbuffers);
  const wires = useAppSelector((state) => state.app.wirebuffers);

  useEffect(() => {
    onMounted && onMounted();
  }, []);

  const __wires = useMemo(() => {
    const res: Wire[] = [];
    for (let { data, options } of wires) {
      const arr: Vec3Array = [];
      for (let i = 0; i < data.length; i += 3) {
        const x = data[i];
        const y = data[i + 1];
        const z = data[i + 2];

        arr.push([x, y, z]);
      }
      res.push({ data: arr, options });
    }
    return res;
  }, [wires]);

  return (
    <Canvas
      style={{ width: "100%" }}
      shadows
      camera={{ position: [60, -60, 60], up: [0, 0, 1], fov: 60 }}
    >
      <ThreeReference ref={threeRef} />
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[500, -500, 500]}
        intensity={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={3000}
        shadow-camera-near={0}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-bias={-0.00005}
      />
      <pointLight position={[0, -10, 0]} intensity={1.5} />
      <OrbitControls enableDamping={false} />
      <mesh rotation={[0, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry attach="geometry" args={[1000, 1000]} />
        <shadowMaterial attach="material" transparent opacity={0.4} />
      </mesh>
      <GridHelper />
      {meshes.map((buffer, i) => (
        <MeshBufferGeometry key={i} data={buffer} option={option?.buffers} />
      ))}
      {__wires.map(({ data, options }, i) => (
        <Line
          key={i}
          points={data}
          {...(options !== undefined ? options : option?.wires)}
        />
      ))}
    </Canvas>
  );
});
