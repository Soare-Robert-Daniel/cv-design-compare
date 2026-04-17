// Pixel grid → Braille Unicode converter
// Each Braille char = 2 wide × 4 tall pixels
// 8-dot Braille dot layout:
//   1 4     (row 0)
//   2 5     (row 1)
//   3 6     (row 2)
//   7 8     (row 3)
// Codepoint = 0x2800 + bitwise OR of active dots

const DOT_MAP: [number, number, number][] = [
  [0, 0, 0x01], // dot 1
  [1, 0, 0x02], // dot 2
  [2, 0, 0x04], // dot 3
  [0, 1, 0x08], // dot 4
  [1, 1, 0x10], // dot 5
  [2, 1, 0x20], // dot 6
  [3, 0, 0x40], // dot 7
  [3, 1, 0x80], // dot 8
];

function pixelsToBraille(grid: number[][]): string[] {
  const lines: string[] = [];
  const charRows = Math.ceil(grid.length / 4);
  const charCols = Math.ceil((grid[0]?.length ?? 0) / 2);

  for (let cr = 0; cr < charRows; cr++) {
    let line = "";
    for (let cc = 0; cc < charCols; cc++) {
      let code = 0x2800;
      for (const [rowOff, colOff, bit] of DOT_MAP) {
        const r = cr * 4 + rowOff;
        const c = cc * 2 + colOff;
        if (r < grid.length && c < (grid[r]?.length ?? 0) && grid[r][c]) {
          code |= bit;
        }
      }
      line += String.fromCodePoint(code);
    }
    lines.push(line);
  }
  return lines;
}

// --- Pattern definitions ---

// Diamond / gem shape (8×8)
const DIAMOND: number[][] = [
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
];

// QR-code finder pattern (7×7) — iconic tech motif
const QR_FINDER: number[][] = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

// Shield / chevron (8×8) — strong, directional
const SHIELD: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1, 0, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
];

// Hollow diamond with facet — gem/jewel feel (8×8)
const GEM: number[][] = [
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 1, 1, 0, 1, 0],
  [1, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 1],
  [0, 1, 0, 1, 1, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
];

type PatternName = "diamond" | "qr" | "shield" | "gem";

const PATTERNS: Record<PatternName, number[][]> = {
  diamond: DIAMOND,
  qr: QR_FINDER,
  shield: SHIELD,
  gem: GEM,
};

interface BrailleMarkProps {
  pattern?: PatternName;
  color?: string;
  size?: number;
}

export function BrailleMark({
  pattern = "qr",
  color = "var(--cv-ink)",
  size = 10,
}: BrailleMarkProps) {
  const lines = pixelsToBraille(PATTERNS[pattern]);
  return (
    <div
      aria-hidden
      className="select-none pointer-events-none leading-none"
      style={{
        fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
        fontSize: `${size}px`,
        lineHeight: 1,
        color,
        whiteSpace: "pre",
        letterSpacing: 0,
      }}
    >
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}
