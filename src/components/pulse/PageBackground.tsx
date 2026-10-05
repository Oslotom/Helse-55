// Faded isometric-cube backdrop drawn in SVG, with halftone dot corners.
const W = 104; // tile width  (cube side 60 -> 60 * sqrt(3))
const H = 180; // tile height (two staggered cube rows)

const top = "52,0 104,30 52,60 0,30";
const left = "0,30 52,60 52,120 0,90";
const right = "52,60 104,30 104,90 52,120";

function Cube({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x - 52} ${y - 60})`}>
      <polygon points={top} fill="var(--foreground)" fillOpacity="0.015" />
      <polygon points={left} fill="var(--foreground)" fillOpacity="0.045" />
      <polygon points={right} fill="var(--foreground)" fillOpacity="0.085" />
    </g>
  );
}

const fade = (shape: string) => ({
  maskImage: shape,
  WebkitMaskImage: shape,
});

export function PageBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 size-full"
        style={fade("radial-gradient(ellipse 85% 70% at 25% 25%, black 10%, transparent 75%)")}
      >
        <defs>
          <pattern
            id="iso-cubes"
            width={W}
            height={H}
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1.4)"
          >
            <Cube x={52} y={60} />
            <Cube x={0} y={150} />
            <Cube x={104} y={150} />
            <Cube x={0} y={-30} />
            <Cube x={104} y={-30} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#iso-cubes)" />
      </svg>

      {/* halftone dots, bottom-left and top-right */}
      <div
        className="absolute -bottom-10 -left-10 size-96 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(var(--foreground) 1.2px, transparent 1.4px)",
          backgroundSize: "9px 9px",
          ...fade("radial-gradient(circle at 30% 70%, black, transparent 70%)"),
        }}
      />
      <div
        className="absolute -top-10 -right-10 size-80 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(var(--foreground) 1.2px, transparent 1.4px)",
          backgroundSize: "9px 9px",
          ...fade("radial-gradient(circle at 70% 30%, black, transparent 70%)"),
        }}
      />
    </div>
  );
}
