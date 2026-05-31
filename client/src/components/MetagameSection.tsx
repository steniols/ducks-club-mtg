import { calculateMetagame } from "@/data/tournaments";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MetagameSection() {
  const metagame = calculateMetagame();
  const topDecks = metagame.slice(0, 8);

  // Calcular total de aparições para percentuais
  const totalAppearances = metagame.reduce((sum, d) => sum + d.appearances, 0);

  return (
    <section id="metagame" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-primary mb-4 text-center">
          ANÁLISE DO METAGAME
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Decks mais populares e seus desempenhos
        </p>

        <div className="grid grid-cols-1 gap-8 mb-12">
          {/* Aparições por Deck */}
          <Card className="shadow-lg border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-primary">Decks Mais Populares</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topDecks}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="deckName" angle={-45} textAnchor="end" height={80} fontSize={12} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="appearances" fill="#003366" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Distribuição de Decks com Percentual */}
        <Card className="shadow-lg border-2 border-accent mb-8">
          <CardHeader>
            <CardTitle className="text-primary">Distribuição de Decks</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={550}>
              <PieChart>
                <Pie
                  data={metagame}
                  dataKey="appearances"
                  nameKey="deckName"
                  cx="50%"
                  cy="50%"
                  outerRadius={typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 180}
                  label={({ deckName, appearances }) => {
                    const percentage = ((appearances / totalAppearances) * 100).toFixed(1);
                    return `${deckName}: ${percentage}%`;
                  }}
                >
                  {metagame.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => {
                    const percentage = ((Number(value) / totalAppearances) * 100).toFixed(1);
                    return `${percentage}%`;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tabela de Detalhes */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">Detalhes Completos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th className="text-left py-3 px-4 font-bold text-primary">Deck</th>
                    <th className="text-center py-3 px-4 font-bold text-primary">Aparições</th>
                    <th className="text-center py-3 px-4 font-bold text-primary">Percentual</th>
                  </tr>
                </thead>
                <tbody>
                  {metagame.map((deck, index) => {
                    const percentage = ((deck.appearances / totalAppearances) * 100).toFixed(1);
                    return (
                      <tr key={deck.deckName} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="py-3 px-4 font-semibold text-foreground">{deck.deckName}</td>
                        <td className="text-center py-3 px-4">
                          <span className="bg-primary text-white px-3 py-1 rounded-full font-bold">
                            {deck.appearances}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className="text-secondary font-bold">{percentage}%</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
