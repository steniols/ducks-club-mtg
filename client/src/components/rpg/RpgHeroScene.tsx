import type { CSSProperties } from "react";

/**
 * Cenário em pixel art do header (fim de tarde, floresta, taverna e lago com patos).
 * Tudo é SVG gerado aqui e usado como background: nenhum arquivo de imagem, nítido em qualquer tela.
 * 1 "pixel" da arte = P pixels CSS.
 */
const P = 4;

type Palette = Record<string, string>;

/** Converte um mapa de caracteres em <rect>s (agrupa pixels iguais em sequência na linha). */
function pixels(rows: string[], palette: Palette, ox = 0, oy = 0) {
  let body = "";
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const color = palette[row[x]];
      if (!color) {
        x++;
        continue;
      }
      let end = x + 1;
      while (end < row.length && row[end] === row[x]) end++;
      body += `<rect x="${ox + x}" y="${oy + y}" width="${end - x}" height="1" fill="${color}"/>`;
      x = end;
    }
  });
  return body;
}

function svg(w: number, h: number, body: string) {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" shape-rendering="crispEdges">${body}</svg>`;
  return { url: `url("data:image/svg+xml,${encodeURIComponent(markup)}")`, w, h };
}

function sprite(rows: string[], palette: Palette) {
  return svg(Math.max(...rows.map((r) => r.length)), rows.length, pixels(rows, palette));
}

/** Onda triangular (-1..1) com picos nos inteiros: dá cumes pontudos de montanha. */
const tri = (t: number) => 1 - 4 * Math.abs(t - Math.round(t));

/** Cordilheira que se repete sem emenda (frequências inteiras na largura do tile). */
function ridge(w: number, h: number, base: number, waves: [number, number, number][], fill: string, rim: string, cap?: [number, string]) {
  let body = "";
  for (let x = 0; x < w; x++) {
    let v = base;
    for (const [freq, amp, phase] of waves) v += amp * tri((freq * x) / w + phase);
    const height = Math.max(1, Math.min(h, Math.round(v)));
    const top = h - height;
    body += `<rect x="${x}" y="${top}" width="1" height="${height}" fill="${fill}"/>`;
    const capColor = cap && height >= cap[0] ? cap[1] : rim;
    body += `<rect x="${x}" y="${top}" width="1" height="${capColor === rim ? 1 : 2}" fill="${capColor}"/>`;
  }
  return svg(w, h, body);
}

/** Faixa de pinheiros que se repete sem emenda; o lado direito de cada árvore recebe a luz do sol. */
function forest(w: number, h: number, ground: number, trees: [number, number][], fill: string, rim: string) {
  let body = `<rect x="0" y="${h - ground}" width="${w}" height="${ground}" fill="${fill}"/>`;
  for (const [cx, th] of trees) {
    for (const offset of [-w, 0, w]) {
      for (let r = 0; r < th; r++) {
        const hw = Math.round(r * 0.38) + (r % 4 === 3 ? 1 : 0);
        const y = h - ground - th + r;
        const x = cx + offset - hw;
        body += `<rect x="${x}" y="${y}" width="${hw * 2 + 1}" height="1" fill="${fill}"/>`;
        body += `<rect x="${cx + offset + hw}" y="${y}" width="1" height="1" fill="${rim}"/>`;
      }
    }
  }
  return svg(w, h, body);
}

const farMountains = ridge(120, 30, 16, [[2, 8, 0.1], [5, 3, 0.37], [11, 1.2, 0.6]], "#6d4f7d", "#c98a8a", [24, "#f4d6d0"]);
const nearMountains = ridge(96, 26, 12, [[3, 6, 0.3], [7, 2.5, 0.1]], "#4a3b63", "#8a5a72");
const backForest = forest(56, 24, 4, [[2, 15], [8, 19], [15, 14], [22, 18], [29, 16], [35, 20], [42, 15], [49, 18], [54, 14]], "#2f4f45", "#4f6f50");
const frontForest = forest(64, 20, 3, [[3, 13], [9, 17], [14, 11], [20, 15], [27, 12], [33, 16], [38, 10], [44, 14], [51, 17], [57, 12], [62, 15]], "#183a22", "#2f5a2c");

const cloudPalette = { L: "#f9d3b0", D: "#e59a85" };
const clouds = svg(
  160,
  24,
  pixels(
    [
      "......LLLL..............",
      "....LLLLLLLL...LLL......",
      "..LLLLLLLLLLLLLLLLLL....",
      "LLLLLLLLLLLLLLLLLLLLLLL.",
      ".DDDDDDDDDDDDDDDDDDDDD..",
    ],
    cloudPalette,
    10,
    4
  ) + pixels(["...LLLL.....", ".LLLLLLLLL..", "LLLLLLLLLLLL", ".DDDDDDDDDD."], cloudPalette, 92, 13)
);

const sun = sprite(
  [
    "........SSSSSSSS........",
    ".....SSSSSSSSSSSSSS.....",
    "....SSSSSSSSSSSSSSSS....",
    "..SSSSSSSSSSSSSSSSSSSS..",
    "..SSSSSSSSSSSSSSSSSSSS..",
    ".SSSSSSSSSSSSSSSSSSSSSS.",
    ".SSSSSSSSSSSSSSSSSSSSSS.",
    "SSSSSSSSSSSSSSSSSSSSSSSS",
    "OOOOOOOOOOOOOOOOOOOOOOOO",
    "SSSSSSSSSSSSSSSSSSSSSSSS",
    "OOOOOOOOOOOOOOOOOOOOOOOO",
    "OOOOOOOOOOOOOOOOOOOOOOOO",
  ],
  { S: "#ffe08a", O: "#ffc861" }
);

const sunReflection = sprite(
  ["..GGGGGGGGGGGGGGGGGGGG..", "......................", "....GGGGGGGGGGGGGGGG....", "......................", ".......GGGGGGGGGG.......", "......................", ".........GGGGGG........."],
  { G: "#f7cf7a" }
);

const water = svg(
  64,
  12,
  [
    [4, 2, 6, "#f2a65a"],
    [22, 4, 4, "#9fd0e6"],
    [36, 1, 8, "#f7cf7a"],
    [50, 6, 5, "#9fd0e6"],
    [10, 8, 7, "#7fb6d0"],
    [40, 9, 4, "#f2a65a"],
    [58, 3, 3, "#9fd0e6"],
  ]
    .map(([x, y, len, color]) => `<rect x="${x}" y="${y}" width="${len}" height="1" fill="${color}"/>`)
    .join("")
);

const shore = sprite(["..G....G.G....G.", "GGGGGGGGGGGGGGGG", "gggggggggggggggg", "gggggggggggggggg"], { G: "#4f8a35", g: "#3a6a28" });

const tavern = sprite(
  [
    "...........RR....CC.....",
    "..........RRRR...CC.....",
    ".........RRRRRR..CC.....",
    "........RRRRRRRR.CC.....",
    ".......RRRRRRRRRRCC.....",
    "......RRRRRRRRRRRCC.....",
    ".....RRRRRRRRRRRRRR.....",
    "....RRRRRRRRRRRRRRRR....",
    "...RRRRRRRRRRRRRRRRRR...",
    ".rrrrrrrrrrrrrrrrrrrrrr.",
    "...BBBBBBBBBBBBBBBBBB...",
    "...BWWWWWBBBBBBWWWWWB...",
    "...BWYYYWBSYYSBWYYYWB...",
    "...BWYYYWBBBBBBWYYYWB...",
    "...BWBBBWWWWWWWWBBBWB...",
    "...BWWWWWBDDDDBWWWWWB...",
    "...BWWWWWBDDDDBWWWWWB...",
    "...BWWWWWBDDDDBWWWWWB...",
    "...BWWWWWBDDYDBWWWWWB...",
    "...BWWWWWBDDDDBWWWWWB...",
    "...BWWWWWBDDDDBWWWWWB...",
    "...BBBBBBBBBBBBBBBBBB...",
  ],
  { R: "#8a3a2a", r: "#6a2a1e", C: "#6b5b52", B: "#4a2c18", W: "#c9a46a", Y: "#ffd36b", S: "#e2c88c", D: "#5a3418" }
);

const duckPalette = { Y: "#f7d24a", y: "#d9a62e", E: "#2a1a10", O: "#e8752a", w: "#9fd0e6" };
const duck = sprite(
  ["......YYY..", "......YEYOO", "......YYY..", "Y.....YY...", "YY.YYYYYY..", ".YYyyyyYY..", "..YYYYYY...", ".wwwwwwwww."],
  duckPalette
);
const duckling = sprite(["...YY..", "...YEO.", "Y.YYY..", "YYYYY..", ".wwwww."], duckPalette);

/** Camada que se repete na horizontal, ancorada pela base. */
function layer(img: { url: string; w: number; h: number }, bottom: number, scale = P, extra: CSSProperties = {}): CSSProperties {
  return {
    position: "absolute",
    left: 0,
    right: 0,
    bottom,
    height: img.h * scale,
    backgroundImage: img.url,
    backgroundRepeat: "repeat-x",
    backgroundSize: `${img.w * scale}px ${img.h * scale}px`,
    ...extra,
  };
}

function Sprite({ img, scale = P, className, style }: { img: { url: string; w: number; h: number }; scale?: number; className?: string; style?: CSSProperties }) {
  return (
    <span
      className={`block ${className ?? ""}`}
      style={{ width: img.w * scale, height: img.h * scale, backgroundImage: img.url, backgroundSize: "100% 100%", ...style }}
    />
  );
}

const fireflies = [
  [6, 70], [14, 96], [23, 64], [31, 108], [44, 78], [52, 100], [61, 70], [69, 92], [78, 66], [86, 104], [93, 80], [38, 120],
];
const stars = [
  [5, 10], [12, 26], [19, 8], [28, 18], [36, 6], [47, 22], [58, 9], [66, 24], [74, 12], [83, 20], [91, 7], [97, 28],
];

export default function RpgHeroScene() {
  return (
    <div className="rp-scene absolute inset-0" aria-hidden="true">
      {/* Céu de fim de tarde em faixas, como paleta de jogo antigo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #2e2350 0 16%, #4a2f63 16% 30%, #7a3b62 30% 42%, #b85457 42% 52%, #e07a4f 52% 61%, #f2a65a 61% 70%, #f7cf7a 70% 100%)",
        }}
      />
      {stars.map(([left, top], i) => (
        <span key={i} className="rp-star absolute h-1 w-1 bg-[#fff3d6]" style={{ left: `${left}%`, top, animationDelay: `${(i % 5) * 0.7}s` }} />
      ))}

      <div className="absolute right-[12%] bottom-[178px]">
        <Sprite img={sun} />
      </div>

      <div className="rp-clouds" style={layer(clouds, 0, 3, { top: 34, bottom: "auto", opacity: 0.55, animationDuration: "140s" })} />
      <div className="rp-clouds" style={layer(clouds, 0, P, { top: 10, bottom: "auto", backgroundPositionX: 260, opacity: 0.9 })} />

      <div style={layer(farMountains, 92)} />
      <div style={layer(nearMountains, 76)} />
      <div style={layer(backForest, 58)} />
      <div style={layer(frontForest, 50)} />

      {/* Lago */}
      <div
        className="absolute inset-x-0 bottom-0 h-[48px]"
        style={{ background: "linear-gradient(180deg, #6aa0b8 0 4px, #3f7593 4px 55%, #2f5f7c 55% 100%)" }}
      >
        <div className="rp-water" style={layer(water, 0, P, { top: 4, height: "auto" })} />
        <div className="rp-shimmer absolute right-[12%] top-[8px]">
          <Sprite img={sunReflection} />
        </div>

        <div className="rp-swim absolute bottom-[4px] flex items-end gap-2" style={{ animationDuration: "48s" }}>
          <Sprite img={duckling} className="rp-bob" style={{ animationDelay: "0.3s" }} />
          <Sprite img={duckling} className="rp-bob" style={{ animationDelay: "0.6s" }} />
          <Sprite img={duck} className="rp-bob" />
        </div>
        <div className="rp-swim absolute bottom-[22px]" style={{ animationDuration: "64s", animationDelay: "-30s" }}>
          <Sprite img={duck} scale={3} className="rp-bob" style={{ animationDelay: "0.5s" }} />
        </div>
      </div>
      <div style={layer(shore, 42)} />

      {fireflies.map(([left, bottom], i) => (
        <span
          key={i}
          className="rp-firefly absolute h-1 w-1 bg-[#fff27a]"
          style={{ left: `${left}%`, bottom, animationDelay: `${(i * 0.83) % 4}s`, animationDuration: `${3 + (i % 3)}s` }}
        />
      ))}

      {/* Taverna do clube, com fumaça saindo da chaminé */}
      <div className="absolute bottom-[48px] left-[3%] sm:left-[7%]">
        {[0, 1.4, 2.8].map((delay) => (
          <span key={delay} className="rp-smoke absolute h-2 w-2 bg-[#e8d8c8]" style={{ left: 17 * P, top: 0, animationDelay: `${delay}s` }} />
        ))}
        <Sprite img={tavern} />
      </div>
    </div>
  );
}
