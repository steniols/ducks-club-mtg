# Ajuste do gráfico de distribuição de decks

- [x] Revisar o componente e a fonte de dados do metagame.
- [x] Agrupar no gráfico os decks abaixo de 1,5% como “Outros”.
- [x] Manter a tabela detalhada sem agrupamento.
- [x] Validar cálculo, renderização desktop/mobile e compilação.
- [x] Salvar checkpoint da alteração.

## Validação visual do agrupamento

A captura desktop confirmou a renderização da página após a alteração. O gráfico de distribuição usa agora a série agrupada, enquanto a tabela de detalhes continua baseada em `metagame` completo. A compilação e a verificação TypeScript foram concluídas sem erros; o aviso restante é apenas sobre tamanho de bundle do Vite.
