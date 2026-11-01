import { useState } from "react";
import { tournaments } from "@/data/tournaments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users } from "lucide-react";

export default function TournamentsSection() {
  const latestTournament = tournaments[tournaments.length - 1];
  const [selectedTournamentId, setSelectedTournamentId] = useState(latestTournament.id);
  const selectedTournament = tournaments.find(
    (tournament) => tournament.id === selectedTournamentId
  ) ?? latestTournament;

  return (
    <section id="tournaments" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-primary mb-4 text-center">
          HISTÓRICO DE TORNEIOS
        </h2>
        <p className="text-center text-muted-foreground mb-8 text-lg">
          Escolha um mês para conferir o ranking, o campeão, o pato e os decks utilizados.
        </p>

        {/* Filtro mensal: outubro aparece selecionado por padrão */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 snap-x" role="tablist" aria-label="Filtrar torneio por mês">
            {tournaments.map((tournament) => {
              const isSelected = tournament.id === selectedTournament.id;
              return (
                <button
                  key={tournament.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedTournamentId(tournament.id)}
                  className={`shrink-0 snap-start rounded-full px-5 py-2.5 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isSelected
                      ? "bg-primary text-white shadow-md"
                      : "border border-primary/20 bg-slate-50 text-primary hover:border-primary hover:bg-primary/10"
                  }`}
                >
                  {tournament.month}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Exibindo: {selectedTournament.month} de {selectedTournament.year}
          </p>
        </div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          <Card className="shadow-lg border-2 border-primary hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary to-slate-800 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl mb-2">
                    {selectedTournament.month} de {selectedTournament.year}
                  </CardTitle>
                  <p className="text-sm opacity-90">Torneio #{selectedTournament.id}</p>
                </div>
                <Trophy className="w-12 h-12 text-accent" aria-hidden="true" />
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-accent/10 border-2 border-accent rounded-lg p-6 flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">CAMPEÃO</p>
                    <p className="text-2xl font-bold text-primary mb-2">
                      {selectedTournament.champion}
                    </p>
                    <p className="text-xs text-muted-foreground">👑 Vencedor do torneio</p>
                  </div>
                  {selectedTournament.championPhoto && (
                    <img
                      src={selectedTournament.championPhoto}
                      alt={selectedTournament.champion}
                      className="w-24 h-24 rounded-full object-cover border-2 border-accent flex-shrink-0"
                    />
                  )}
                </div>

                <div className="bg-destructive/10 border-2 border-destructive rounded-lg p-6 flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">O PATO</p>
                    <p className="text-2xl font-bold text-destructive mb-2">
                      {selectedTournament.duck}
                    </p>
                    <p className="text-xs text-muted-foreground">🦆 Último colocado</p>
                  </div>
                  {selectedTournament.duckPhoto && (
                    <img
                      src={selectedTournament.duckPhoto}
                      alt={selectedTournament.duck}
                      className="w-24 h-24 rounded-full object-cover border-2 border-destructive flex-shrink-0"
                    />
                  )}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-primary" aria-hidden="true" />
                  <h4 className="text-lg font-bold text-primary">
                    Classificação ({selectedTournament.players.length} jogadores)
                  </h4>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {selectedTournament.players.map((player, index) => (
                    <div
                      key={player.name}
                      className={`flex justify-between items-center p-3 rounded-lg ${
                        index === 0
                          ? "bg-accent/20 border-l-4 border-accent"
                          : index === selectedTournament.players.length - 1
                          ? "bg-destructive/20 border-l-4 border-destructive"
                          : "bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-bold text-lg text-primary w-8 text-center shrink-0">
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground truncate">{player.name}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {player.decks.join(", ")}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-lg text-primary ml-3 shrink-0">
                        {player.points}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-primary mb-3">Decks Utilizados</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTournament.decks.map((deck) => (
                    <span
                      key={deck}
                      className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {deck}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
