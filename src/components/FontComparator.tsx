import { CV, type CVVariant } from "./CV";
import { fontPairings, type FontPairing } from "../fonts";
import { useLazyFont } from "../hooks/useLazyFont";
import { useState } from "react";

const categories: { key: FontPairing["category"] | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "sans-clean", label: "Sans Clean" },
  { key: "mono-heading", label: "Mono Heading" },
  { key: "serif-academic", label: "Serif Academic" },
  { key: "retro-computing", label: "Retro Computing" },
];

const layouts: { key: CVVariant; label: string }[] = [
  { key: "classic", label: "Classic" },
  { key: "monograph", label: "Monograph" },
  { key: "terminal", label: "Terminal" },
  { key: "hardware", label: "Hardware" },
  { key: "blueprint", label: "Blueprint" },
];

export function FontComparator() {
  const [selectedPairing, setSelectedPairing] = useState<string | null>(null);
  const [category, setCategory] = useState<FontPairing["category"] | "all">("all");
  const [layout, setLayout] = useState<CVVariant>("classic");

  const filteredByCategory =
    category === "all"
      ? fontPairings
      : fontPairings.filter((p) => p.category === category);

  const displayed = selectedPairing
    ? fontPairings.filter((p) => p.name === selectedPairing)
    : filteredByCategory;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">CV Font Comparator</h1>
              <p className="text-xs text-gray-500">
                Compare {fontPairings.length} font pairings for a programmer CV
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 border border-gray-300 rounded-md p-0.5 bg-gray-50">
                {layouts.map((l) => (
                  <button
                    key={l.key}
                    onClick={() => setLayout(l.key)}
                    className={`px-2.5 py-1 text-xs rounded transition-colors ${
                      layout === l.key
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {categories.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => {
                      setCategory(c.key);
                      setSelectedPairing(null);
                    }}
                    className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                      category === c.key && !selectedPairing
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedPairing(null)}
              className={`px-2.5 py-1 text-[11px] rounded-md border transition-colors ${
                !selectedPairing
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              Show all in category
            </button>
            {filteredByCategory.map((p) => (
              <button
                key={p.name}
                onClick={() =>
                  setSelectedPairing(selectedPairing === p.name ? null : p.name)
                }
                className={`px-2.5 py-1 text-[11px] rounded-md border transition-colors ${
                  selectedPairing === p.name
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1600px] mx-auto p-6">
        <div
          className={`grid gap-6 ${
            selectedPairing
              ? "grid-cols-1 max-w-3xl mx-auto"
              : "grid-cols-1 lg:grid-cols-2"
          }`}
        >
          {displayed.map((pairing) => (
            <FontCard key={pairing.name} pairing={pairing} layout={layout} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FontCard({
  pairing,
  layout,
}: {
  pairing: FontPairing;
  layout: CVVariant;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2 px-1">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{pairing.name}</h3>
          <p className="text-xs text-gray-500">
            Headings: {pairing.headingFont} · Body: {pairing.bodyFont}
          </p>
        </div>
        <div className="flex gap-1">
          <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-mono text-gray-600">
            {pairing.headingFont}
          </span>
          <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-mono text-gray-600">
            {pairing.bodyFont}
          </span>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg">
        <CV
          headingFont={pairing.headingFamily}
          bodyFont={pairing.bodyFamily}
          variant={layout}
        />
      </div>
    </div>
  );
}
