'use client';

import React from 'react';
import { ScoreCategory } from '@/types/yatsy';
import { SCORE_CATEGORIES } from '@/utils/yatsyLogic';

interface QuickPickerModalProps {
  isOpen: boolean;
  playerName: string;
  category: ScoreCategory | null;
  currentScore: number | null;
  onSave: (score: number) => void;
  onCancel: () => void;
  isInternationalYatsy?: boolean;
}

// Definiera giltiga värden för varje kategori
const VALID_VALUES: Record<ScoreCategory, number[]> = {
  // Övre sektionen
  ones: [0, 1, 2, 3, 4, 5],
  twos: [0, 2, 4, 6, 8, 10],
  threes: [0, 3, 6, 9, 12, 15],
  fours: [0, 4, 8, 12, 16, 20],
  fives: [0, 5, 10, 15, 20, 25],
  sixes: [0, 6, 12, 18, 24, 30],

  // Par-kategorier i övre sektionen
  pair: [0, 2, 4, 6, 8, 10, 12],
  twoPairs: [0, 6, 8, 10, 12, 14, 16, 18, 20, 22],

  // Nedre sektionen
  threeOfAKind: [0, 3, 6, 9, 12, 15, 18],
  fourOfAKind: [0, 4, 8, 12, 16, 20, 24],
  fullHouse: [0, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  smallStraight: [0, 15],
  largeStraight: [0, 20],
  yatsy: [0, 50],
  chance: [] // Chans använder textfält
};

export default function QuickPickerModal({
  isOpen,
  playerName,
  category,
  currentScore,
  onSave,
  onCancel,
  isInternationalYatsy = false
}: QuickPickerModalProps) {
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    if (isOpen && category === 'chance') {
      setInputValue(currentScore?.toString() || '');
    }
  }, [isOpen, currentScore, category]);

  if (!isOpen || !category) return null;

  // För Chans-kategorin, använd textfält med validering
  if (category === 'chance') {
    const handleSave = () => {
      const score = parseInt(inputValue) || 0;
      if (score >= 5 && score <= 30) {
        onSave(score);
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-300">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {SCORE_CATEGORIES[category]}
            </h3>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                👤
              </span>
              <span className="font-semibold">{playerName}</span>
            </div>
          </div>

          <div className="relative">
            <input
              type="number"
              min="5"
              max="30"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="5-30"
              className="w-full px-4 py-4 text-2xl text-center border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
              autoFocus
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-semibold">
              poäng
            </div>
          </div>

          <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 text-center font-medium">
              💡 Chans: Ange summan av alla tärningar (5-30 poäng)
            </p>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:shadow-md"
            >
              ❌ Avbryt
            </button>
            <button
              onClick={handleSave}
              disabled={!inputValue || parseInt(inputValue) < 5 || parseInt(inputValue) > 30}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              ✅ Spara
            </button>
          </div>
        </div>
      </div>
    );
  }

  // För alla andra kategorier, använd quick-picker
  const validValues = VALID_VALUES[category];

  // Särskild hantering för Yatsy i internationell variant (50 + summa av tärningar 5-30)
  const yatsyValues = category === 'yatsy' && isInternationalYatsy
    ? [0, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]
    : validValues;

  const finalValues = category === 'yatsy' && isInternationalYatsy ? yatsyValues : validValues;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-300">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {SCORE_CATEGORIES[category]}
          </h3>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              👤
            </span>
            <span className="font-semibold">{playerName}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 text-center">
            Välj poäng för denna kategori:
          </p>
        </div>

        {/* Quick-picker grid */}
        <div className="grid grid-cols-3 gap-3 mb-6 max-h-64 overflow-y-auto">
          {finalValues.map((value) => (
            <button
              key={value}
              onClick={() => onSave(value)}
              className={`h-12 rounded-xl font-bold text-lg transition-all duration-200 border-2 hover:scale-105 hover:shadow-md ${
                currentScore === value
                  ? 'bg-blue-500 text-white border-blue-600 shadow-lg'
                  : 'bg-gray-50 hover:bg-blue-100 text-gray-700 border-gray-200 hover:border-blue-300'
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        {category === 'yatsy' && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700 text-center font-medium">
              💡 {isInternationalYatsy
                ? "Internationell variant: 50 + tärningarnas summa (5-30)"
                : "Standard variant: 50 för Yatsy, 0 för missat"
              }
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:shadow-md"
          >
            ❌ Avbryt
          </button>
        </div>
      </div>
    </div>
  );
}