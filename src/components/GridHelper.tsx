import { Line } from "@react-three/drei";
import { Vector3, Line3 } from "three";

export function GridHelper({
  gridSpacing = 1.0,
  gridLineCount = 50,
  gridThickFrequency = 10,
}) {
  const origin = new Vector3(0, 0, 0);
  const xMin = -gridLineCount * gridSpacing;
  const yMin = xMin;
  const xMax = gridLineCount * gridSpacing;
  const yMax = xMax;
  let minorLines: Line3[] = [];
  let majorLines: Line3[] = [];
  for (let i = -gridLineCount; i <= gridLineCount; i++) {
    let x = i * gridSpacing;
    let y = i * gridSpacing;
    if (i === 0) {
      majorLines.push(new Line3(new Vector3(0, yMin, 0), new Vector3(0, 0, 0)));
      majorLines.push(new Line3(new Vector3(xMin, 0, 0), new Vector3(0, 0, 0)));
      continue;
    }

    if (i % gridThickFrequency === 0) {
      majorLines.push(
        new Line3(new Vector3(x, yMin, 0), new Vector3(x, yMax, 0))
      );
      majorLines.push(
        new Line3(new Vector3(xMin, y, 0), new Vector3(xMax, y, 0))
      );
    } else {
      minorLines.push(
        new Line3(new Vector3(x, yMin, 0), new Vector3(x, yMax, 0))
      );
      minorLines.push(
        new Line3(new Vector3(xMin, y, 0), new Vector3(xMax, y, 0))
      );
    }
  }

  return (
    <group>
      <Line points={[origin, new Vector3(xMax, 0, 0)]} color={0xff0000} />
      <Line points={[origin, new Vector3(0, yMax, 0)]} color={0x008000} />
      {majorLines.map((line, i) => (
        <Line
          key={`majorLines_${i}`}
          points={[line.start, line.end]}
          linewidth={0.5}
          color={0x222222}
        />
      ))}
      {minorLines.map((line, i) => (
        <Line
          key={`minorLines_${i}`}
          points={[line.start, line.end]}
          linewidth={0.3}
          color={0x666666}
        />
      ))}
    </group>
  );
}
