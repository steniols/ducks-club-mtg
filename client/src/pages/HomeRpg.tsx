import { useEffect, useState } from "react";
import { tournaments } from "@/data/tournaments";
import RpgSidebar, { scrollToId } from "@/components/rpg/RpgSidebar";
import RpgChampion from "@/components/rpg/RpgChampion";
import RpgRanking from "@/components/rpg/RpgRanking";
import RpgMetagame from "@/components/rpg/RpgMetagame";
import RpgTournaments from "@/components/rpg/RpgTournaments";
import RpgGallery from "@/components/rpg/RpgGallery";
import RpgDuck from "@/components/rpg/RpgDuck";
import RpgHeroScene from "@/components/rpg/RpgHeroScene";

/**
 * DUCKS CLUB - Tema principal (RPG: pergaminho + madeira + floresta), rota "/".
 * Usa os mesmos dados de @/data/tournaments que o tema original (oculto em /classico).
 */
export default function HomeRpg() {
  const [selectedTournamentId, setSelectedTournamentId] = useState(tournaments[tournaments.length - 1].id);

  // A barra de rolagem da página pertence ao <html>; a classe aplica o estilo de madeira só nesta rota
  useEffect(() => {
    document.documentElement.classList.add("rpg-page");
    return () => document.documentElement.classList.remove("rpg-page");
  }, []);

  const openTournament = (id: number) => {
    setSelectedTournamentId(id);
    scrollToId("torneios");
  };

  return (
    <div className="rpg min-h-screen pb-20 lg:pb-0">
      {/* Faixa do título sobre o cenário em pixel art (lago dos patos) */}
      <header className="relative h-[17rem] overflow-hidden border-b-4 border-[var(--rp-wood-dark)] sm:h-[19rem] 2xl:h-[22rem]">
        <RpgHeroScene />
        <div className="relative flex justify-center px-4 pt-6 sm:pt-10 2xl:pt-14">
          <div className="rp-parch flex items-center gap-3 px-5 py-3 sm:gap-5 sm:px-10 sm:py-4">
            <img
              src="/ducks-logo.png"
              alt="Logo do Ducks Club"
              className="h-14 w-14 shrink-0 drop-shadow-[2px_2px_0_rgba(61,36,20,0.5)] sm:h-20 sm:w-20"
            />
            <div className="text-center">
              <h1 className="text-3xl text-[var(--rp-ink)] sm:text-5xl" style={{ textShadow: "2px 2px 0 var(--rp-parch-2)" }}>
                Ducks Club
              </h1>
              <p className="rp-title mt-1 text-xs tracking-[0.3em] text-[var(--rp-ink-soft)] sm:text-sm">MTG TOURNAMENTS</p>
            </div>
          </div>
        </div>
      </header>

      {/* Tela inteira: sem largura máxima; os painéis se reorganizam conforme a largura */}
      <div className="grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-start lg:px-6 2xl:px-10">
        <aside className="contents lg:sticky lg:top-4 lg:z-40 lg:block">
          <RpgSidebar />
        </aside>

        <main className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-12">
          <div className="*:h-full xl:col-span-4 2xl:col-span-3">
            <RpgChampion onViewTournament={openTournament} />
          </div>
          <div className="*:h-full xl:col-span-4">
            <RpgRanking />
          </div>
          <div className="*:h-full md:col-span-2 xl:col-span-4 2xl:col-span-5">
            <RpgMetagame />
          </div>
          <div className="*:h-full md:col-span-2 xl:col-span-12 2xl:col-span-7">
            <RpgTournaments selectedId={selectedTournamentId} onSelect={setSelectedTournamentId} />
          </div>
          <div className="*:h-full md:col-span-2 xl:col-span-12 2xl:col-span-5">
            <RpgDuck />
          </div>
          <div className="md:col-span-2 xl:col-span-12">
            <RpgGallery />
          </div>
        </main>
      </div>

      <footer className="rp-wood mt-4 rounded-none border-x-0 border-b-0 px-4 py-6 text-[var(--rp-parch)] lg:px-6 2xl:px-10">
        <div className="flex items-center gap-3">
          <img src="/ducks-logo.png" alt="" className="h-12 w-12" />
          <div>
            <p className="rp-title text-lg">Ducks Club</p>
            <p className="text-sm opacity-80">
              © 2026 DUCKS CLUB - MTG Tournaments. Magic: The Gathering é uma marca registrada da Wizards of the Coast.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
