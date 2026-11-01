import { useState } from "react";
import { calculateMetagame } from "@/data/tournaments";
import RpgPanel from "./RpgPanel";

const TOP_COUNT = 16;

export default function RpgMetagame() {
  const [showAll, setShowAll] = useState(false);
  const metagame = calculateMetagame();
  const total = metagame.reduce((sum, deck) => sum + deck.appearances, 0);
  const visible = showAll ? metagame : metagame.slice(0, TOP_COUNT);
  const max = metagame[0]?.appearances ?? 1;

  return (
    <RpgPanel
      id="metagame"
      title="Análise do Metagame"
      action={
        <button type="button" onClick={() => setShowAll(!showAll)} className="rp-btn !py-1 text-sm">
          {showAll ? `Top ${TOP_COUNT}` : `Todos (${metagame.length})`}
        </button>
      }
    >
      <ul className="grid gap-y-2">
        {visible.map((deck) => {
          const percentage = (deck.appearances / total) * 100;
          return (
            <li
              key={deck.deckName}
              className="grid grid-cols-[minmax(0,8.5rem)_1fr_3rem] @md:grid-cols-[minmax(0,11rem)_1fr_3rem] items-center gap-2"
              title={`${deck.appearances} ${deck.appearances === 1 ? "aparição" : "aparições"}`}
            >
              <span className="truncate font-bold">{deck.deckName}</span>
              <span className="h-4 border-2 border-[var(--rp-wood-dark)] bg-[var(--rp-parch-2)]">
                <span
                  className="block h-full border-r-2 border-[var(--rp-wood-dark)]"
                  style={{ width: `${(deck.appearances / max) * 100}%`, background: deck.color }}
                />
              </span>
              <span className="text-right text-sm font-bold tabular-nums">{percentage.toFixed(1).replace(".", ",")}%</span>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-sm text-[var(--rp-ink-soft)]">
        Decks mais populares e seus desempenhos. Passe o mouse para ver as aparições de cada deck.
      </p>
    </RpgPanel>
  );
}
