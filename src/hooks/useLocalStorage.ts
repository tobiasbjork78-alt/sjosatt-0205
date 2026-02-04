'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // State för att hålla vårt värde
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Hämta från localStorage på component mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  // Returnera en wrappad version av useState's setter funktion som behåller värdet i localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Tillåt värde att vara en funktion så vi har samma API som useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Spara i state
      setStoredValue(valueToStore);

      // Spara i localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}