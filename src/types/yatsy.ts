export interface Player {
  id: string;
  name: string;
}

export interface YatsyScores {
  // Övre sektionen (1-6)
  ones: number | null;        // Ettorna
  twos: number | null;        // Tvåorna
  threes: number | null;      // Treorna
  fours: number | null;       // Fyrorna
  fives: number | null;       // Femmorna
  sixes: number | null;       // Sexorna

  // Nedre sektionen
  threeOfAKind: number | null;    // Triss
  fourOfAKind: number | null;     // Fyrtal
  fullHouse: number | null;       // Kåk
  smallStraight: number | null;   // Liten stege
  largeStraight: number | null;   // Stor stege
  yatsy: number | null;           // Yatsy
  chance: number | null;          // Chans
}

export interface PlayerScore extends YatsyScores {
  playerId: string;
  upperSum: number;      // Summa övre sektionen
  upperBonus: number;    // Bonus (50p om summa >= 63)
  lowerSum: number;      // Summa nedre sektionen
  totalScore: number;    // Totalsumma
}

export interface GameState {
  id: string;
  players: Player[];
  scores: PlayerScore[];
  currentPlayerIndex: number;
  gameStarted: boolean;
  gameFinished: boolean;
  createdAt: Date;
  finishedAt?: Date;
}

export interface GameHistory {
  games: GameState[];
}

export type ScoreCategory = keyof YatsyScores;