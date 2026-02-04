import { YatsyScores, PlayerScore } from '@/types/yatsy';

export function calculateUpperSum(scores: YatsyScores): number {
  const upperScores: (number | null)[] = [
    scores.ones,
    scores.twos,
    scores.threes,
    scores.fours,
    scores.fives,
    scores.sixes
  ];

  return upperScores.reduce((sum: number, score: number | null) => {
    return sum + (score ?? 0);
  }, 0);
}

export function calculateUpperBonus(upperSum: number): number {
  return upperSum >= 63 ? 50 : 0;
}

export function calculateLowerSum(scores: YatsyScores): number {
  const lowerScores: (number | null)[] = [
    scores.threeOfAKind,
    scores.fourOfAKind,
    scores.fullHouse,
    scores.smallStraight,
    scores.largeStraight,
    scores.yatsy,
    scores.chance
  ];

  return lowerScores.reduce((sum: number, score: number | null) => {
    return sum + (score ?? 0);
  }, 0);
}

export function calculateTotalScore(playerScore: PlayerScore): number {
  return playerScore.upperSum + playerScore.upperBonus + playerScore.lowerSum;
}

export function updatePlayerScore(playerScore: PlayerScore): PlayerScore {
  const upperSum = calculateUpperSum(playerScore);
  const upperBonus = calculateUpperBonus(upperSum);
  const lowerSum = calculateLowerSum(playerScore);
  const totalScore = upperSum + upperBonus + lowerSum;

  return {
    ...playerScore,
    upperSum,
    upperBonus,
    lowerSum,
    totalScore
  };
}

export function createEmptyPlayerScore(playerId: string): PlayerScore {
  return {
    playerId,
    ones: null,
    twos: null,
    threes: null,
    fours: null,
    fives: null,
    sixes: null,
    threeOfAKind: null,
    fourOfAKind: null,
    fullHouse: null,
    smallStraight: null,
    largeStraight: null,
    yatsy: null,
    chance: null,
    upperSum: 0,
    upperBonus: 0,
    lowerSum: 0,
    totalScore: 0
  };
}

export function isGameFinished(playerScores: PlayerScore[]): boolean {
  return playerScores.every(playerScore => {
    const scores = [
      playerScore.ones,
      playerScore.twos,
      playerScore.threes,
      playerScore.fours,
      playerScore.fives,
      playerScore.sixes,
      playerScore.threeOfAKind,
      playerScore.fourOfAKind,
      playerScore.fullHouse,
      playerScore.smallStraight,
      playerScore.largeStraight,
      playerScore.yatsy,
      playerScore.chance
    ];

    return scores.every(score => score !== null);
  });
}

export const SCORE_CATEGORIES = {
  ones: 'Ettorna',
  twos: 'Tvåorna',
  threes: 'Treorna',
  fours: 'Fyrorna',
  fives: 'Femmorna',
  sixes: 'Sexorna',
  threeOfAKind: 'Triss',
  fourOfAKind: 'Fyrtal',
  fullHouse: 'Kåk',
  smallStraight: 'Liten stege',
  largeStraight: 'Stor stege',
  yatsy: 'Yatsy',
  chance: 'Chans'
} as const;