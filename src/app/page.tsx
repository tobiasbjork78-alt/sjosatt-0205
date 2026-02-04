'use client';

import React, { useState, useEffect } from 'react';
import { Player, GameState, PlayerScore, ScoreCategory } from '@/types/yatsy';
import {
  createEmptyPlayerScore,
  updatePlayerScore,
  isGameFinished
} from '@/utils/yatsyLogic';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import PlayerSetup from '@/components/PlayerSetup';
import ScoreTable from '@/components/ScoreTable';
import GameHistory from '@/components/GameHistory';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ClientWrapper } from '@/components/ClientWrapper';
import { ThemeProvider } from '@/providers/ThemeProvider';

export default function Home() {
  const [games, setGames] = useLocalStorage<GameState[]>('yatsy-games', []);
  const [currentGame, setCurrentGame] = useState<GameState | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [isInternationalYatsy, setIsInternationalYatsy] = useState(false);

  // Skapa nytt spel
  const createNewGame = (players: Player[]) => {
    const newGame: GameState = {
      id: Date.now().toString(),
      players,
      scores: players.map(player => createEmptyPlayerScore(player.id)),
      currentPlayerIndex: 0,
      gameStarted: true,
      gameFinished: false,
      createdAt: new Date()
    };

    setCurrentGame(newGame);
    setShowHistory(false);
  };

  // Uppdatera poäng
  const updateScore = (playerId: string, category: ScoreCategory, score: number) => {
    if (!currentGame || currentGame.gameFinished) return;

    const updatedScores = currentGame.scores.map(playerScore => {
      if (playerScore.playerId === playerId) {
        const newScore = { ...playerScore, [category]: score };
        return updatePlayerScore(newScore);
      }
      return playerScore;
    });

    const gameFinished = isGameFinished(updatedScores);

    const updatedGame: GameState = {
      ...currentGame,
      scores: updatedScores,
      gameFinished,
      finishedAt: gameFinished ? new Date() : currentGame.finishedAt
    };

    setCurrentGame(updatedGame);

    // Spara till localStorage
    const updatedGames = games.map(game =>
      game.id === updatedGame.id ? updatedGame : game
    );

    // Om det är ett nytt spel, lägg till det
    if (!games.find(game => game.id === updatedGame.id)) {
      updatedGames.push(updatedGame);
    }

    setGames(updatedGames);
  };

  // Uppdatera spelarlista innan spel startar
  const updatePlayers = (players: Player[]) => {
    if (currentGame && !currentGame.gameStarted) {
      setCurrentGame({
        ...currentGame,
        players,
        scores: players.map(player => createEmptyPlayerScore(player.id))
      });
    } else if (!currentGame) {
      // Skapa ett temporärt spel för spelarlistan
      const tempGame: GameState = {
        id: 'temp',
        players,
        scores: [],
        currentPlayerIndex: 0,
        gameStarted: false,
        gameFinished: false,
        createdAt: new Date(),
        isInternationalYatsy
      };
      setCurrentGame(tempGame);
    }
  };

  // Starta spel
  const startGame = () => {
    if (currentGame && currentGame.players.length >= 2) {
      const startedGame: GameState = {
        ...currentGame,
        id: Date.now().toString(),
        scores: currentGame.players.map(player => createEmptyPlayerScore(player.id)),
        gameStarted: true,
        createdAt: new Date(),
        isInternationalYatsy
      };

      setCurrentGame(startedGame);
    }
  };

  // Nytt spel
  const resetGame = () => {
    setCurrentGame(null);
    setShowHistory(false);
    setIsInternationalYatsy(false);
  };

  // Ta bort spel från historik
  const deleteGame = (gameId: string) => {
    const updatedGames = games.filter(game => game.id !== gameId);
    setGames(updatedGames);
  };

  // Ladda spel från historik
  const loadGame = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (game) {
      setCurrentGame(game);
      setShowHistory(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen py-4 px-2">
        <ClientWrapper>
          <ThemeToggle />
        </ClientWrapper>
        <div className="max-w-6xl mx-auto">

        {/* Header med navigation */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {!showHistory && (
            <>
              <button
                onClick={() => setShowHistory(true)}
                className="yatsy-button"
              >
                📜 Historik
              </button>
              {currentGame && (
                <button
                  onClick={resetGame}
                  className="yatsy-button-danger"
                >
                  🆕 Nytt Spel
                </button>
              )}
            </>
          )}

          {showHistory && (
            <button
              onClick={() => setShowHistory(false)}
              className="yatsy-button"
            >
              🎲 Tillbaka till Spel
            </button>
          )}
        </div>

        {/* Huvudinnehåll */}
        {showHistory ? (
          <GameHistory
            games={games}
            onLoadGame={loadGame}
            onDeleteGame={deleteGame}
          />
        ) : (
          <div className="space-y-6">
            {/* Spelarlista eller startsida */}
            {(!currentGame || !currentGame.gameStarted) && (
              <PlayerSetup
                players={currentGame?.players || []}
                onPlayersChange={updatePlayers}
                onStartGame={startGame}
                gameStarted={false}
                isInternationalYatsy={isInternationalYatsy}
                onYatsyVariantChange={setIsInternationalYatsy}
              />
            )}

            {/* Poängtabell */}
            {currentGame && currentGame.gameStarted && (
              <ScoreTable
                players={currentGame.players}
                playerScores={currentGame.scores}
                onScoreUpdate={updateScore}
                gameFinished={currentGame.gameFinished}
                isInternationalYatsy={currentGame.isInternationalYatsy}
              />
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>🎲 Yatsy Digital Protokoll</p>
          <p>Inga fler papper som fladdrar runt bordet!</p>
        </div>
        </div>
      </div>
    </ThemeProvider>
  );
}