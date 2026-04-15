import { tournaments } from "@/data/tournaments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users } from "lucide-react";

export default function TournamentsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-primary mb-4 text-center">
          HISTÓRICO DE TORNEIOS
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Todos os torneios realizados em 2026
        </p>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {tournaments.map((tournament) => (
            <Card key={tournament.id} className="shadow-lg border-2 border-primary hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-primary to-slate-800 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl mb-2">
                      {tournament.month} de {tournament.year}
                    </CardTitle>
                    <p className="text-sm opacity-90">Torneio #{tournament.id}</p>
                  </div>
                  <Trophy className="w-12 h-12 text-accent" />
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Champion */}
                  <div className="bg-accent/10 border-2 border-accent rounded-lg p-6">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">CAMPEÃO</p>
                    <p className="text-3xl font-bold text-primary mb-2">
                      {tournament.champion}
                    </p>
                    <p className="text-xs text-muted-foreground">👑 Vencedor do torneio</p>
                  </div>

                  {/* Duck */}
                  <div className="bg-destructive/10 border-2 border-destructive rounded-lg p-6">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">O PATO</p>
                    <p className="text-3xl font-bold text-destructive mb-2">
                      {tournament.duck}
                    </p>
                    <p className="text-xs text-muted-foreground">🦆 Último colocado</p>
                  </div>
                </div>

                {/* Players */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-primary" />
                    <h4 className="text-lg font-bold text-primary">
                      Classificação ({tournament.players.length} jogadores)
                    </h4>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {tournament.players.map((player, index) => (
                      <div
                        key={player.name}
                        className={`flex justify-between items-center p-3 rounded-lg ${
                          index === 0
                            ? "bg-accent/20 border-l-4 border-accent"
                            : index === tournament.players.length - 1
                            ? "bg-destructive/20 border-l-4 border-destructive"
                            : "bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg text-primary w-8 text-center">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-semibold text-foreground">{player.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {player.decks.join(", ")}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-lg text-primary">
                          {player.points}
                        </span>
                      </div>
                    ))}\n                  </div>
                </div>

                {/* Decks */}
                <div>
                  <h4 className="text-lg font-bold text-primary mb-3">Decks Utilizados</h4>
                  <div className="flex flex-wrap gap-2">
                    {tournament.decks.map((deck) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
