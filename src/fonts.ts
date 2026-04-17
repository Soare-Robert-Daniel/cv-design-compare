// Font configuration - fonts are loaded ASYNC on-demand via dynamic imports.
// Run: bun install

export interface FontPairing {
  name: string;
  category: "mono-heading" | "sans-clean" | "serif-academic" | "hybrid" | "retro-computing";
  headingFont: string;
  bodyFont: string;
  headingFamily: string;
  bodyFamily: string;
  // Font keys used to trigger async loading
  fonts: string[];
}

// Dynamic loaders keyed by font name. Each loader imports the CSS chunks
// and returns a promise that resolves once the font CSS is attached.
const fontLoaders: Record<string, () => Promise<unknown>[]> = {
  Inter: () => [
    import("@fontsource/inter/400.css"),
    import("@fontsource/inter/500.css"),
    import("@fontsource/inter/600.css"),
    import("@fontsource/inter/700.css"),
  ],
  "IBM Plex Sans": () => [
    import("@fontsource/ibm-plex-sans/400.css"),
    import("@fontsource/ibm-plex-sans/500.css"),
    import("@fontsource/ibm-plex-sans/700.css"),
  ],
  Manrope: () => [
    import("@fontsource/manrope/400.css"),
    import("@fontsource/manrope/500.css"),
    import("@fontsource/manrope/700.css"),
  ],
  "DM Sans": () => [
    import("@fontsource/dm-sans/400.css"),
    import("@fontsource/dm-sans/500.css"),
    import("@fontsource/dm-sans/700.css"),
  ],
  "Work Sans": () => [
    import("@fontsource/work-sans/400.css"),
    import("@fontsource/work-sans/500.css"),
    import("@fontsource/work-sans/700.css"),
  ],
  "Fira Sans": () => [
    import("@fontsource/fira-sans/400.css"),
    import("@fontsource/fira-sans/500.css"),
    import("@fontsource/fira-sans/700.css"),
  ],
  "Source Sans 3": () => [
    import("@fontsource/source-sans-3/400.css"),
    import("@fontsource/source-sans-3/600.css"),
    import("@fontsource/source-sans-3/700.css"),
  ],
  "Space Grotesk": () => [
    import("@fontsource/space-grotesk/400.css"),
    import("@fontsource/space-grotesk/500.css"),
    import("@fontsource/space-grotesk/700.css"),
  ],
  "Geist Sans": () => [
    import("@fontsource/geist-sans/400.css"),
    import("@fontsource/geist-sans/500.css"),
    import("@fontsource/geist-sans/700.css"),
  ],
  "IBM Plex Serif": () => [
    import("@fontsource/ibm-plex-serif/400.css"),
    import("@fontsource/ibm-plex-serif/600.css"),
    import("@fontsource/ibm-plex-serif/700.css"),
  ],
  "Source Serif 4": () => [
    import("@fontsource/source-serif-4/400.css"),
    import("@fontsource/source-serif-4/600.css"),
    import("@fontsource/source-serif-4/700.css"),
  ],
  Merriweather: () => [
    import("@fontsource/merriweather/400.css"),
    import("@fontsource/merriweather/700.css"),
  ],
  Lora: () => [
    import("@fontsource/lora/400.css"),
    import("@fontsource/lora/600.css"),
    import("@fontsource/lora/700.css"),
  ],
  "JetBrains Mono": () => [
    import("@fontsource/jetbrains-mono/400.css"),
    import("@fontsource/jetbrains-mono/500.css"),
    import("@fontsource/jetbrains-mono/700.css"),
  ],
  "IBM Plex Mono": () => [
    import("@fontsource/ibm-plex-mono/400.css"),
    import("@fontsource/ibm-plex-mono/500.css"),
    import("@fontsource/ibm-plex-mono/700.css"),
  ],
  "Source Code Pro": () => [
    import("@fontsource/source-code-pro/400.css"),
    import("@fontsource/source-code-pro/500.css"),
    import("@fontsource/source-code-pro/700.css"),
  ],
  "Space Mono": () => [
    import("@fontsource/space-mono/400.css"),
    import("@fontsource/space-mono/700.css"),
  ],
  "Fira Code": () => [
    import("@fontsource/fira-code/400.css"),
    import("@fontsource/fira-code/500.css"),
    import("@fontsource/fira-code/700.css"),
  ],
  "Roboto Mono": () => [
    import("@fontsource/roboto-mono/400.css"),
    import("@fontsource/roboto-mono/500.css"),
    import("@fontsource/roboto-mono/700.css"),
  ],
  "Geist Mono": () => [
    import("@fontsource/geist-mono/400.css"),
    import("@fontsource/geist-mono/500.css"),
    import("@fontsource/geist-mono/700.css"),
  ],
  VT323: () => [import("@fontsource/vt323/400.css")],
  "Share Tech Mono": () => [import("@fontsource/share-tech-mono/400.css")],
  "Press Start 2P": () => [import("@fontsource/press-start-2p/400.css")],
  "Nova Mono": () => [import("@fontsource/nova-mono/400.css")],
  "Courier Prime": () => [
    import("@fontsource/courier-prime/400.css"),
    import("@fontsource/courier-prime/700.css"),
  ],
};

const loadingCache = new Map<string, Promise<void>>();

export function loadFont(fontName: string): Promise<void> {
  const cached = loadingCache.get(fontName);
  if (cached) return cached;

  const loader = fontLoaders[fontName];
  if (!loader) {
    const noop = Promise.resolve();
    loadingCache.set(fontName, noop);
    return noop;
  }

  const promise = Promise.all(loader()).then(() => {
    // Wait for the browser to register the font faces
    if (typeof document !== "undefined" && document.fonts?.ready) {
      return document.fonts.ready.then(() => undefined);
    }
    return undefined;
  });

  loadingCache.set(fontName, promise);
  return promise;
}

export function loadFonts(fontNames: string[]): Promise<void> {
  return Promise.all(fontNames.map(loadFont)).then(() => undefined);
}

export const fontPairings: FontPairing[] = [
  // Sans-serif clean
  {
    name: "Inter Classic",
    category: "sans-clean",
    headingFont: "Inter",
    bodyFont: "Inter",
    headingFamily: '"Inter", sans-serif',
    bodyFamily: '"Inter", sans-serif',
    fonts: ["Inter"],
  },
  {
    name: "Geist Modern",
    category: "sans-clean",
    headingFont: "Geist Sans",
    bodyFont: "Geist Sans",
    headingFamily: '"Geist Sans", sans-serif',
    bodyFamily: '"Geist Sans", sans-serif',
    fonts: ["Geist Sans"],
  },
  {
    name: "Manrope Minimal",
    category: "sans-clean",
    headingFont: "Manrope",
    bodyFont: "Manrope",
    headingFamily: '"Manrope", sans-serif',
    bodyFamily: '"Manrope", sans-serif',
    fonts: ["Manrope"],
  },
  {
    name: "DM Sans",
    category: "sans-clean",
    headingFont: "DM Sans",
    bodyFont: "DM Sans",
    headingFamily: '"DM Sans", sans-serif',
    bodyFamily: '"DM Sans", sans-serif',
    fonts: ["DM Sans"],
  },
  {
    name: "Work Sans",
    category: "sans-clean",
    headingFont: "Work Sans",
    bodyFont: "Work Sans",
    headingFamily: '"Work Sans", sans-serif',
    bodyFamily: '"Work Sans", sans-serif',
    fonts: ["Work Sans"],
  },

  // Monospace heading
  {
    name: "JetBrains Pro",
    category: "mono-heading",
    headingFont: "JetBrains Mono",
    bodyFont: "Inter",
    headingFamily: '"JetBrains Mono", monospace',
    bodyFamily: '"Inter", sans-serif',
    fonts: ["JetBrains Mono", "Inter"],
  },
  {
    name: "IBM Technical",
    category: "mono-heading",
    headingFont: "IBM Plex Mono",
    bodyFont: "IBM Plex Sans",
    headingFamily: '"IBM Plex Mono", monospace',
    bodyFamily: '"IBM Plex Sans", sans-serif',
    fonts: ["IBM Plex Mono", "IBM Plex Sans"],
  },
  {
    name: "Space Age",
    category: "mono-heading",
    headingFont: "Space Grotesk",
    bodyFont: "Space Mono",
    headingFamily: '"Space Grotesk", sans-serif',
    bodyFamily: '"Space Mono", monospace',
    fonts: ["Space Grotesk", "Space Mono"],
  },
  {
    name: "Source Pro",
    category: "mono-heading",
    headingFont: "Source Code Pro",
    bodyFont: "Source Sans 3",
    headingFamily: '"Source Code Pro", monospace',
    bodyFamily: '"Source Sans 3", sans-serif',
    fonts: ["Source Code Pro", "Source Sans 3"],
  },
  {
    name: "Fira Stack",
    category: "mono-heading",
    headingFont: "Fira Code",
    bodyFont: "Fira Sans",
    headingFamily: '"Fira Code", monospace',
    bodyFamily: '"Fira Sans", sans-serif',
    fonts: ["Fira Code", "Fira Sans"],
  },
  {
    name: "Geist Dev",
    category: "mono-heading",
    headingFont: "Geist Mono",
    bodyFont: "Geist Sans",
    headingFamily: '"Geist Mono", monospace',
    bodyFamily: '"Geist Sans", sans-serif',
    fonts: ["Geist Mono", "Geist Sans"],
  },
  {
    name: "Roboto Mono",
    category: "mono-heading",
    headingFont: "Roboto Mono",
    bodyFont: "Inter",
    headingFamily: '"Roboto Mono", monospace',
    bodyFamily: '"Inter", sans-serif',
    fonts: ["Roboto Mono", "Inter"],
  },

  // Serif academic
  {
    name: "Plex Academic",
    category: "serif-academic",
    headingFont: "IBM Plex Serif",
    bodyFont: "IBM Plex Sans",
    headingFamily: '"IBM Plex Serif", serif',
    bodyFamily: '"IBM Plex Sans", sans-serif',
    fonts: ["IBM Plex Serif", "IBM Plex Sans"],
  },
  {
    name: "Source Serif",
    category: "serif-academic",
    headingFont: "Source Serif 4",
    bodyFont: "Source Sans 3",
    headingFamily: '"Source Serif 4", serif',
    bodyFamily: '"Source Sans 3", sans-serif',
    fonts: ["Source Serif 4", "Source Sans 3"],
  },
  {
    name: "Lora Editorial",
    category: "serif-academic",
    headingFont: "Lora",
    bodyFont: "Inter",
    headingFamily: '"Lora", serif',
    bodyFamily: '"Inter", sans-serif',
    fonts: ["Lora", "Inter"],
  },
  {
    name: "Merriweather Scholar",
    category: "serif-academic",
    headingFont: "Merriweather",
    bodyFont: "Work Sans",
    headingFamily: '"Merriweather", serif',
    bodyFamily: '"Work Sans", sans-serif',
    fonts: ["Merriweather", "Work Sans"],
  },

  // Retro computing - golden age of computing fonts
  {
    name: "Terminal Age",
    category: "retro-computing",
    headingFont: "VT323",
    bodyFont: "Share Tech Mono",
    headingFamily: '"VT323", monospace',
    bodyFamily: '"Share Tech Mono", monospace',
    fonts: ["VT323", "Share Tech Mono"],
  },
  {
    name: "8-Bit Spec",
    category: "retro-computing",
    headingFont: "Press Start 2P",
    bodyFont: "VT323",
    headingFamily: '"Press Start 2P", monospace',
    bodyFamily: '"VT323", monospace',
    fonts: ["Press Start 2P", "VT323"],
  },
  {
    name: "Mainframe Report",
    category: "retro-computing",
    headingFont: "Courier Prime",
    bodyFont: "IBM Plex Sans",
    headingFamily: '"Courier Prime", monospace',
    bodyFamily: '"IBM Plex Sans", sans-serif',
    fonts: ["Courier Prime", "IBM Plex Sans"],
  },
  {
    name: "Retro Industrial",
    category: "retro-computing",
    headingFont: "Share Tech Mono",
    bodyFont: "Space Mono",
    headingFamily: '"Share Tech Mono", monospace',
    bodyFamily: '"Space Mono", monospace',
    fonts: ["Share Tech Mono", "Space Mono"],
  },
  {
    name: "Nova Terminal",
    category: "retro-computing",
    headingFont: "Nova Mono",
    bodyFont: "Inter",
    headingFamily: '"Nova Mono", monospace',
    bodyFamily: '"Inter", sans-serif',
    fonts: ["Nova Mono", "Inter"],
  },
];
