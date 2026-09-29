import { calculateMetagame } from "@/data/tournaments";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MetagameSection() {
  const metagame = calculateMetagame();
  const topDecks = metagame.slice(0, 8);

  // Calcular total de aparições e agrupar decks com menos de 1,5% na distribuição.
  const totalAppearances = metagame.reduce((sum, d) => sum + d.appearances, 0);
  const groupedMetagame = (() => {
    const visibleDecks = metagame.filter(
      (deck) => (deck.appearances / totalAppearances) * 100 >= 1.5
    );
    const otherAppearances = metagame
      .filter((deck) => (deck.appearances / totalAppearances) * 100 < 1.5)
      .reduce((sum, deck) => sum + deck.appearances, 0);

    if (otherAppearances === 0) return visibleDecks;

    return [
      ...visibleDecks,
      {
        deckName: "Outros",
        appearances: otherAppearances,
        winRate: 0,
        color: "#94A3B8",
      },
    ];
  })();

  const distributionData = groupedMetagame.map((deck) => ({
    ...deck,
    percentage: Number(((deck.appearances / totalAppearances) * 100).toFixed(1)),
  }));

  // Na tabela, consolidar apenas os decks usados uma vez para manter os detalhes legíveis.
  const detailedMetagame = (() => {
    const recurringDecks = metagame.filter((deck) => deck.appearances > 1);
    const oneUseAppearances = metagame
      .filter((deck) => deck.appearances === 1)
      .reduce((sum, deck) => sum + deck.appearances, 0);

    if (oneUseAppearances === 0) return recurringDecks;

    return [
      ...recurringDecks,
      {
        deckName: "Outros",
        appearances: oneUseAppearances,
        winRate: 0,
        color: "#94A3B8",
      },
    ];
  })();

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
            <div className="rounded-lg bg-slate-800 p-3 sm:p-6">
              <ResponsiveContainer width="100%" height={Math.max(320, distributionData.length * 44 + 40)}>
                <BarChart
                  data={distributionData}
                  layout="vertical"
                  margin={{ top: 8, right: 48, left: 8, bottom: 8 }}
                  barCategoryGap="28%"
                >
                  <CartesianGrid horizontal={false} stroke="#475569" strokeDasharray="2 4" />
                  <XAxis type="number" domain={[0, "dataMax"]} hide />
                  <YAxis
                    type="category"
                    dataKey="deckName"
                    width={128}
                    tick={{ fill: "#F8FAFC", fontSize: 12, fontWeight: 700 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(148, 163, 184, 0.12)" }}
                    formatter={(value: number) => [`${value.toFixed(1)}%`, "Participação"]}
                    labelStyle={{ color: "#0F172A", fontWeight: 700 }}
                  />
                  <Bar dataKey="percentage" radius={[0, 3, 3, 0]}>
                    <LabelList
                      dataKey="percentage"
                      position="right"
                      formatter={(value: number) => `${value.toFixed(1)}%`}
                      fill="#F8FAFC"
                      fontSize={12}
                      fontWeight={700}
                    />
                    {distributionData.map((entry, index) => (
                      <Cell
                        key={`distribution-cell-${index}`}
                        fill={entry.deckName === "Outros" ? "#94A3B8" : "#F59E0B"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
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
                  {detailedMetagame.map((deck, index) => {
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
