export interface Player {
  name: string;
  points: number;
  decks: string[];
}

export interface Tournament {
  id: number;
  month: string;
  year: number;
  champion: string;
  duck: string;
  players: Player[];
  decks: string[];
}

export const tournaments: Tournament[] = [
  {
    id: 1,
    month: "Fevereiro",
    year: 2026,
    champion: "Robertinho",
    duck: "Geniva",
    players: [
      { name: "Will", points: 12, decks: ["Madness Burn"] },
      { name: "Moa", points: 12, decks: ["Walls Combo"] },
      { name: "Xulze", points: 12, decks: ["Affinity"] },
      { name: "Nona", points: 9, decks: ["Temur Ramp"] },
      { name: "Passos", points: 9, decks: ["Affinity"] },
      { name: "Bil", points: 9, decks: ["Madness Burn"] },
      { name: "Renan", points: 6, decks: ["Jund Wildfire"] },
      { name: "Hovelha", points: 6, decks: ["Jund Wildfire"] },
      { name: "Steniols", points: 6, decks: ["Madness Burn"] },
      { name: "Adriano", points: 6, decks: ["GlintBlade"] },
      { name: "Geniva", points: 3, decks: ["White Weenie"] },
    ],
    decks: ["Madness Burn", "Walls Combo", "Affinity", "Temur Ramp", "Jund Wildfire", "GlintBlade", "White Weenie"],
  },
  {
    id: 2,
    month: "Janeiro",
    year: 2026,
    champion: "Will",
    duck: "Geniva",
    players: [
      { name: "Robertinho", points: 12, decks: ["Jund Wildfire"] },
      { name: "Xulze", points: 9, decks: ["Affinity"] },
      { name: "Hovelha", points: 9, decks: ["RG Monsters"] },
      { name: "Renan", points: 9, decks: ["Affinity"] },
      { name: "Moa", points: 9, decks: ["Walls Combo"] },
      { name: "Adriano", points: 6, decks: ["Jeskai Wildfire"] },
      { name: "Passos", points: 3, decks: ["Mono Black Burn"] },
      { name: "Geniva", points: 3, decks: ["Ralkos Burn"] },
    ],
    decks: ["Jund Wildfire", "Affinity", "RG Monsters", "Walls Combo", "Jeskai Wildfire", "Mono Black Burn", "Ralkos Burn"],
  },
  {
    id: 3,
    month: "Março",
    year: 2026,
    champion: "Farinha",
    duck: "Vitor",
    players: [
      { name: "Farinha", points: 15, decks: ["Jeskai Synthesizer"] },
      { name: "Steniols", points: 12, decks: ["White Weenie"] },
      { name: "Xulze", points: 10, decks: ["RG Monsters"] },
      { name: "Will", points: 9, decks: ["Spy Walls"] },
      { name: "Adriano", points: 8, decks: ["Affinity"] },
      { name: "Igor", points: 8, decks: ["GlintBlade"] },
      { name: "Renan", points: 6, decks: ["Jund"] },
      { name: "Bil", points: 6, decks: ["Mono Red Madness"] },
      { name: "Geniva", points: 4, decks: ["Mono U Terror"] },
      { name: "Hovelha", points: 4, decks: ["White Weenie"] },
      { name: "Moa", points: 3, decks: ["Spy Walls"] },
      { name: "Vitor", points: 1, decks: ["BG Tokens"] },
    ],
    decks: ["Jeskai Synthesizer", "White Weenie", "RG Monsters", "Spy Walls", "Affinity", "GlintBlade", "Jund", "Mono Red Madness", "Mono U Terror", "BG Tokens"],
  },
];

export interface MetagameStats {
  deckName: string;
  appearances: number;
  winRate: number;
  color: string;
}

export const calculateMetagame = (): MetagameStats[] => {
  const deckStats: { [key: string]: { appearances: number; wins: number } } = {};

  tournaments.forEach((tournament) => {
    tournament.players.forEach((player, index) => {
      player.decks.forEach((deck) => {
        // Normalizar nomes de decks similares
        let normalizedDeck = deck;
        if (deck === "White Wennie") {
          normalizedDeck = "White Weenie";
        }
        if (deck === "Mono Red Madness") {
          normalizedDeck = "Madness Burn";
        }
        if (deck === "Jund Wildfire") {
          normalizedDeck = "Jund";
        }

        if (!deckStats[normalizedDeck]) {
          deckStats[normalizedDeck] = { appearances: 0, wins: 0 };
        }
        deckStats[normalizedDeck].appearances += 1;
        // Primeiro lugar (maior pontuacao) ganha
        const maxPoints = Math.max(...tournament.players.map(p => p.points));
        if (player.points === maxPoints) {
          deckStats[normalizedDeck].wins += 1;
        }
      });
    });
  });

  return Object.entries(deckStats)
    .map(([deckName, stats]) => ({
      deckName,
      appearances: stats.appearances,
      winRate: stats.appearances > 0 ? (stats.wins / stats.appearances) * 100 : 0,
      color: getColorForDeck(deckName),
    }))
    .sort((a, b) => b.appearances - a.appearances);
};

const getColorForDeck = (deckName: string): string => {
  const colorMap: { [key: string]: string } = {
    "Affinity": "#FF6B6B",
    "Jund": "#8B4513",
    "RG Monsters": "#FF8C00",
    "Walls Combo": "#4169E1",
    "Jeskai Wildfire": "#FFD700",
    "Mono Black Burn": "#2F4F4F",
    "Ralkos Burn": "#DC143C",
    "Madness Burn": "#FF4500",
    "Temur Ramp": "#228B22",
    "GlintBlade": "#00CED1",
    "White Weenie": "#F0F8FF",
    "Mono U Terror": "#0000CD",
    "Spy Walls": "#4B0082",
    "BG Tokens": "#2F4F2F",
    "Jeskai Synthesizer": "#FFD700",
  };
  return colorMap[deckName] || "#666666";
};

export const calculatePlayerStats = () => {
  const playerStats: {
    [key: string]: {
      name: string;
      totalPoints: number;
      tournaments: number;
      championships: number;
      duckCount: number;
      decks: Set<string>;
    };
  } = {};

  tournaments.forEach((tournament) => {
    tournament.players.forEach((player) => {
      // Normalizar nome do jogador
      const normalizedName = player.name;

      if (!playerStats[normalizedName]) {
        playerStats[normalizedName] = {
          name: normalizedName,
          totalPoints: 0,
          tournaments: 0,
          championships: 0,
          duckCount: 0,
          decks: new Set(),
        };
      }
      playerStats[normalizedName].totalPoints += player.points;
      playerStats[normalizedName].tournaments += 1;
      player.decks.forEach((deck) => {
        // Normalizar nome do deck
        let normalizedDeck = deck;
        if (deck === "White Wennie") {
          normalizedDeck = "White Weenie";
        }
        if (deck === "Mono Red Madness") {
          normalizedDeck = "Madness Burn";
        }
        if (deck === "Jund Wildfire") {
          normalizedDeck = "Jund";
        }
        playerStats[normalizedName].decks.add(normalizedDeck);
      });

      if (player.name === tournament.champion) {
        playerStats[normalizedName].championships += 1;
      }
      if (player.name === tournament.duck) {
        playerStats[normalizedName].duckCount += 1;
      }
    });
  });

  return Object.values(playerStats).sort((a, b) => b.totalPoints - a.totalPoints);
};

export const getCurrentChampion = () => {
  return tournaments[tournaments.length - 1].champion;
};

export const getCurrentDuck = () => {
  return tournaments[tournaments.length - 1].duck;
};
