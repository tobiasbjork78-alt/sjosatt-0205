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
  currentPlayerIndex?: number;
}


export default function ScoreTable({
  players,
  playerScores,
  onScoreUpdate,
  gameFinished,
  isInternationalYatsy = false,
  currentPlayerIndex = 0
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
    'pair', 'twoPairs', 'threeOfAKind', 'fourOfAKind', 'fullHouse',
    'smallStraight', 'largeStraight', 'yatsy', 'chance'
  ];

  const currentPlayer = players[currentPlayerIndex];
  const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
  const nextPlayer = players[nextPlayerIndex];

  return (
    <>
      {/* Current turn indicator */}
      {!gameFinished && (
        <div className="yatsy-card mb-4">
          <div className="text-center p-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-bold text-gray-800">
                Nu är det {currentPlayer?.name}s tur!
              </h3>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-sm text-gray-600">
              Nästa spelare: {nextPlayer?.name}
            </p>
          </div>
        </div>
      )}

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
                {players.map((player, index) => {
                  const isCurrentPlayer = index === currentPlayerIndex && !gameFinished;
                  return (
                    <th key={player.id} className={`text-center p-4 border-b-2 font-bold text-lg min-w-24 relative ${
                      isCurrentPlayer
                        ? 'bg-gradient-to-b from-green-600 to-green-700 border-green-400'
                        : 'border-gray-600'
                    }`}>
                      {isCurrentPlayer && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-green-400"></div>
                        </div>
                      )}
                      <span className={`block text-xs mb-1 ${isCurrentPlayer ? 'text-green-200' : 'text-gray-300'}`}>
                        {isCurrentPlayer ? '👈 AKTIV' : `Spelare ${index + 1}`}
                      </span>
                      <div className="flex items-center justify-center gap-1">
                        {isCurrentPlayer && <span className="text-yellow-300">🎯</span>}
                        <span>{player.name}</span>
                        {isCurrentPlayer && <span className="text-yellow-300">🎯</span>}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {/* Övre sektionen */}
              <tr>
                <td colSpan={players.length + 1} className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 font-bold text-white text-center text-sm tracking-wide uppercase">
                  Övre sektionen (1-6)
                </td>
              </tr>

              {upperCategories.map((category, index) => (
                <tr key={category} className={index % 2 === 0 ? 'bg-blue-25 hover:bg-blue-50' : 'hover:bg-blue-50'}>
                  <td className="p-3 border-b border-blue-100 font-medium text-gray-800">
                    {SCORE_CATEGORIES[category]}
                  </td>
                  {players.map((player, playerIndex) => {
                    const playerScore = getPlayerScore(player.id);
                    const score = playerScore?.[category];
                    const isFilled = score !== null;
                    const isCurrentPlayer = playerIndex === currentPlayerIndex && !gameFinished;

                    return (
                      <td key={player.id} className={`p-2 border-b border-blue-100 ${
                        isCurrentPlayer ? 'bg-green-50' : ''
                      }`}>
                        <button
                          onClick={() => openModal(player.id, player.name, category)}
                          disabled={gameFinished}
                          className={`score-cell ${isFilled ? 'filled' : ''} ${gameFinished ? 'cursor-not-allowed opacity-75' : ''} ${
                            isCurrentPlayer && !isFilled ? 'ring-2 ring-green-400 ring-opacity-70 shadow-lg' : ''
                          }`}
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
                {players.map((player, playerIndex) => {
                  const playerScore = getPlayerScore(player.id);
                  const isCurrentPlayer = playerIndex === currentPlayerIndex && !gameFinished;
                  return (
                    <td key={player.id} className={`p-3 border-b border-gray-300 text-center font-bold text-lg text-blue-700 ${
                      isCurrentPlayer ? 'bg-green-50 ring-2 ring-green-300 ring-inset' : ''
                    }`}>
                      {playerScore?.upperSum || 0}
                    </td>
                  );
                })}
              </tr>

              <tr className="bg-gradient-to-r from-yellow-50 to-yellow-100">
                <td className="p-3 border-b-2 border-yellow-200 font-bold text-gray-700">
                  🏆 Bonus (63+ = 50p)
                </td>
                {players.map((player, playerIndex) => {
                  const playerScore = getPlayerScore(player.id);
                  const hasBonus = (playerScore?.upperBonus || 0) > 0;
                  const isCurrentPlayer = playerIndex === currentPlayerIndex && !gameFinished;
                  return (
                    <td key={player.id} className={`p-3 border-b-2 border-yellow-200 text-center font-bold text-lg ${hasBonus ? 'text-yellow-600' : 'text-gray-400'} ${
                      isCurrentPlayer ? 'bg-green-50 ring-2 ring-green-300 ring-inset' : ''
                    }`}>
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
                  {players.map((player, playerIndex) => {
                    const playerScore = getPlayerScore(player.id);
                    const score = playerScore?.[category];
                    const isFilled = score !== null;
                    const isCurrentPlayer = playerIndex === currentPlayerIndex && !gameFinished;

                    return (
                      <td key={player.id} className={`p-2 border-b border-green-100 ${
                        isCurrentPlayer ? 'bg-green-50' : ''
                      }`}>
                        <button
                          onClick={() => openModal(player.id, player.name, category)}
                          disabled={gameFinished}
                          className={`score-cell ${isFilled ? 'filled' : ''} ${gameFinished ? 'cursor-not-allowed opacity-75' : ''} ${
                            isCurrentPlayer && !isFilled ? 'ring-2 ring-green-400 ring-opacity-70 shadow-lg' : ''
                          }`}
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
                {players.map((player, playerIndex) => {
                  const playerScore = getPlayerScore(player.id);
                  const totalScore = playerScore?.totalScore || 0;
                  // Check if this player is in the lead
                  const allScores = players.map(p => getPlayerScore(p.id)?.totalScore || 0);
                  const maxScore = Math.max(...allScores);
                  const isLeading = totalScore === maxScore && totalScore > 0;
                  const isCurrentPlayer = playerIndex === currentPlayerIndex && !gameFinished;

                  return (
                    <td key={player.id} className={`p-4 text-center font-bold text-xl ${
                      isCurrentPlayer ? 'bg-green-100 ring-2 ring-green-400 ring-inset' : ''
                    }`}>
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