interface MonographFooterProps {
  name: string;
  editionNumber?: string;
}

const romanMap: Array<[number, string]> = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

function toRoman(n: number): string {
  let out = "";
  let rem = n;
  for (const [value, numeral] of romanMap) {
    while (rem >= value) {
      out += numeral;
      rem -= value;
    }
  }
  return out;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].toUpperCase();
  const first = parts[0];
  const rest = parts
    .slice(1)
    .map((p) => p.charAt(0).toUpperCase() + ".")
    .join("");
  return `${first.toUpperCase()} ${rest}`;
}

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export function MonographFooter({
  name,
  editionNumber = "01",
}: MonographFooterProps) {
  const now = new Date();
  const monthLabel = MONTHS[now.getMonth()];
  const yearRoman = toRoman(now.getFullYear());

  return (
    <footer style={{ marginTop: "56px" }}>
      <div
        aria-hidden
        style={{ height: "1px", background: "var(--mono-ink)" }}
      />
      <p
        className="mono-smallcaps"
        style={{
          textAlign: "center",
          fontSize: "10px",
          color: "var(--mono-muted)",
          letterSpacing: "0.22em",
          marginTop: "16px",
          marginBottom: 0,
        }}
      >
        {initials(name)}
        <Sep />N°&nbsp;{editionNumber}
        <Sep />
        Curriculum&nbsp;Vit&aelig;
        <Sep />
        {monthLabel}&nbsp;{yearRoman}
      </p>
    </footer>
  );
}

function Sep() {
  return (
    <span aria-hidden style={{ margin: "0 14px", color: "var(--mono-hair)" }}>
      ·
    </span>
  );
}
