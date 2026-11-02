# 🦆 Ducks Club — MTG Tournaments

Site do **Ducks Club**, grupo de Magic: The Gathering com torneios mensais. Ele reúne o campeão do mês, o ranking geral, o metagame, o histórico de torneios, a galeria de fotos e a tradicional homenagem ao **Pato do mês**, o último colocado.

🌐 **No ar:** https://ducks-club-mtg.pages.dev/

## O que tem no site

- **Campeão Atual:** foto, pontos, títulos e deck do vencedor do último torneio.
- **Ranking:** classificação geral somando todos os torneios.
- **Metagame:** decks mais jogados e seu desempenho.
- **Torneios:** resultado de cada mês, jogador por jogador.
- **O Pato:** cartaz do último colocado e o histórico de patos.
- **Galeria:** fotos dos encontros.

## Tecnologias

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) para desenvolvimento e build
- [Tailwind CSS 4](https://tailwindcss.com/) e componentes [shadcn/ui](https://ui.shadcn.com/) (Radix)
- [Recharts](https://recharts.org/) nos gráficos de metagame
- [Wouter](https://github.com/molefrog/wouter) para as rotas
- Gerenciador de pacotes: **pnpm**

## Rodando localmente

Pré-requisitos: Node.js 20+ e pnpm (`npm i -g pnpm`).

```bash
pnpm install       # instala as dependências
pnpm dev           # servidor de desenvolvimento em http://localhost:3000
pnpm check         # checagem de tipos do TypeScript
pnpm build         # gera o site em dist/public
pnpm preview       # serve o build localmente para conferir
```

## Atualizando o site a cada torneio

Quase tudo vem de um único arquivo: [`client/src/data/tournaments.ts`](client/src/data/tournaments.ts). Para registrar um novo torneio, adicione um item **no fim** da lista `tournaments`:

```ts
{
  id: 12,
  month: "Dezembro",
  year: 2026,
  champion: "Robertinho",
  championPhoto: "/fotos/campeao-dezembro.jpg", // opcional
  duck: "Geniva",
  duckPhoto: "/fotos/pato-dezembro.jpg",          // opcional
  players: [
    { name: "Robertinho", points: 12, decks: ["Jund Wildfire"] },
    // ...demais jogadores
  ],
  decks: ["Jund Wildfire" /* ...todos os decks do torneio */],
},
```

O **último** item da lista é tratado como o torneio atual. É dele que saem o Campeão Atual e o Pato do mês. Ranking, metagame e contagem de títulos são calculados automaticamente.

Imagens e outros arquivos estáticos ficam em [`client/public/`](client/public/) e são referenciados a partir da raiz (ex.: `client/public/fotos/x.jpg` vira `/fotos/x.jpg`).

## Estrutura

```
client/
  public/             imagens, fontes, sons e rostos dos patos
  src/
    data/             tournaments.ts — dados de todos os torneios
    pages/            HomeRpg.tsx (site atual) e Home.tsx (tema clássico)
    components/rpg/   seções do tema RPG, cenário do header e som do pato
    components/       seções do tema clássico e componentes de UI
    index.css         estilos e animações do tema RPG
server/               servidor Express opcional (pnpm start) para servir o build
```

## Deploy

O site é publicado no **Cloudflare Pages** a cada push na branch `main`. Configuração do projeto:

| Campo | Valor |
|---|---|
| Build command | `pnpm run build` |
| Build output directory | `dist/public` |
| Root directory | *(vazio)* |

O arquivo [`wrangler.jsonc`](wrangler.jsonc) tem a configuração equivalente caso o projeto seja publicado como Cloudflare Worker.

---

Magic: The Gathering é uma marca registrada da Wizards of the Coast. Este é um site de fãs, sem vínculo oficial.
