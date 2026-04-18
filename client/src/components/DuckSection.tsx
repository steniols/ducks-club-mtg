import { getCurrentDuck, tournaments } from "@/data/tournaments";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function DuckSection() {
  const currentDuck = getCurrentDuck();
  const lastTournament = tournaments[tournaments.length - 1];
  const duckPlayer = lastTournament.players.find(p => p.name === currentDuck);

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
                <div className="flex items-center justify-center bg-destructive/5 p-8">
                  <img
                    src="/manus-storage/2_c67e269a.jpg"
                    alt={currentDuck}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Info */}
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-4xl font-bold text-destructive mb-4">
                    {currentDuck}
                  </h3>

                  <div className="space-y-4 mb-6">
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

          {/* Histórico de Patos */}
          <Card className="border-2 border-destructive bg-white">
            <CardContent className="p-6">
              <h4 className="text-2xl font-bold text-destructive mb-6">Histórico de Patos</h4>
              <div className="space-y-3">
                {tournaments.map((tournament, index) => (
                  <div
                    key={tournament.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      tournament.duck === currentDuck
                        ? "border-destructive bg-red-50"
                        : "border-muted bg-slate-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-foreground">
                          {tournament.month} de {tournament.year}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Pato: {tournament.duck}
                        </p>
                      </div>
                      <span className="text-2xl">
                        {tournament.duck === currentDuck ? "🦆" : "🏆"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
