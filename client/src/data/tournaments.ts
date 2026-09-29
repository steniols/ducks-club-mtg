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
  championPhoto?: string;
  duck: string;
  duckPhoto?: string;
  players: Player[];
  decks: string[];
}

export const tournaments: Tournament[] = [
  {
    id: 1,
    month: "Janeiro",
    year: 2026,
    champion: "Robertinho",
    championPhoto: "/manus-storage/robertinho_fa0f58f8.png",
    duck: "Geniva",
    duckPhoto: "/manus-storage/geniva_c51a47f5.png",
    players: [
      { name: "Robertinho", points: 12, decks: ["Jund Wildfire"] },
      { name: "Xulze", points: 9, decks: ["Grixis Affinity"] },
      { name: "Hovelha", points: 9, decks: ["RG Monsters"] },
      { name: "Renan", points: 9, decks: ["Grixis Affinity"] },
      { name: "Moa", points: 9, decks: ["Walls Combo"] },
      { name: "Adriano", points: 6, decks: ["Jeskai Wildfire"] },
      { name: "Passos", points: 3, decks: ["Mono Black Burn"] },
      { name: "Geniva", points: 3, decks: ["Ralkos Burn"] },
    ],
    decks: ["Jund Wildfire", "Grixis Affinity", "RG Monsters", "Walls Combo", "Jeskai Wildfire", "Mono Black Burn", "Ralkos Burn"],
  },
  {
    id: 2,
    month: "Fevereiro",
    year: 2026,
    champion: "Will",
    championPhoto: "/manus-storage/will_9e788021.png",
    duck: "Geniva",
    duckPhoto: "/manus-storage/geniva_c51a47f5.png",
    players: [
      { name: "Will", points: 12, decks: ["Madness Burn"] },
      { name: "Moa", points: 12, decks: ["Walls Combo"] },
      { name: "Xulze", points: 12, decks: ["Grixis Affinity"] },
      { name: "Nona", points: 9, decks: ["Temur Ramp"] },
      { name: "Passos", points: 9, decks: ["Grixis Affinity"] },
      { name: "Bil", points: 9, decks: ["Madness Burn"] },
      { name: "Renan", points: 6, decks: ["Jund Wildfire"] },
      { name: "Hovelha", points: 6, decks: ["Jund Wildfire"] },
      { name: "Steniols", points: 6, decks: ["Madness Burn"] },
      { name: "Adriano", points: 6, decks: ["GlintBlade"] },
      { name: "Geniva", points: 3, decks: ["White Weenie"] },
    ],
    decks: ["Madness Burn", "Walls Combo", "Grixis Affinity", "Temur Ramp", "Jund Wildfire", "GlintBlade", "White Weenie"],
  },
  {
    id: 3,
    month: "Março",
    year: 2026,
    champion: "Farinha",
    championPhoto: "/manus-storage/farinha_de127be9.png",
    duck: "Vitor",
    duckPhoto: "/manus-storage/vitor_ccc9bbc4.png",
    players: [
      { name: "Farinha", points: 15, decks: ["Jeskai Synthesizer"] },
      { name: "Steniols", points: 12, decks: ["White Weenie"] },
      { name: "Xulze", points: 10, decks: ["RG Monsters"] },
      { name: "Will", points: 9, decks: ["Spy Walls"] },
      { name: "Adriano", points: 8, decks: ["Grixis Affinity"] },
      { name: "Igor", points: 8, decks: ["GlintBlade"] },
      { name: "Renan", points: 6, decks: ["Jund Wildfire"] },
      { name: "Bil", points: 6, decks: ["Madness Burn"] },
      { name: "Geniva", points: 4, decks: ["Mono U Terror"] },
      { name: "Hovelha", points: 4, decks: ["White Weenie"] },
      { name: "Moa", points: 3, decks: ["Spy Walls"] },
      { name: "Vitor", points: 1, decks: ["BG Tokens"] },
    ],
    decks: ["Jeskai Synthesizer", "White Weenie", "RG Monsters", "Spy Walls", "Grixis Affinity", "GlintBlade", "Jund Wildfire", "Madness Burn", "Mono U Terror", "BG Tokens"],
  },
  {
    id: 4,
    month: "Abril",
    year: 2026,
    champion: "Moa",
    championPhoto: "/manus-storage/moa_7f56529f.png",
    duck: "Bruninho",
    duckPhoto: "/bruninho.png",
    players: [
      { name: "Moa", points: 15, decks: ["Walls Combo"] },
      { name: "Robertinho", points: 12, decks: ["Jund Wildfire"] },
      { name: "Farinha", points: 9, decks: ["Mono Black Sacrifice"] },
      { name: "Steniols", points: 9, decks: ["UB Terror"] },
      { name: "Will", points: 9, decks: ["Bogles"] },
      { name: "Igor", points: 9, decks: ["GlintBlade"] },
      { name: "Adriano", points: 7, decks: ["Grixis Affinity"] },
      { name: "Geniva", points: 7, decks: ["Mono U Terror"] },
      { name: "Renan", points: 6, decks: ["Grixis Affinity"] },
      { name: "Xulze", points: 6, decks: ["Grixis Affinity"] },
      { name: "Hovelha", points: 6, decks: ["Tron Monsters"] },
      { name: "Vitor", points: 6, decks: ["BG Cat Food"] },
      { name: "Bruninho", points: 3, decks: ["Mono White Heroic"] },
    ],
    decks: ["Walls Combo", "Jund Wildfire", "Mono Black Sacrifice", "UB Terror", "Bogles", "GlintBlade", "Grixis Affinity", "Mono U Terror", "Tron Monsters", "BG Cat Food", "Mono White Heroic"],
  },
  {
    id: 5,
    month: "Maio",
    year: 2026,
    champion: "Robertinho",
    championPhoto: "/robertinho-maio.jpeg",
    duck: "Passos",
    duckPhoto: "/passos-maio.jpeg",
    players: [
      { name: "Robertinho", points: 13, decks: ["Jund Wildfire"] },
      { name: "Eron", points: 12, decks: ["Rakdos Madness"] },
      { name: "Will", points: 9, decks: ["Mono U Faeries"] },
      { name: "Moa", points: 9, decks: ["Spy Walls"] },
      { name: "Xulze", points: 9, decks: ["Grixis Affinity"] },
      { name: "Steniols", points: 9, decks: ["Tron Monsters"] },
      { name: "Vitor", points: 8, decks: ["BG Gardens"] },
      { name: "Renan", points: 6, decks: ["Mono U Faeries"] },
      { name: "Farinha", points: 6, decks: ["Jeskayy Ephemerate"] },
      { name: "Rafa", points: 6, decks: ["Bogles"] },
      { name: "Grabas", points: 6, decks: ["Altar Tron"] },
      { name: "Geniva", points: 4, decks: ["White Weenie"] },
      { name: "Hovelha", points: 3, decks: ["Boros Tireless Tribe"] },
      { name: "Passos", points: 3, decks: ["Mono U Crab"] },
    ],
    decks: ["Jund Wildfire", "Rakdos Madness", "Mono U Faeries", "Spy Walls", "Grixis Affinity", "Tron Monsters", "BG Gardens", "Jeskayy Ephemerate", "Bogles", "Altar Tron", "White Weenie", "Boros Tireless Tribe", "Mono U Crab"],
  },
  {
    id: 6,
    month: "Junho",
    year: 2026,
    champion: "Robertinho",
    championPhoto: "/manus-storage/campeao_9feb08c2.jpg",
    duck: "Vitor",
    duckPhoto: "/manus-storage/vitor-pato-do-mes_22698ff7.png",
    players: [
      { name: "Robertinho", points: 15, decks: ["Grixis Affinity"] },
      { name: "Renan", points: 12, decks: ["UR Skred"] },
      { name: "Adriano", points: 9, decks: ["Grixis Affinity"] },
      { name: "Passos", points: 9, decks: ["GlintBlade"] },
      { name: "Hovelha", points: 9, decks: ["Fractius"] },
      { name: "Farinha", points: 9, decks: ["Boros Tribe"] },
      { name: "Will", points: 6, decks: ["Spy Walls"] },
      { name: "Eron", points: 6, decks: ["Jund Bow"] },
      { name: "Nona", points: 3, decks: ["UB Fadas"] },
      { name: "Vitor", points: 3, decks: ["BG Gardens"] },
    ],
    decks: ["Grixis Affinity", "UR Skred", "GlintBlade", "Fractius", "Boros Tribe", "Spy Walls", "Jund Bow", "UB Fadas", "BG Gardens"],
  },
  {
    id: 7,
    month: "Julho",
    year: 2026,
    champion: "Xulze",
    championPhoto: "/manus-storage/Xulze-Campeao-do-mes_ee720c84.jpg",
    duck: "Bruninho",
    duckPhoto: "/manus-storage/Bruninho-pato-do-mes_4ac73262.jpg",
    players: [
      { name: "Xulze", points: 12, decks: ["Grixis Affinity"] },
      { name: "Hovelha", points: 12, decks: ["Tron Monsters"] },
      { name: "Grabas", points: 12, decks: ["Bogles"] },
      { name: "Eron", points: 10, decks: ["Simic Fog"] },
      { name: "Moa", points: 9, decks: ["Walls Combo"] },
      { name: "Will", points: 9, decks: ["Mono Red Madness"] },
      { name: "Passos", points: 8, decks: ["UB Affinity"] },
      { name: "Vitor", points: 7, decks: ["White Weenie"] },
      { name: "Steniols", points: 6, decks: ["Mono Red Rally"] },
      { name: "Robertinho", points: 6, decks: ["Mono Black Devotion"] },
      { name: "Adriano", points: 6, decks: ["Jund Wildfire"] },
      { name: "Farinha", points: 6, decks: ["Boros Bully"] },
      { name: "Renan", points: 6, decks: ["Jund Wildfire"] },
      { name: "Geniva", points: 5, decks: ["BW Blade"] },
      { name: "Bruninho", points: 3, decks: ["Mono White Heroic"] },
    ],
    decks: ["Grixis Affinity", "Tron Monsters", "Bogles", "Simic Fog", "Walls Combo", "Mono Red Madness", "UB Affinity", "White Weenie", "Mono Red Rally", "Mono Black Devotion", "Jund Wildfire", "Boros Bully", "BW Blade", "Mono White Heroic"],
  },
  {
    id: 8,
    month: "Agosto",
    year: 2026,
    champion: "Robertinho",
    championPhoto: "/manus-storage/agosto-2026-campeao-robertinho_74aca262.png",
    duck: "Nona",
    duckPhoto: "/manus-storage/agosto-2026-pato-nona_2ea08289.png",
    players: [
      { name: "Robertinho", points: 12, decks: ["UB Terror"] },
      { name: "Passos", points: 10, decks: ["Esper Affinity"] },
      { name: "Moa", points: 9, decks: ["Walls Combo"] },
      { name: "Hovelha", points: 8, decks: ["Peticionarios Mill"] },
      { name: "Bruno", points: 7, decks: ["Naya Fractius"] },
      { name: "Igor", points: 6, decks: ["BW Blade"] },
      { name: "Geniva", points: 4, decks: ["Jund Wildfire"] },
      { name: "Nona", points: 1, decks: ["UW Familiars"] },
    ],
    decks: ["UB Terror", "Esper Affinity", "Walls Combo", "Peticionarios Mill", "Naya Fractius", "BW Blade", "Jund Wildfire", "UW Familiars"],
  },
  {
    id: 9,
    month: "Setembro",
    year: 2026,
    champion: "Will",
    championPhoto: "/manus-storage/will-campeao_0d0b71c3.jpeg",
    duck: "Grabas",
    duckPhoto: "/manus-storage/grabas-pato-do-mes_49fd392d.jpeg",
    players: [
      { name: "Will", points: 12, decks: ["Mono Red Madness"] },
      { name: "Stenio", points: 12, decks: ["Mono Red Rally"] },
      { name: "Vitor", points: 12, decks: ["Deck não informado"] },
      { name: "Eron", points: 9, decks: ["Rakdos Madness"] },
      { name: "Passos", points: 6, decks: ["Mono Red Rally"] },
      { name: "Robertinho", points: 6, decks: ["UW Familiars"] },
      { name: "Moa", points: 6, decks: ["Spy Walls"] },
      { name: "Farinha", points: 6, decks: ["Boros Moxite"] },
      { name: "Hovelha", points: 3, decks: ["Tron Monsters"] },
      { name: "Grabas", points: 3, decks: ["Altar Tron"] },
    ],
    decks: ["Mono Red Madness", "Mono Red Rally", "Deck não informado", "Rakdos Madness", "UW Familiars", "Spy Walls", "Boros Moxite", "Tron Monsters", "Altar Tron"],
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
        if (deck === "Affinity") {
          normalizedDeck = "Grixis Affinity";
        }
        if (deck === "Jund") {
          normalizedDeck = "Jund Wildfire";
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
    "Grixis Affinity": "#FF6B6B",
    "Jund Wildfire": "#8B4513",
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
    "Mono Black Sacrifice": "#1C1C1C",
    "UB Terror": "#4169E1",
    "Bogles": "#228B22",
    "Tron Monsters": "#696969",
    "BG Cat Food": "#8B4513",
    "Mono White Heroic": "#FFFACD",
    "Rakdos Madness": "#8B0000",
    "Mono U Faeries": "#1E90FF",
    "BG Gardens": "#2F4F2F",
    "Jeskayy Ephemerate": "#FFD700",
    "Altar Tron": "#696969",
    "Boros Tireless Tribe": "#FF8C00",
    "Mono U Crab": "#4169E1",
    "UR Skred": "#FF6347",
    "Fractius": "#228B22",
    "Boros Tribe": "#FF8C00",
    "Jund Bow": "#8B4513",
    "UB Fadas": "#4169E1",
    "Simic Fog": "#20B2AA",
    "Mono Red Madness": "#FF4500",
    "UB Affinity": "#4169E1",
    "Mono Red Rally": "#FF4500",
    "Mono Black Devotion": "#1C1C1C",
    "Boros Bully": "#FF8C00",
    "BW Blade": "#808080",
    "Esper Affinity": "#708090",
    "Peticionarios Mill": "#4682B4",
    "Naya Fractius": "#DAA520",
    "UW Familiars": "#6495ED",
    "Deck não informado": "#A9A9A9",
    "Boros Moxite": "#FF8C00",
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

  const normalizePlayerName = (name: string): string => {
    // O nome apareceu como “Steniols” nos torneios anteriores e como “Stenio”
    // em setembro; ambos representam o mesmo jogador.
    if (name === "Steniols" || name === "Stenio") return "Stenio";
    return name;
  };

  tournaments.forEach((tournament) => {
    tournament.players.forEach((player) => {
      // Normalizar nome do jogador
      const normalizedName = normalizePlayerName(player.name);

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
        if (deck === "Affinity") {
          normalizedDeck = "Grixis Affinity";
        }
        if (deck === "Jund") {
          normalizedDeck = "Jund Wildfire";
        }
        playerStats[normalizedName].decks.add(normalizedDeck);
      });

      if (normalizedName === normalizePlayerName(tournament.champion)) {
        playerStats[normalizedName].championships += 1;
      }
      if (normalizedName === normalizePlayerName(tournament.duck)) {
        playerStats[normalizedName].duckCount += 1;
      }
    });
  });

  return Object.values(playerStats)
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((player) => ({
      ...player,
      decks: Array.from(player.decks),
    }));
};

export const getCurrentChampion = (): string => {
  if (tournaments.length === 0) return "Desconhecido";
  return tournaments[tournaments.length - 1].champion;
};

export const getCurrentDuck = (): string => {
  if (tournaments.length === 0) return "Desconhecido";
  return tournaments[tournaments.length - 1].duck;
};

export const getChampionshipCount = (playerName: string): number => {
  return tournaments.filter(t => t.champion === playerName).length;
};
