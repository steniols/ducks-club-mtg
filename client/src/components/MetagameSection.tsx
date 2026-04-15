import { calculateMetagame } from "@/data/tournaments";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MetagameSection() {
  const metagame = calculateMetagame();
  const topDecks = metagame.slice(0, 8);

  return (
    <section id="metagame" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-primary mb-4 text-center">
          ANÁLISE DO METAGAME
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Decks mais populares e seus desempenhos
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
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

          {/* Taxa de Vitória */}
          <Card className="shadow-lg border-2 border-secondary">
            <CardHeader>
              <CardTitle className="text-secondary">Taxa de Vitória</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topDecks}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="deckName" angle={-45} textAnchor="end" height={80} fontSize={12} />
                  <YAxis />
                  <Tooltip formatter={(value: any) => `${Number(value).toFixed(1)}%`} />
                  <Bar dataKey="winRate" fill="#FF8C00" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Distribuição de Decks */}
        <Card className="shadow-lg border-2 border-accent mb-8">
          <CardHeader>
            <CardTitle className="text-primary">Distribuição de Decks</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={topDecks}
                  dataKey="appearances"
                  nameKey="deckName"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ deckName, appearances }) => `${deckName}: ${appearances}`}
                >
                  {topDecks.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
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
                    <th className="text-center py-3 px-4 font-bold text-primary">Taxa de Vitória</th>
                  </tr>
                </thead>
                <tbody>
                  {metagame.map((deck, index) => (
                    <tr key={deck.deckName} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="py-3 px-4 font-semibold text-foreground">{deck.deckName}</td>
                      <td className="text-center py-3 px-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-full font-bold">
                          {deck.appearances}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-secondary font-bold">{deck.winRate.toFixed(1)}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
