'use client';

import React, { useState } from 'react';
import { Player } from '@/types/yatsy';

interface PlayerSetupProps {
  players: Player[];
  onPlayersChange: (players: Player[]) => void;
  onStartGame: () => void;
  gameStarted: boolean;
}

export default function PlayerSetup({
  players,
  onPlayersChange,
  onStartGame,
  gameStarted
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        🎲 Yatsy Digital Protokoll
      </h2>

      {!gameStarted && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
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
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Spelare ({players.length})
          </h3>

          <div className="space-y-2">
            {players.map((player, index) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium text-gray-800">
                  {index + 1}. {player.name}
                </span>

                {!gameStarted && (
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="text-yatsy-red hover:text-red-700 font-semibold"
                  >
                    Ta bort
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!gameStarted && players.length >= 2 && (
        <div className="text-center">
          <button
            onClick={onStartGame}
            className="yatsy-button text-lg py-3 px-8"
          >
            Starta Spel 🎲
          </button>
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