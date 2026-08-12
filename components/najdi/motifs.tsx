/**
 * Najdi visual motifs — pure SVG, no client JS.
 *
 * These illustrations are DESIGN PLACEHOLDERS: they keep the site looking
 * finished before real project photography exists in Sanity. Components
 * that use them swap to Sanity images automatically once content is added.
 */

/** Distant dunes + palm silhouettes (hero back layer). */
export function HeroBackLayer() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <path
        d="M0 640 Q 360 600 720 635 T 1440 620 V900 H0 Z"
        fill="#b08d5e"
        opacity=".5"
      />
      <g fill="#8a6b42" opacity=".55">
        <path d="M180 640 q-6-60 4-90 q8 28 6 90 M180 560 q-30-24-58-22 q26-8 60 10 M182 558 q28-28 56-28 q-24-4-58 16 M181 556 q6-36 26-52 q-22 8-30 50 M181 556 q-8-34-28-48 q22 6 32 46" />
        <path d="M1240 620 q-7-70 5-105 q9 33 7 105 M1240 528 q-35-28-68-26 q30-9 70 12 M1242 526 q33-33 66-33 q-28-5-68 19 M1241 523 q7-42 30-61 q-26 9-35 59 M1241 523 q-9-40-33-56 q26 7 38 54" />
      </g>
    </svg>
  );
}

/** Najdi mud-brick composition (hero mid layer). */
export function HeroMidLayer() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* left mass */}
      <g>
        <rect x="285" y="500" width="215" height="400" fill="#b98a55" />
        <path
          d="M285 500 l21-26 22 26 21-26 22 26 21-26 22 26 21-26 22 26 21-26 22 26"
          fill="#b98a55"
        />
        <rect x="320" y="560" width="34" height="46" fill="#5c4322" />
        <rect x="390" y="560" width="34" height="46" fill="#f2b15c" />
        <rect x="320" y="660" width="34" height="46" fill="#5c4322" />
        <rect x="390" y="660" width="34" height="46" fill="#5c4322" />
        <g fill="#7a5a31">
          <rect x="290" y="620" width="200" height="8" />
          <rect x="290" y="720" width="200" height="8" />
        </g>
      </g>
      {/* central mass */}
      <g>
        <rect x="500" y="400" width="450" height="500" fill="#c89a66" />
        <path
          d="M500 400 l25-32 25 32 25-32 25 32 25-32 25 32 25-32 25 32 25-32 25 32 25-32 25 32 25-32 25 32 25-32 25 32 25-32 25 32"
          fill="#c89a66"
        />
        <g fill="#6e4e28">
          <rect x="488" y="452" width="26" height="9" rx="3" />
          <rect x="488" y="512" width="26" height="9" rx="3" />
          <rect x="936" y="452" width="26" height="9" rx="3" />
          <rect x="936" y="512" width="26" height="9" rx="3" />
        </g>
        <g>
          <rect x="545" y="470" width="40" height="54" fill="#5c4322" />
          <rect x="625" y="470" width="40" height="54" fill="#f2b15c" />
          <rect x="705" y="470" width="40" height="54" fill="#5c4322" />
          <rect x="785" y="470" width="40" height="54" fill="#f2b15c" />
          <rect x="865" y="470" width="40" height="54" fill="#5c4322" />
          <rect x="545" y="580" width="40" height="54" fill="#f2b15c" />
          <rect x="625" y="580" width="40" height="54" fill="#5c4322" />
          <rect x="785" y="580" width="40" height="54" fill="#5c4322" />
          <rect x="865" y="580" width="40" height="54" fill="#f2b15c" />
        </g>
        <g>
          <rect x="685" y="580" width="80" height="320" fill="#8a6132" />
          <rect x="697" y="600" width="56" height="300" fill="#5c4322" />
          <path
            d="M697 640 l14-11 14 11 14-11 14 11"
            stroke="#c4813f"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="725" cy="700" r="10" fill="none" stroke="#c4813f" strokeWidth="3" />
          <path
            d="M697 750 l14-11 14 11 14-11 14 11"
            stroke="#c4813f"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="725" cy="805" r="10" fill="none" stroke="#c4813f" strokeWidth="3" />
        </g>
        <path d="M520 445 h150 M780 445 h150" stroke="#a87a46" strokeWidth="6" />
      </g>
      {/* right tower */}
      <g>
        <rect x="985" y="430" width="165" height="470" fill="#b4854f" />
        <path
          d="M985 430 l20-26 21 26 20-26 21 26 20-26 21 26 20-26 22 26"
          fill="#b4854f"
        />
        <rect x="1020" y="500" width="30" height="42" fill="#f2b15c" />
        <rect x="1085" y="500" width="30" height="42" fill="#5c4322" />
        <rect x="1020" y="600" width="30" height="42" fill="#5c4322" />
        <rect x="1085" y="600" width="30" height="42" fill="#f2b15c" />
        <g fill="#7a5a31">
          <rect x="990" y="560" width="155" height="7" />
          <rect x="990" y="660" width="155" height="7" />
        </g>
      </g>
    </svg>
  );
}

/** Foreground ground band (hero front layer). */
export function HeroFrontLayer() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <path
        d="M0 900 V760 q 200-30 380-14 q 240 20 520 6 q 300-16 540 12 V900 Z"
        fill="#6e5230"
        opacity=".9"
      />
    </svg>
  );
}

/** Najdi carved-door geometry (philosophy section). */
export function NajdiDoor() {
  return (
    <svg
      viewBox="0 0 460 530"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <rect width="460" height="530" fill="#dccfb4" />
      <g stroke="#16130e" strokeWidth="1.4" fill="none" opacity=".85">
        <rect x="90" y="60" width="280" height="410" />
        <rect x="110" y="80" width="240" height="370" />
        <path d="M110 150 h240 M110 220 h240 M110 290 h240 M110 360 h240" />
        <path d="M110 115 l24-20 24 20 24-20 24 20 24-20 24 20 24-20 24 20 24-20 24 20" />
        <g>
          <circle cx="230" cy="185" r="18" />
          <circle cx="170" cy="185" r="10" />
          <circle cx="290" cy="185" r="10" />
          <path d="M130 255 l20-16 20 16 20-16 20 16 20-16 20 16 20-16 20 16 20-16 20 16" />
          <circle cx="230" cy="325" r="18" />
          <circle cx="170" cy="325" r="10" />
          <circle cx="290" cy="325" r="10" />
          <path d="M130 395 l20-16 20 16 20-16 20 16 20-16 20 16 20-16 20 16 20-16 20 16" />
        </g>
      </g>
      <g fill="#b26f2f" opacity=".9">
        <path d="M218 30 l12-12 12 12 -12 12 Z" />
      </g>
    </svg>
  );
}

/** Blueprint-style placeholder art for project cards without a Sanity image. */
export function ProjectPlaceholderArt({ variant = 0 }: { variant?: number }) {
  const palettes = [
    { from: "#3a2c1a", to: "#191209", stroke: "#e5b57f" },
    { from: "#2a3038", to: "#12151a", stroke: "#dccfb4" },
    { from: "#4a3b24", to: "#1c160d", stroke: "#f5f0e6" },
  ];
  const p = palettes[variant % palettes.length];
  const id = `ph-grad-${variant % palettes.length}`;

  return (
    <svg
      viewBox="0 0 560 620"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.from} />
          <stop offset="1" stopColor={p.to} />
        </linearGradient>
      </defs>
      <rect width="560" height="620" fill={`url(#${id})`} />
      <g stroke={p.stroke} strokeWidth="1.6" fill="none" opacity=".9">
        {variant % 3 === 0 && (
          <>
            <path d="M80 470 V300 h120 v-60 h160 v60 h120 v170" />
            <path d="M80 300 l30-24 30 24 30-24 30 24" />
            <path d="M200 240 l40-30 40 30" />
            <path d="M360 300 l30-24 30 24 30-24 30 24" />
            <rect x="240" y="330" width="80" height="140" rx="40" />
            <path d="M150 470 v-80 h60 v80 M350 470 v-80 h60 v80" />
            <path d="M60 470 h440" />
          </>
        )}
        {variant % 3 === 1 && (
          <>
            <path d="M70 480 V220 h180 v260 M250 220 l-90-50 -90 50" />
            <path d="M290 480 V160 h200 v320" />
            <path d="M310 200 h160 M310 250 h160 M310 300 h160 M310 350 h160 M310 400 h160" />
            <path d="M100 260 h120 M100 310 h120 M100 360 h120 M100 410 h120" />
            <path d="M50 480 h460" />
          </>
        )}
        {variant % 3 === 2 && (
          <>
            <rect x="110" y="180" width="340" height="300" />
            <rect x="190" y="260" width="180" height="140" />
            <path d="M110 180 l20-16 20 16 20-16 20 16 20-16 20 16 20-16 20 16 20-16 20 16 20-16 20 16 20-16 20 16 20-16 20 16 20-16 20 16" />
            <path d="M190 400 h180 M280 260 v140" />
            <circle cx="280" cy="330" r="30" />
            <path d="M90 480 h380" />
          </>
        )}
      </g>
    </svg>
  );
}

/** Triangular crenellation zigzag — used by the scroll-drawn divider and CTA. */
export const ZIGZAG_PATH =
  "M0 70 L60 20 L120 70 L180 20 L240 70 L300 20 L360 70 L420 20 L480 70 L540 20 L600 70 L660 20 L720 70 L780 20 L840 70 L900 20 L960 70 L1020 20 L1080 70 L1140 20 L1200 70 L1260 20 L1320 70 L1380 20 L1440 70";
