'use client';

import React from 'react';
import { GameState } from '@/types/yatsy';

interface GameHistoryProps {
  games: GameState[];
  onLoadGame?: (gameId: string) => void;
  onDeleteGame?: (gameId: string) => void;
}

export default function GameHistory({
  games,
  onLoadGame,
  onDeleteGame
}: GameHistoryProps) {
  if (games.length === 0) {
    return (
      <div className="yatsy-card text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          📜 Spelhistorik
        </h3>
        <p className="text-gray-600 italic">
          Inga avslutade spel ännu. Spela ett spel för att se historik här!
        </p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('sv-SE') + ' ' + d.toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWinner = (game: GameState) => {
    if (!game.gameFinished || game.scores.length === 0) return null;

    const winner = game.scores.reduce((prev, current) =>
      current.totalScore > prev.totalScore ? current : prev
    );

    const player = game.players.find(p => p.id === winner.playerId);
    return { player, score: winner.totalScore };
  };

  const finishedGames = games
    .filter(game => game.gameFinished)
    .sort((a, b) => new Date(b.finishedAt || b.createdAt).getTime() - new Date(a.finishedAt || a.createdAt).getTime());

  return (
    <div className="yatsy-card">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        📜 Spelhistorik ({finishedGames.length})
      </h3>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {finishedGames.map(game => {
          const winner = getWinner(game);
          const gameDate = formatDate(new Date(game.finishedAt || game.createdAt));

          return (
            <div
              key={game.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-gray-800">
                    🏆 {winner?.player?.name || 'Okänd'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {winner?.score} poäng
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {gameDate}
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-3">
                Spelare: {game.players.map(p => p.name).join(', ')}
              </div>

              <div className="text-xs text-gray-500 mb-3">
                Alla poäng: {game.scores
                  .sort((a, b) => b.totalScore - a.totalScore)
                  .map(score => {
                    const player = game.players.find(p => p.id === score.playerId);
                    return `${player?.name}: ${score.totalScore}`;
                  })
                  .join(' • ')
                }
              </div>

              {(onLoadGame || onDeleteGame) && (
                <div className="flex gap-2">
                  {onLoadGame && (
                    <button
                      onClick={() => onLoadGame(game.id)}
                      className="text-sm yatsy-button py-1 px-3"
                    >
                      Visa
                    </button>
                  )}
                  {onDeleteGame && (
                    <button
                      onClick={() => onDeleteGame(game.id)}
                      className="text-sm yatsy-button-danger py-1 px-3"
                    >
                      Ta bort
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}