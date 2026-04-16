import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ChampionSection from "@/components/ChampionSection";
import RankingSection from "@/components/RankingSection";
import MetagameSection from "@/components/MetagameSection";
import TournamentsSection from "@/components/TournamentsSection";
import DuckSection from "@/components/DuckSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";

/**
 * DUCKS CLUB - MTG Tournaments Website
 * 
 * Design: Esportivo Moderno com Toque Lúdico
 * Paleta: Azul Marinho (#003366) + Laranja (#FF8C00) + Dourado (#FFD700)
 * Tipografia: Bebas Neue (títulos) + Inter (corpo)
 * 
 * Seções:
 * - Hero: Banner principal com CTAs
 * - Champion: Destaque do campeão atual
 * - Ranking: Ranking geral acumulado
 * - Metagame: Análise de decks com gráficos
 * - Tournaments: Histórico de torneios
 * - Duck: Seção especial para zoar o pato
 * - Footer: Informações e links
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ChampionSection />
        <RankingSection />
        <MetagameSection />
        <GallerySection />
        <TournamentsSection />
        <DuckSection />
      </main>
      <Footer />
    </div>
  );
}
