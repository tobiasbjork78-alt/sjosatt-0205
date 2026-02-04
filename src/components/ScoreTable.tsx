'use client';

import React, { useState } from 'react';
import { Player, PlayerScore, ScoreCategory } from '@/types/yatsy';
import { SCORE_CATEGORIES } from '@/utils/yatsyLogic';
import QuickPickerModal from './QuickPickerModal';

interface ScoreTableProps {
  players: Player[];
  playerScores: PlayerScore[];
  onScoreUpdate: (playerId: string, category: ScoreCategory, score: number) => void;
  gameFinished: boolean;
  isInternationalYatsy?: boolean;
}


export default function ScoreTable({
  players,
  playerScores,
  onScoreUpdate,
  gameFinished,
  isInternationalYatsy = false
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
    'ones', 'twos', 'threes', 'fours', 'fives', 'sixes', 'pair', 'twoPairs'
  ];

  const lowerCategories: ScoreCategory[] = [
    'threeOfAKind', 'fourOfAKind', 'fullHouse',
    'smallStraight', 'largeStraight', 'yatsy', 'chance'
  ];

  return (
    <>
      <div className="yatsy-card overflow-x-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
          Poängtabell
        </h3>
        <p className="text-sm text-gray-600 text-center mb-4">
          {isInternationalYatsy ? 'Internationell variant (Yatsy = 50 + summa)' : 'Standard variant (Yatsy = 50)'}
        </p>

        <div className="min-w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                <th className="text-left p-4 border-b-2 border-gray-600 font-bold text-lg">
                  📋 Kategori
                </th>
                {players.map((player, index) => (
                  <th key={player.id} className="text-center p-4 border-b-2 border-gray-600 font-bold text-lg min-w-24">
                    <span className="block text-xs text-gray-300 mb-1">Spelare {index + 1}</span>
                    {player.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Övre sektionen */}
              <tr>
                <td colSpan={players.length + 1} className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 font-bold text-white text-center text-sm tracking-wide uppercase">
                  Övre sektionen (1-6 + Par)
                </td>
              </tr>

              {upperCategories.map((category, index) => (
                <tr key={category} className={index % 2 === 0 ? 'bg-blue-25 hover:bg-blue-50' : 'hover:bg-blue-50'}>
                  <td className="p-3 border-b border-blue-100 font-medium text-gray-800">
                    {SCORE_CATEGORIES[category]}
                  </td>
                  {players.map(player => {
                    const playerScore = getPlayerScore(player.id);
                    const score = playerScore?.[category];
                    const isFilled = score !== null;

                    return (
                      <td key={player.id} className="p-2 border-b border-blue-100">
                        <button
                          onClick={() => openModal(player.id, player.name, category)}
                          disabled={gameFinished}
                          className={`score-cell ${isFilled ? 'filled' : ''} ${gameFinished ? 'cursor-not-allowed opacity-75' : ''}`}
                        >
                          {score ?? ''}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Summa och bonus */}
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-blue-200">
                <td className="p-3 border-b border-gray-300 font-bold text-gray-700">
                  📊 Summa Övre
                </td>
                {players.map(player => {
                  const playerScore = getPlayerScore(player.id);
                  return (
                    <td key={player.id} className="p-3 border-b border-gray-300 text-center font-bold text-lg text-blue-700">
                      {playerScore?.upperSum || 0}
                    </td>
                  );
                })}
              </tr>

              <tr className="bg-gradient-to-r from-yellow-50 to-yellow-100">
                <td className="p-3 border-b-2 border-yellow-200 font-bold text-gray-700">
                  🏆 Bonus (63+ = 50p)
                </td>
                {players.map(player => {
                  const playerScore = getPlayerScore(player.id);
                  const hasBonus = (playerScore?.upperBonus || 0) > 0;
                  return (
                    <td key={player.id} className={`p-3 border-b-2 border-yellow-200 text-center font-bold text-lg ${hasBonus ? 'text-yellow-600' : 'text-gray-400'}`}>
                      {playerScore?.upperBonus || 0}
                      {hasBonus && ' 🎉'}
                    </td>
                  );
                })}
              </tr>

              {/* Nedre sektionen */}
              <tr>
                <td colSpan={players.length + 1} className="p-3 bg-gradient-to-r from-green-500 to-green-600 font-bold text-white text-center text-sm tracking-wide uppercase">
                  Nedre sektionen
                </td>
              </tr>

              {lowerCategories.map((category, index) => (
                <tr key={category} className={index % 2 === 0 ? 'bg-green-25 hover:bg-green-50' : 'hover:bg-green-50'}>
                  <td className="p-3 border-b border-green-100 font-medium text-gray-800">
                    {SCORE_CATEGORIES[category]}
                  </td>
                  {players.map(player => {
                    const playerScore = getPlayerScore(player.id);
                    const score = playerScore?.[category];
                    const isFilled = score !== null;

                    return (
                      <td key={player.id} className="p-2 border-b border-green-100">
                        <button
                          onClick={() => openModal(player.id, player.name, category)}
                          disabled={gameFinished}
                          className={`score-cell ${isFilled ? 'filled' : ''} ${gameFinished ? 'cursor-not-allowed opacity-75' : ''}`}
                        >
                          {score ?? ''}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Total */}
              <tr className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-t-4 border-purple-300">
                <td className="p-4 font-bold text-xl tracking-wide">
                  🎯 TOTALT
                </td>
                {players.map((player, index) => {
                  const playerScore = getPlayerScore(player.id);
                  const totalScore = playerScore?.totalScore || 0;
                  // Check if this player is in the lead
                  const allScores = players.map(p => getPlayerScore(p.id)?.totalScore || 0);
                  const maxScore = Math.max(...allScores);
                  const isLeading = totalScore === maxScore && totalScore > 0;

                  return (
                    <td key={player.id} className="p-4 text-center font-bold text-xl">
                      {totalScore}
                      {isLeading && gameFinished && ' 👑'}
                      {isLeading && !gameFinished && totalScore > 0 && ' 🔥'}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {gameFinished && (
          <div className="mt-6 p-6 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-xl shadow-lg border-2 border-yellow-600">
            <h4 className="font-bold text-white text-2xl mb-4 text-center">
              🎉 Spelet är slut! 🎊
            </h4>
            <div className="bg-white rounded-lg p-4 space-y-3">
              <h5 className="font-semibold text-gray-800 text-lg text-center mb-3">🏆 Slutresultat</h5>
              {players
                .map(player => ({
                  player,
                  score: getPlayerScore(player.id)?.totalScore || 0
                }))
                .sort((a, b) => b.score - a.score)
                .map((item, index) => (
                  <div key={item.player.id} className={`flex justify-between items-center p-3 rounded-lg ${
                    index === 0
                      ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-400'
                      : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <span className={`font-bold text-lg ${
                      index === 0 ? 'text-yellow-800' : 'text-gray-700'
                    }`}>
                      {index === 0 ? '👑' : `${index + 1}.`} {item.player.name}
                    </span>
                    <span className={`font-bold text-lg ${
                      index === 0 ? 'text-yellow-800' : 'text-gray-700'
                    }`}>
                      {item.score} poäng
                      {index === 0 && ' 🏆'}
                      {index === 1 && ' 🥈'}
                      {index === 2 && ' 🥉'}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <QuickPickerModal
        isOpen={modalState.isOpen}
        playerName={modalState.playerName}
        category={modalState.category}
        currentScore={getCurrentScore()}
        onSave={handleScoreSave}
        onCancel={closeModal}
        isInternationalYatsy={isInternationalYatsy}
      />
    </>
  );
}