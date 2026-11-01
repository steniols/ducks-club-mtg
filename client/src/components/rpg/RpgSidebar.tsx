import { useEffect, useState } from "react";
import { BarChart3, ChevronsRight, Home, Image, Medal, ScrollText } from "lucide-react";

export const rpgNav: { id: string; label: string; shortLabel?: string; icon: typeof Home | null }[] = [
  { id: "inicio", label: "Início", icon: Home },
  { id: "ranking", label: "Ranking", icon: Medal },
  { id: "metagame", label: "Metagame", shortLabel: "Meta", icon: BarChart3 },
  { id: "torneios", label: "Torneios", icon: ScrollText },
  { id: "pato", label: "O Pato", icon: null },
  { id: "galeria", label: "Galeria", icon: Image },
];

export const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/** Destaca no menu a seção que está visível na tela. */
function useActiveSection() {
  const [active, setActive] = useState(rpgNav[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    rpgNav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function RpgSidebar() {
  const active = useActiveSection();

  return (
    <>
      {/* Desktop: menu lateral de madeira */}
      <nav aria-label="Seções" className="rp-wood hidden p-3 lg:block">
        <ul className="flex flex-col gap-2">
          {rpgNav.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  data-active={isActive}
                  onClick={() => scrollToId(id)}
                  className="rp-btn w-full justify-start whitespace-nowrap text-base"
                >
                  {isActive ? (
                    <ChevronsRight className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <NavIcon icon={Icon} />
                  )}
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile/tablet: barra fixa no rodapé, estilo "barra de itens" de jogo — sem scroll */}
      <nav
        aria-label="Seções"
        className="rp-wood fixed inset-x-0 bottom-0 z-50 rounded-none border-x-0 border-b-0 px-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] pt-1 lg:hidden"
      >
        <ul className="grid grid-cols-6 gap-1">
          {rpgNav.map(({ id, label, shortLabel, icon: Icon }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  data-active={isActive}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => scrollToId(id)}
                  className="rp-btn w-full flex-col !gap-0.5 !px-0.5 !py-1.5 text-[0.65rem] leading-tight sm:text-xs"
                >
                  <NavIcon icon={Icon} />
                  <span className="max-w-full truncate">{shortLabel ?? label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

function NavIcon({ icon: Icon }: { icon: (typeof rpgNav)[number]["icon"] }) {
  return Icon ? (
    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
  ) : (
    <span className="w-4 text-center text-sm leading-4" aria-hidden="true">🦆</span>
  );
}
