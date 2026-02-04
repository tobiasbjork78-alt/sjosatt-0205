'use client';

import React, { useState } from 'react';
import { Player, PlayerScore, ScoreCategory } from '@/types/yatsy';
import { SCORE_CATEGORIES } from '@/utils/yatsyLogic';

interface ScoreTableProps {
  players: Player[];
  playerScores: PlayerScore[];
  onScoreUpdate: (playerId: string, category: ScoreCategory, score: number) => void;
  gameFinished: boolean;
}

interface ScoreInputModalProps {
  isOpen: boolean;
  playerName: string;
  category: string;
  currentScore: number | null;
  onSave: (score: number) => void;
  onCancel: () => void;
}

function ScoreInputModal({
  isOpen,
  playerName,
  category,
  currentScore,
  onSave,
  onCancel
}: ScoreInputModalProps) {
  const [score, setScore] = useState(currentScore?.toString() || '');

  React.useEffect(() => {
    if (isOpen) {
      setScore(currentScore?.toString() || '');
    }
  }, [isOpen, currentScore]);

  if (!isOpen) return null;

  const handleSave = () => {
    const numScore = parseInt(score) || 0;
    if (numScore >= 0) {
      onSave(numScore);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {category}
        </h3>
        <p className="text-gray-600 mb-4">
          Spelare: {playerName}
        </p>

        <input
          type="number"
          min="0"
          max="50"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ange poäng"
          className="w-full px-3 py-3 text-xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yatsy-blue"
          autoFocus
        />

        <div className="flex gap-2 mt-4">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors"
          >
            Avbryt
          </button>
          <button
            onClick={handleSave}
            className="flex-1 yatsy-button"
          >
            Spara
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ScoreTable({
  players,
  playerScores,
  onScoreUpdate,
  gameFinished
}: ScoreTableProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    playerId: string;
    playerName: string;
    category: ScoreCategory | null;
  }>({
    isOpen: false,
    playerId: '',
    playerName: '',
    category: null
  });

  const openModal = (playerId: string, playerName: string, category: ScoreCategory) => {
    setModalState({
      isOpen: true,
      playerId,
      playerName,
      category
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      playerId: '',
      playerName: '',
      category: null
    });
  };

  const handleScoreSave = (score: number) => {
    if (modalState.category) {
      onScoreUpdate(modalState.playerId, modalState.category, score);
    }
    closeModal();
  };

  const getPlayerScore = (playerId: string): PlayerScore | undefined => {
    return playerScores.find(score => score.playerId === playerId);
  };

  const getCurrentScore = (): number | null => {
    if (!modalState.category || !modalState.playerId) return null;
    const playerScore = getPlayerScore(modalState.playerId);
    return playerScore ? playerScore[modalState.category] : null;
  };

  const upperCategories: ScoreCategory[] = [
    'ones', 'twos', 'threes', 'fours', 'fives', 'sixes'
  ];

  const lowerCategories: ScoreCategory[] = [
    'threeOfAKind', 'fourOfAKind', 'fullHouse',
    'smallStraight', 'largeStraight', 'yatsy', 'chance'
  ];

  return (
    <>
      <div className="yatsy-card overflow-x-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Poängtabell
        </h3>

        <div className="min-w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2 border-b-2 border-gray-300 font-semibold">
                  Kategori
                </th>
                {players.map(player => (
                  <th key={player.id} className="text-center p-2 border-b-2 border-gray-300 font-semibold min-w-20">
                    {player.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Övre sektionen */}
              <tr>
                <td colSpan={players.length + 1} className="p-2 bg-blue-50 font-semibold text-blue-800">
                  Övre sektionen (1-6)
                </td>
              </tr>

              {upperCategories.map(category => (
                <tr key={category}>
                  <td className="p-2 border-b border-gray-200 font-medium">
                    {SCORE_CATEGORIES[category]}
                  </td>
                  {players.map(player => {
                    const playerScore = getPlayerScore(player.id);
                    const score = playerScore?.[category];
                    const isFilled = score !== null;

                    return (
                      <td key={player.id} className="p-1 border-b border-gray-200">
                        <button
                          onClick={() => openModal(player.id, player.name, category)}
                          disabled={gameFinished}
                          className={`score-cell ${isFilled ? 'filled' : ''}`}
                        >
                          {score ?? ''}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Summa och bonus */}
              <tr className="bg-gray-100">
                <td className="p-2 border-b border-gray-300 font-semibold">
                  Summa
                </td>
                {players.map(player => {
                  const playerScore = getPlayerScore(player.id);
                  return (
                    <td key={player.id} className="p-2 border-b border-gray-300 text-center font-semibold">
                      {playerScore?.upperSum || 0}
                    </td>
                  );
                })}
              </tr>

              <tr className="bg-yellow-50">
                <td className="p-2 border-b border-gray-300 font-semibold">
                  Bonus (63+ = 50p)
                </td>
                {players.map(player => {
                  const playerScore = getPlayerScore(player.id);
                  return (
                    <td key={player.id} className="p-2 border-b border-gray-300 text-center font-semibold text-yatsy-yellow">
                      {playerScore?.upperBonus || 0}
                    </td>
                  );
                })}
              </tr>

              {/* Nedre sektionen */}
              <tr>
                <td colSpan={players.length + 1} className="p-2 bg-green-50 font-semibold text-green-800">
                  Nedre sektionen
                </td>
              </tr>

              {lowerCategories.map(category => (
                <tr key={category}>
                  <td className="p-2 border-b border-gray-200 font-medium">
                    {SCORE_CATEGORIES[category]}
                  </td>
                  {players.map(player => {
                    const playerScore = getPlayerScore(player.id);
                    const score = playerScore?.[category];
                    const isFilled = score !== null;

                    return (
                      <td key={player.id} className="p-1 border-b border-gray-200">
                        <button
                          onClick={() => openModal(player.id, player.name, category)}
                          disabled={gameFinished}
                          className={`score-cell ${isFilled ? 'filled' : ''}`}
                        >
                          {score ?? ''}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Total */}
              <tr className="bg-yatsy-blue text-white">
                <td className="p-3 border-t-2 border-gray-300 font-bold text-lg">
                  TOTALT
                </td>
                {players.map(player => {
                  const playerScore = getPlayerScore(player.id);
                  return (
                    <td key={player.id} className="p-3 border-t-2 border-gray-300 text-center font-bold text-lg">
                      {playerScore?.totalScore || 0}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {gameFinished && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg">
            <h4 className="font-bold text-green-800 text-lg mb-2">
              🎉 Spelet är slut!
            </h4>
            <div className="space-y-1">
              {players
                .map(player => ({
                  player,
                  score: getPlayerScore(player.id)?.totalScore || 0
                }))
                .sort((a, b) => b.score - a.score)
                .map((item, index) => (
                  <div key={item.player.id} className="flex justify-between">
                    <span className={index === 0 ? 'font-bold text-green-800' : ''}>
                      {index + 1}. {item.player.name}
                    </span>
                    <span className={index === 0 ? 'font-bold text-green-800' : ''}>
                      {item.score} poäng {index === 0 && '🏆'}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <ScoreInputModal
        isOpen={modalState.isOpen}
        playerName={modalState.playerName}
        category={modalState.category ? SCORE_CATEGORIES[modalState.category] : ''}
        currentScore={getCurrentScore()}
        onSave={handleScoreSave}
        onCancel={closeModal}
      />
    </>
  );
}