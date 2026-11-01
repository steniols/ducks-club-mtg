import { calculatePlayerStats, tournaments } from "@/data/tournaments";
import RpgPanel from "./RpgPanel";

interface RpgChampionProps {
  onViewTournament: (id: number) => void;
}

export default function RpgChampion({ onViewTournament }: RpgChampionProps) {
  const last = tournaments[tournaments.length - 1];
  const entry = last.players.find((p) => p.name === last.champion);
  const titles = calculatePlayerStats().find((p) => p.name === last.champion)?.championships ?? 1;

  return (
    <RpgPanel id="inicio" title="Campeão Atual" className="flex flex-col">
      <div className="flex flex-1 flex-col items-center text-center">
        {/* Quadro levemente torto, fazendo par com o cartaz do pato (inclinado para o outro lado) */}
        <div className="flex w-full rotate-[2deg] flex-col items-center">
          {/* Recorte 4:5 (retrato da cintura para cima), sem faixas pretas nas laterais */}
          <div className="rp-frame rp-photo w-full max-w-72 sm:max-w-80">
            {last.championPhoto && (
              <img
                src={last.championPhoto}
                alt={last.champion}
                className="block aspect-[4/5] w-full object-cover object-[center_40%]"
              />
            )}
          </div>
          <p className="rp-plate -mt-3 text-xl sm:text-2xl">{last.champion}</p>
        </div>

        <dl className="mt-4 grid w-full grid-cols-3 gap-2 text-sm">
          <div>
            <dt className="text-[var(--rp-ink-soft)]">Pontos</dt>
            <dd className="text-lg font-bold">{entry?.points ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-[var(--rp-ink-soft)]">Títulos</dt>
            <dd className="text-lg font-bold">👑 {titles}</dd>
          </div>
          <div>
            <dt className="text-[var(--rp-ink-soft)]">Torneio</dt>
            <dd className="text-lg font-bold">#{last.id}</dd>
          </div>
        </dl>
        <p className="mt-2 text-[var(--rp-ink-soft)]">
          Torneio de {last.month} {last.year} · Deck: <strong className="text-[var(--rp-ink)]">{entry?.decks.join(", ")}</strong>
        </p>
        <p className="mt-1 font-bold">👑 Reinando com honra e glória! 👑</p>
        <button type="button" onClick={() => onViewTournament(last.id)} className="rp-btn mt-4">
          Ver torneio ›
        </button>
      </div>
    </RpgPanel>
  );
}
