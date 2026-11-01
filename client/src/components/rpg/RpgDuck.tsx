import { useState } from "react";
import { duckCardImages } from "@/components/DuckSection";
import { tournaments } from "@/data/tournaments";
import RpgPanel from "./RpgPanel";
import RpgLightbox from "./RpgLightbox";

export default function RpgDuck() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const last = tournaments[tournaments.length - 1];
  const entry = last.players.find((p) => p.name === last.duck);

  const duckCards = [...tournaments]
    .reverse()
    .filter((t) => duckCardImages[t.duck])
    .map((t) => ({
      src: duckCardImages[t.duck],
      title: `Pato ${t.duck} · ${t.month} ${t.year}`,
      subtitle: "Arte by Robertinho",
      name: t.duck,
      month: t.month,
      year: t.year,
    }));

  return (
    <RpgPanel id="pato" title="🦆 O Pato 🦆">
      <p className="mb-4 text-[var(--rp-ink-soft)]">Honramos aquele que enfrentou a maior desventura</p>
      <div className="grid grid-cols-1 items-center gap-6 @2xl:grid-cols-[auto_minmax(0,1fr)]">
        {/* Cartaz do pato do mês */}
        <div className="mx-auto w-full max-w-80 rotate-[-2deg] border-[3px] border-[var(--rp-wood-dark)] bg-[#ead29a] p-3 text-center shadow-[4px_4px_0_rgba(0,0,0,0.35)]">
          <p className="rp-title text-3xl tracking-widest text-[var(--rp-red)]">O PATO</p>
          <p className="text-sm font-bold uppercase">
            {last.month} {last.year}
          </p>
          {last.duckPhoto && (
            <span className="rp-photo mx-auto mt-2 w-fit max-w-full border-2 border-[var(--rp-wood-dark)]">
              <img src={last.duckPhoto} alt={last.duck} className="block max-h-96 w-auto max-w-full object-contain" />
            </span>
          )}
          <p className="rp-title mt-2 text-2xl">{last.duck}</p>
          <p className="mt-1 font-bold">🦆 Último colocado</p>
        </div>

        <div>
          <dl className="grid gap-2 @md:grid-cols-3">
            {[
              { label: "Posição no último torneio", value: `🥚 ${last.players.length}º lugar` },
              { label: "Pontuação", value: `${entry?.points ?? 0} pontos` },
              { label: "Deck utilizado", value: entry?.decks[0] ?? "Desconhecido" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded border-2 border-[var(--rp-red)] bg-[#f1c9b8]/60 px-3 py-2">
                <dt className="text-xs font-bold uppercase text-[var(--rp-ink-soft)]">{label}</dt>
                <dd className="mt-1 text-lg font-bold">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 italic text-[var(--rp-ink-soft)]">"Nem todo dia é de glória, mas a luta continua!"</p>

          <div className="rp-rule my-5" />
          <h3 className="text-lg">Históricos dos Patos</h3>
          <p className="text-sm text-[var(--rp-ink-soft)]">
            Clique em um card para ampliar a homenagem ao último colocado do mês.
          </p>
          <ul className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {duckCards.map((card, index) => (
              <li key={`${card.month}-${card.year}`} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className="group block w-32 text-center"
                  aria-label={`Ampliar card do pato ${card.name}, ${card.month} de ${card.year}`}
                >
                  <span className="rp-frame rp-photo aspect-[3/4] bg-[#1d140b]">
                    <img src={card.src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                  </span>
                  <span className="mt-1 block truncate text-sm font-bold">{card.name}</span>
                  <span className="block text-xs text-[var(--rp-ink-soft)]">
                    {card.month.slice(0, 3)} {card.year}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <RpgLightbox items={duckCards} index={openIndex} onChange={setOpenIndex} />
    </RpgPanel>
  );
}
