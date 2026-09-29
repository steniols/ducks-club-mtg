import { calculateMetagame } from "@/data/tournaments";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MetagameSection() {
  const metagame = calculateMetagame();
  const topDecks = metagame.slice(0, 8);
  const totalAppearances = metagame.reduce((sum, deck) => sum + deck.appearances, 0);

  const distributionData = metagame.map((deck) => {
    const percentage = Number(((deck.appearances / totalAppearances) * 100).toFixed(1));
    return {
      ...deck,
      percentage,
      labelText: `${deck.appearances} ${deck.appearances === 1 ? "aparição" : "aparições"} • ${percentage}%`,
    };
  });

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
                  margin={{ top: 8, right: 150, left: 8, bottom: 8 }}
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
                      dataKey="labelText"
                      position="right"
                      fill="#F8FAFC"
                      fontSize={12}
                      fontWeight={700}
                    />
                    {distributionData.map((entry, index) => (
                      <Cell
                        key={`distribution-cell-${index}`}
                        fill={entry.appearances === 1 ? "#94A3B8" : "#F59E0B"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
