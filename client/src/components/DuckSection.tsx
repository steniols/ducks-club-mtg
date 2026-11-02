import { useState } from "react";
import { getCurrentDuck, tournaments } from "@/data/tournaments";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, X } from "lucide-react";

export const duckCardImages: Record<string, string> = {
  Geniva: "/manus-storage/geniva-pato_d894997f.jpeg",
  Passos: "/manus-storage/passos-pato_aa503c8c.jpeg",
  Vitor: "/manus-storage/vitor-pato_2ccc74c7.jpeg",
  Bruninho: "/manus-storage/bruno-pato_e147bbf7.jpeg",
  Nona: "/manus-storage/nona-pato_c6597fa4.jpeg",
  Grabas: "/manus-storage/grabas-pato_e4bf6ab4.jpeg",
  Hovelha: "/manus-storage/hovelha-pato.jpg",
};

export default function DuckSection() {
  const currentDuck = getCurrentDuck();
  const lastTournament = tournaments[tournaments.length - 1];
  const duckPlayer = lastTournament.players.find(p => p.name === currentDuck);
  const [selectedCard, setSelectedCard] = useState<{
    name: string;
    month: string;
    year: number;
    image: string;
  } | null>(null);

  const duckMessages = [
    "🦆 O PATO REINA! 🦆",
    "Aquele que ficou em último lugar...",
    "Honra ao bravo guerreiro que enfrentou a derrota!",
    "Melhor sorte no próximo mês, campeão do fracasso!",
    "Nem todo herói vence, mas todo pato tenta!",
    "A glória do pato é eterna... eternamente em último!",
  ];

  return (
    <section id="duck" className="py-20 bg-gradient-to-b from-destructive/10 to-red-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 text-6xl opacity-20 animate-bounce">🦆</div>
      <div className="absolute bottom-10 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDelay: "0.5s" }}>🦆</div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-16 h-16 text-destructive animate-pulse" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-destructive mb-4">
              🦆 O PATO 🦆
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              Honramos aquele que enfrentou a maior desventura
            </p>
          </div>

          {/* Main Duck Card */}
          <Card className="border-4 border-destructive shadow-2xl mb-8 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Foto */}
                <div className="flex min-h-[360px] items-center justify-center bg-destructive/5 p-6 md:min-h-[520px] md:p-8">
                  <img
                    src={lastTournament.duckPhoto || "/passos-maio.jpeg"}
                    alt={currentDuck}
                    className="max-h-[500px] w-auto max-w-full rounded-lg object-contain object-center shadow-lg"
                  />
                </div>

                {/* Info */}
                <div className="p-8 flex flex-col items-center justify-center text-center">
                  <h3 className="text-4xl font-bold text-destructive mb-4">
                    {currentDuck}
                  </h3>

                  <div className="w-full space-y-4 mb-6">
                    <div className="bg-red-50 p-4 rounded-lg border-2 border-destructive">
                      <p className="text-sm text-muted-foreground font-semibold mb-2">POSIÇÃO NO ÚLTIMO TORNEIO</p>
                      <p className="text-3xl font-bold text-destructive">
                        🥚 {lastTournament.players.length}º lugar
                      </p>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg border-2 border-destructive">
                      <p className="text-sm text-muted-foreground font-semibold mb-2">PONTUAÇÃO</p>
                      <p className="text-3xl font-bold text-destructive">
                        {duckPlayer?.points || 0} pontos
                      </p>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg border-2 border-destructive">
                      <p className="text-sm text-muted-foreground font-semibold mb-2">DECK UTILIZADO</p>
                      <p className="text-lg font-bold text-primary">
                        {duckPlayer?.decks[0] || "Desconhecido"}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm italic text-muted-foreground">
                    "Nem todo dia é de glória, mas a luta continua!"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motivational Messages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {duckMessages.map((message, index) => (
              <div
                key={index}
                className="bg-white border-2 border-destructive rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <p className="text-center font-semibold text-destructive text-lg">
                  {message}
                </p>
              </div>
            ))}
          </div>

          {/* Galeria de cards comemorativos */}
          <Card className="border-2 border-destructive bg-white">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-destructive">Históricos dos Patos</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Clique em um card para ampliar a homenagem ao último colocado do mês.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {tournaments.map((tournament) => {
                  const image = duckCardImages[tournament.duck];
                  if (!image) return null;

                  const card = {
                    name: tournament.duck,
                    month: tournament.month,
                    year: tournament.year,
                    image,
                  };

                  return (
                    <button
                      key={tournament.id}
                      type="button"
                      onClick={() => setSelectedCard(card)}
                      className="group text-left rounded-xl overflow-hidden border-2 border-destructive/20 bg-slate-50 shadow-md transition-all hover:-translate-y-1 hover:border-destructive hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
                      aria-label={`Ampliar card do pato ${tournament.duck}, ${tournament.month} de ${tournament.year}`}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-slate-200">
                        <img
                          src={image}
                          alt={`Card comemorativo do pato ${tournament.duck}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-10 text-white">
                          <p className="font-bold">{tournament.month} {tournament.year}</p>
                          <p className="text-sm text-yellow-200">Pato {tournament.duck}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lightbox */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedCard(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Card comemorativo do pato ${selectedCard.name}`}
        >
          <div
            className="relative flex max-h-[95vh] max-w-lg flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCard(null)}
              className="absolute -right-2 -top-2 z-10 rounded-full bg-white p-2 text-slate-800 shadow-lg transition-colors hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Fechar card ampliado"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedCard.image}
              alt={`Card comemorativo ampliado do pato ${selectedCard.name}`}
              className="max-h-[82vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            <p className="mt-3 text-center text-lg font-bold text-white">
              {selectedCard.month} de {selectedCard.year} — Pato {selectedCard.name} (Arte by Robertinho)
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
