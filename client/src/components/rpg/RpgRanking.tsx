import { useState } from "react";
import { calculatePlayerStats } from "@/data/tournaments";
import RpgPanel from "./RpgPanel";

const TOP_COUNT = 15;
const medals = ["🥇", "🥈", "🥉"];

export default function RpgRanking() {
  const [showAll, setShowAll] = useState(false);
  const players = calculatePlayerStats();
  const visible = showAll ? players : players.slice(0, TOP_COUNT);

  return (
    <RpgPanel
      id="ranking"
      title="Ranking Geral"
      className="flex flex-col"
      action={
        <button type="button" onClick={() => setShowAll(!showAll)} className="rp-btn !py-1 text-sm">
          {showAll ? `Top ${TOP_COUNT}` : `Todos (${players.length})`}
        </button>
      }
    >
      <ol className="space-y-1">
        {visible.map((player, index) => (
          <li key={player.name} className="flex items-baseline gap-2 text-lg">
            <span className="w-8 shrink-0 text-right font-bold">{medals[index] ?? `${index + 1}.`}</span>
            <span className="min-w-0 truncate font-bold">{player.name}</span>
            <span className="text-sm text-[var(--rp-ink-soft)]">
              {player.championships > 0 && `👑${player.championships}`}
              {player.duckCount > 0 && ` 🦆${player.duckCount}`}
            </span>
            <span className="mx-1 min-w-4 flex-1 border-b-2 border-dotted border-[var(--rp-ink-soft)]/50" aria-hidden="true" />
            <span className="font-bold tabular-nums">{player.totalPoints}</span>
          </li>
        ))}
      </ol>
      <div className="rp-rule mt-4" />
      <p className="mt-2 text-sm text-[var(--rp-ink-soft)]">Pontuação acumulada de todos os torneios · 👑 campeão · 🦆 pato</p>
    </RpgPanel>
  );
}
