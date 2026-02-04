'use client';

import React, { useState } from 'react';
import { Player } from '@/types/yatsy';

interface PlayerSetupProps {
  players: Player[];
  onPlayersChange: (players: Player[]) => void;
  onStartGame: () => void;
  gameStarted: boolean;
  isInternationalYatsy: boolean;
  onYatsyVariantChange: (isInternational: boolean) => void;
}

export default function PlayerSetup({
  players,
  onPlayersChange,
  onStartGame,
  gameStarted,
  isInternationalYatsy,
  onYatsyVariantChange
}: PlayerSetupProps) {
  const [newPlayerName, setNewPlayerName] = useState('');

  const addPlayer = () => {
    if (newPlayerName.trim() && players.length < 8) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim()
      };
      onPlayersChange([...players, newPlayer]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (playerId: string) => {
    if (!gameStarted) {
      onPlayersChange(players.filter(player => player.id !== playerId));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addPlayer();
    }
  };

  return (
    <div className="yatsy-card">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          🎲 Yatsy Digital Protokoll
        </h2>
        <p className="text-gray-600 text-sm">
          Ingen mer papper som fladdrar runt bordet! 📱✨
        </p>
      </div>

      {!gameStarted && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <span className="mr-2">👥</span>
            Lägg till spelare
          </h3>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Spelarens namn"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yatsy-blue"
              maxLength={20}
            />
            <button
              onClick={addPlayer}
              disabled={!newPlayerName.trim() || players.length >= 8}
              className="yatsy-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Lägg till
            </button>
          </div>
        </div>
      )}

      {players.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <span className="mr-2">📝</span>
            Spelare ({players.length})
          </h3>

          <div className="space-y-2">
            {players.map((player, index) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 shadow-sm"
              >
                <span className="font-semibold text-gray-800 flex items-center">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </span>
                  {player.name}
                </span>

                {!gameStarted && (
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="text-yatsy-red hover:text-red-700 font-semibold px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    ❌ Ta bort
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!gameStarted && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <span className="mr-2">⚙️</span>
            Välj spelvariant
          </h3>

          <div className="space-y-3">
            <label className={`flex items-start space-x-4 cursor-pointer p-4 border-2 rounded-xl transition-all duration-200 ${!isInternationalYatsy
              ? 'border-blue-500 bg-blue-50 shadow-md'
              : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }`}>
              <input
                type="radio"
                name="yatsyVariant"
                checked={!isInternationalYatsy}
                onChange={() => onYatsyVariantChange(false)}
                className="mt-1 w-5 h-5 text-blue-500"
              />
              <div>
                <div className="font-bold text-gray-800 flex items-center">
                  🏅 Standard Yatsy
                  {!isInternationalYatsy && <span className="ml-2 text-blue-600">✓</span>}
                </div>
                <div className="text-sm text-gray-600 mt-1">Yatsy = 50 poäng (fast poäng)</div>
              </div>
            </label>

            <label className={`flex items-start space-x-4 cursor-pointer p-4 border-2 rounded-xl transition-all duration-200 ${isInternationalYatsy
              ? 'border-purple-500 bg-purple-50 shadow-md'
              : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }`}>
              <input
                type="radio"
                name="yatsyVariant"
                checked={isInternationalYatsy}
                onChange={() => onYatsyVariantChange(true)}
                className="mt-1 w-5 h-5 text-purple-500"
              />
              <div>
                <div className="font-bold text-gray-800 flex items-center">
                  🌍 Internationell Yatsy
                  {isInternationalYatsy && <span className="ml-2 text-purple-600">✓</span>}
                </div>
                <div className="text-sm text-gray-600 mt-1">Yatsy = 50 + summan av alla tärningar</div>
              </div>
            </label>
          </div>
        </div>
      )}

      {!gameStarted && players.length >= 2 && (
        <div className="text-center">
          <button
            onClick={onStartGame}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-xl py-4 px-12 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            🚀 Starta Spel 🎲
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Allt redo! Tryck för att börja spela.
          </p>
        </div>
      )}

      {!gameStarted && players.length > 0 && players.length < 2 && (
        <p className="text-center text-gray-600 italic">
          Lägg till minst 2 spelare för att starta
        </p>
      )}

      {!gameStarted && players.length === 0 && (
        <p className="text-center text-gray-600 italic">
          Lägg till spelare för att komma igång!
        </p>
      )}
    </div>
  );
}