interface LogoProps {
  variant?: "full" | "mark";
  className?: string;
}

// Stroke-built condensed caps on a 32-unit grid: cap height 24 (y 4–28),
// stroke 4, letter width 14, advance 18. x = left edge of the letter box.
const LETTER = {
  J: (x: number) => `M${x + 2} 6H${x + 12}V21A5 5 0 0 1 ${x + 2} 21`,
  G: (x: number) =>
    `M${x + 11} 6H${x + 5}Q${x + 2} 6 ${x + 2} 9V23Q${x + 2} 26 ${x + 5} 26H${x + 9}Q${x + 12} 26 ${x + 12} 23V17H${x + 7}`,
  B: (x: number) =>
    `M${x + 2} 4V28M${x + 2} 6H${x + 8}A4 4 0 0 1 ${x + 8} 14H${x + 2}M${x + 2} 14H${x + 8}A4 6 0 0 1 ${x + 8} 26H${x + 2}`,
  N: (x: number) => `M${x + 2} 28V4L${x + 12} 28V4`,
  // I gets a narrow slot (10 instead of 18 advance) so it doesn't leave holes
  I: (x: number) => `M${x + 5} 4V28`,
  T: (x: number) => `M${x + 2} 6H${x + 12}M${x + 7} 6V28`,
};

const LetterO = (props: { x: number }) => (
  <rect
    x={props.x + 2}
    y={6}
    width={10}
    height={20}
    rx={5}
    fill="none"
    stroke="currentColor"
    strokeWidth={4}
  />
);

const PENTAGON_ANGLES = [90, 162, 234, 306, 18];

const point = (cx: number, cy: number, r: number, deg: number): [number, number] => {
  const rad = (deg * Math.PI) / 180;
  return [
    +(cx + r * Math.cos(rad)).toFixed(2),
    +(cy - r * Math.sin(rad)).toFixed(2),
  ];
};

// Telstar football: yellow disc, central pentagon, partial pentagon patches
// at the silhouette edge, and Y-forked seams connecting vertices to patches
// (the fork network is what makes it read as stitched panels, not a gear).
const Ball = (props: {
  cx: number;
  cy: number;
  r: number;
  pentagonR: number;
  seamWidth: number;
  strokeWidth: number;
}) => {
  const { cx, cy, r, pentagonR } = props;
  const forkR = r * 0.62;
  const patchInnerR = r * 0.78;

  const patchPath = (vertexDeg: number) => {
    // rim patches sit opposite the pentagon's edges, offset 36° from vertices
    const phi = vertexDeg + 36;
    const [ax, ay] = point(cx, cy, r, phi - 17);
    const [bx, by] = point(cx, cy, patchInnerR, phi - 9);
    const [cx2, cy2] = point(cx, cy, patchInnerR, phi + 9);
    const [dx, dy] = point(cx, cy, r, phi + 17);
    return `M${ax} ${ay}L${bx} ${by}L${cx2} ${cy2}L${dx} ${dy}A${r} ${r} 0 0 1 ${ax} ${ay}Z`;
  };

  const seamPath = (vertexDeg: number) => {
    // pentagon vertex -> fork point -> inner corners of both adjacent patches
    const [vx, vy] = point(cx, cy, pentagonR, vertexDeg);
    const [fx, fy] = point(cx, cy, forkR, vertexDeg);
    const [ax, ay] = point(cx, cy, patchInnerR, vertexDeg + 27);
    const [bx, by] = point(cx, cy, patchInnerR, vertexDeg - 27);
    return `M${ax} ${ay}L${fx} ${fy}L${vx} ${vy}M${fx} ${fy}L${bx} ${by}`;
  };

  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        className="fill-primary"
        stroke="currentColor"
        strokeWidth={props.strokeWidth}
      />
      {/* panel details use the brand green so they stay dark on the yellow disc
          in both themes (currentColor washes out in dark mode) and match the favicon */}
      <polygon
        points={PENTAGON_ANGLES.map((deg) =>
          point(cx, cy, pentagonR, deg).join(","),
        ).join(" ")}
        className="fill-secondary"
      />
      {PENTAGON_ANGLES.map((deg) => (
        <path
          key={`patch-${deg}`}
          d={patchPath(deg)}
          className="fill-secondary"
        />
      ))}
      {PENTAGON_ANGLES.map((deg) => (
        <path
          key={`seam-${deg}`}
          d={seamPath(deg)}
          fill="none"
          className="stroke-secondary"
          strokeWidth={props.seamWidth}
        />
      ))}
    </>
  );
};

export const Logo = (props: LogoProps) => {
  if (props.variant === "mark") {
    return (
      <svg
        viewBox="0 0 32 32"
        className={props.className}
        role="img"
        aria-label="Jogo Bonito"
      >
        <title>Jogo Bonito</title>
        <Ball cx={16} cy={16} r={14} pentagonR={5.5} seamWidth={1.8} strokeWidth={2.5} />
      </svg>
    );
  }

  // JOGO (the last "O" is the ball) — BONITO
  // Ball sits tight against the G so it reads as JOGO's final letter;
  // the word gap before B stays visibly larger than the letter gap.
  const letters = [
    LETTER.J(2),
    LETTER.G(38),
    LETTER.B(90),
    LETTER.N(126),
    LETTER.I(144),
    LETTER.T(154),
  ].join("");

  return (
    <svg
      viewBox="0 0 186 32"
      className={props.className}
      role="img"
      aria-label="Jogo Bonito"
    >
      <title>Jogo Bonito</title>
      <path d={letters} fill="none" stroke="currentColor" strokeWidth={4} />
      <LetterO x={20} />
      <LetterO x={108} />
      {/* tucked under the T bar — the T is stem-only below it */}
      <LetterO x={170} />
      <Ball cx={68} cy={16} r={12} pentagonR={4.5} seamWidth={1.6} strokeWidth={2.5} />
    </svg>
  );
};
