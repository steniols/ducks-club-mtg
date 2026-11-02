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
          <div className="relative w-full max-w-72 sm:max-w-80">
            {/* Borda escura e sombra do cartaz do pato, com a foto ocupando todo o quadro; recorte 4:5 (retrato da cintura para cima) */}
            <div className="rp-photo border-[3px] border-[var(--rp-wood-dark)] shadow-[4px_4px_0_rgba(0,0,0,0.35)]">
              {last.championPhoto && (
                <img
                  src={last.championPhoto}
                  alt={last.champion}
                  className="block aspect-[4/5] w-full object-cover object-[center_40%]"
                />
              )}
            </div>
            <PixelCrown className="absolute -right-5 -top-7 z-10 w-14 rotate-[20deg] sm:w-16" />
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

/** Coroa em pixel art (grade 13×9) com contorno escuro, pousada no canto do quadro do campeão. */
function PixelCrown({ className }: { className?: string }) {
  const gold = "#f5c542";
  const rects: [number, number, number, number, string][] = [
    // pontas
    [0, 0, 1, 4, gold], [1, 2, 1, 2, gold], [2, 3, 1, 1, gold],
    [6, 0, 1, 1, gold], [5, 1, 3, 3, gold], [4, 3, 1, 1, gold], [8, 3, 1, 1, gold],
    [12, 0, 1, 4, gold], [11, 2, 1, 2, gold], [10, 3, 1, 1, gold],
    // corpo, brilho e faixa com joias
    [0, 4, 13, 5, gold],
    [1, 4, 11, 1, "#ffe48a"],
    [0, 6, 13, 2, "#d9a530"],
    [2, 6, 1, 2, "#a8322a"], [6, 6, 1, 2, "#a8322a"], [10, 6, 1, 2, "#a8322a"],
  ];
  return (
    <svg
      viewBox="0 0 13 9"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      style={{
        filter:
          "drop-shadow(2px 0 0 #3d2414) drop-shadow(-2px 0 0 #3d2414) drop-shadow(0 2px 0 #3d2414) drop-shadow(0 -2px 0 #3d2414) drop-shadow(3px 3px 0 rgba(0,0,0,0.35))",
      }}
    >
      {rects.map(([x, y, w, h, fill], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={fill} />
      ))}
    </svg>
  );
}
