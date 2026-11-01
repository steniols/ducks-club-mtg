import { useEffect, useState } from "react";
import { getCurrentDuck } from "@/data/tournaments";
import { listenForAudioUnlock, playQuack } from "./duckSound";

/**
 * Rostos recortados (PNG com fundo transparente) dos patos do mês.
 * Para um novo pato, adicione o recorte em client/public/faces/ e registre aqui.
 */
const duckFaces: Record<string, string> = {
  Hovelha: "/faces/hovelha.png",
};

const SHOW_MS = 4200;
/** Momento em que o balão aparece (20% da animação rp-quack), em segundos. */
const QUACK_AT = 0.84;

/** O pato do mês surge da água em pontos aleatórios do lago e solta um "Quack!". */
export default function RpgDuckFace() {
  const name = getCurrentDuck();
  const face = duckFaces[name];
  const [pop, setPop] = useState<{ id: number; left: number } | null>(null);

  useEffect(() => {
    if (!face || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    let id = 0;
    const stopListening = listenForAudioUnlock();

    const schedule = (delay: number) => {
      timer = setTimeout(() => {
        setPop({ id: ++id, left: 8 + Math.random() * 80 });
        playQuack(QUACK_AT);
        timer = setTimeout(() => {
          setPop(null);
          schedule(4000);
        }, SHOW_MS);
      }, delay);
    };
    schedule(2000);
    return () => {
      clearTimeout(timer);
      stopListening();
    };
  }, [face]);

  if (!face || !pop) return null;
  const balloonLeft = pop.left > 70;

  return (
    <div key={pop.id} className="absolute bottom-[12px] z-10 -translate-x-1/2" style={{ left: `${pop.left}%` }} aria-hidden="true">
      {/* A borda inferior do recorte é a linha d'água: o rosto sobe "de dentro" do lago */}
      <div className="relative h-[100px] w-[76px] overflow-hidden">
        <img src={face} alt="" className="rp-face absolute bottom-0 left-1/2 w-14" />
      </div>
      <span className="rp-ripple absolute -bottom-[2px] left-1/2 h-1 w-20 border-x-8 border-[#cfe9f5]" />
      <span
        className={`rp-quack absolute top-0 whitespace-nowrap text-center leading-tight border-2 border-[var(--rp-ink)] bg-[var(--rp-parch)] px-2 py-0.5 font-['Inter',sans-serif] text-sm font-bold text-[var(--rp-ink)] shadow-[2px_2px_0_rgba(61,36,20,0.5)] ${
          balloonLeft ? "right-[80%]" : "left-[80%]"
        }`}
        data-side={balloonLeft ? "left" : "right"}
      >
        Quack!
        <br />
        Quack!
      </span>
    </div>
  );
}
