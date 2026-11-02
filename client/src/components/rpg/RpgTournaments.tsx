import { tournaments } from "@/data/tournaments";
import RpgPanel from "./RpgPanel";

interface RpgTournamentsProps {
  selectedId: number;
  onSelect: (id: number) => void;
}

export default function RpgTournaments({ selectedId, onSelect }: RpgTournamentsProps) {
  const selected = tournaments.find((t) => t.id === selectedId) ?? tournaments[tournaments.length - 1];
  const lastIndex = selected.players.length - 1;

  const highlights = [
    { label: "Campeão", caption: "👑 Vencedor do torneio", name: selected.champion, photo: selected.championPhoto, tone: "border-[var(--rp-gold)] bg-[#f8e7a0]" },
    { label: "O Pato", caption: "🦆 Último colocado", name: selected.duck, photo: selected.duckPhoto, tone: "border-[var(--rp-red)] bg-[#f1c9b8]" },
  ];

  return (
    <RpgPanel id="torneios" title="Histórico de Torneios">
      <p className="mb-3 text-[var(--rp-ink-soft)]">
        Escolha um mês para conferir o ranking, o campeão, o pato e os decks utilizados.
      </p>
      <div className="-mx-1 mb-4 overflow-x-auto px-1 pb-2" role="tablist" aria-label="Filtrar torneio por mês">
        <div className="flex min-w-max gap-2">
          {/* Mais recente primeiro */}
          {[...tournaments].reverse().map((tournament) => (
            <button
              key={tournament.id}
              type="button"
              role="tab"
              aria-selected={tournament.id === selected.id}
              data-active={tournament.id === selected.id}
              onClick={() => onSelect(tournament.id)}
              className="rp-btn !px-3 !py-1 text-sm"
            >
              {tournament.month}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl sm:text-2xl">
          {selected.month} de {selected.year}
        </h3>
        <span className="font-bold text-[var(--rp-ink-soft)]">Torneio #{selected.id}</span>
      </div>

      <div className="mt-4 grid gap-3 @lg:grid-cols-2">
        {highlights.map(({ label, caption, name, photo, tone }) => (
          <div key={label} className={`flex items-center gap-3 rounded border-[3px] p-2 ${tone}`}>
            {photo && (
              <span className="rp-photo h-24 w-24 shrink-0 rounded-sm border-2 border-[var(--rp-wood-dark)]">
                <img src={photo} alt={name} className="h-full w-full object-cover object-top" />
              </span>
            )}
            <div className="min-w-0">
              <p className="text-sm font-bold uppercase text-[var(--rp-ink-soft)]">{label}</p>
              <p className="rp-title truncate text-xl">{name}</p>
              <p className="text-sm text-[var(--rp-ink-soft)]">{caption}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="rp-title mt-5 text-lg">Classificação ({selected.players.length} jogadores)</p>
      <table className="mt-2 w-full text-left">
        <thead>
          <tr className="border-b-2 border-[var(--rp-wood-dark)] text-sm uppercase text-[var(--rp-ink-soft)]">
            <th className="w-10 py-1">#</th>
            <th className="py-1">Jogador</th>
            <th className="hidden py-1 sm:table-cell">Deck</th>
            <th className="py-1 text-right">Pts</th>
          </tr>
        </thead>
        <tbody>
          {selected.players.map((player, index) => (
            <tr
              key={player.name}
              className={`border-b border-dashed border-[var(--rp-ink-soft)]/40 ${
                index === 0 ? "bg-[var(--rp-gold)]/30" : index === lastIndex ? "bg-[var(--rp-red)]/15" : ""
              }`}
            >
              <td className="py-1.5 font-bold">{index + 1}</td>
              <td className="py-1.5">
                <span className="font-bold">{player.name}</span>
                <span className="block text-sm text-[var(--rp-ink-soft)] sm:hidden">{player.decks.join(", ")}</span>
              </td>
              <td className="hidden py-1.5 text-[var(--rp-ink-soft)] sm:table-cell">{player.decks.join(", ")}</td>
              <td className="py-1.5 text-right font-bold tabular-nums">{player.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="rp-title mt-5 text-lg">Decks Utilizados</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {selected.decks.map((deck) => (
          <span key={deck} className="rp-btn !cursor-default !px-2.5 !py-0.5 text-sm">
            {deck}
          </span>
        ))}
      </div>
    </RpgPanel>
  );
}
