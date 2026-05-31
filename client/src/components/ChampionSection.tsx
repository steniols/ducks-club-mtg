import { getCurrentChampion, tournaments } from "@/data/tournaments";
import { Trophy } from "lucide-react";

export default function ChampionSection() {
  const champion = getCurrentChampion();
  const lastTournament = tournaments[tournaments.length - 1];

  return (
    <section className="py-16 bg-gradient-to-r from-accent to-yellow-400 relative overflow-hidden">
      {/* Diagonal background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.1) 10px, rgba(0,0,0,.1) 20px)'
        }}></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Trophy className="w-16 h-16 text-primary drop-shadow-lg" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 drop-shadow-md">
            CAMPEÃO ATUAL
          </h2>
          
          <div className="bg-white rounded-lg shadow-2xl p-8 border-4 border-primary">
            <img 
              src="/robertinho-maio.jpeg"
              alt={champion}
              className="w-64 h-64 rounded-lg object-cover mx-auto mb-6 shadow-lg border-2 border-primary"
            />
            <p className="text-6xl md:text-7xl font-bold text-primary mb-4 drop-shadow-lg">
              {champion}
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Torneio de {lastTournament.month} {lastTournament.year}
            </p>
            <div className="h-1 w-24 bg-secondary mx-auto"></div>
          </div>

          <p className="text-primary font-bold text-lg mt-8 drop-shadow-md">
            👑 Reinando com honra e glória! 👑
          </p>
        </div>
      </div>

      {/* Diagonal cut at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background" style={{
        clipPath: 'polygon(0 50%, 100% 0, 100% 100%, 0 100%)'
      }}></div>
    </section>
  );
}
