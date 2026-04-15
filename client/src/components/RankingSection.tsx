import { calculatePlayerStats } from "@/data/tournaments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Medal, Zap } from "lucide-react";

export default function RankingSection() {
  const players = calculatePlayerStats();

  return (
    <section id="ranking" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-primary mb-4 text-center">
          RANKING GERAL
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Pontuação acumulada de todos os torneios
        </p>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {players.map((player, index) => {
            const medalColor = index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : index === 2 ? "text-orange-600" : "text-muted-foreground";
            const bgColor = index === 0 ? "bg-yellow-50 border-yellow-300" : index === 1 ? "bg-gray-50 border-gray-300" : index === 2 ? "bg-orange-50 border-orange-300" : "bg-white";
            const borderWidth = index < 3 ? "border-2" : "border";

            return (
              <Card key={player.name} className={`${bgColor} ${borderWidth} shadow-lg hover:shadow-xl transition-shadow`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg">
                        {index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-primary">
                          {player.name}
                        </h3>
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Zap className="w-4 h-4 text-secondary" />
                            {player.championships} campeão{player.championships !== 1 ? 's' : ''}
                          </span>
                          <span>
                            {player.tournaments} torneio{player.tournaments !== 1 ? 's' : ''}
                          </span>
                          {player.duckCount > 0 && (
                            <span className="text-destructive font-semibold">
                              🦆 {player.duckCount}x pato
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end mb-2">
                        {index < 3 && <Medal className={`w-6 h-6 ${medalColor}`} />}
                      </div>
                      <p className="text-4xl font-bold text-primary">
                        {player.totalPoints}
                      </p>
                      <p className="text-xs text-muted-foreground">pontos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
