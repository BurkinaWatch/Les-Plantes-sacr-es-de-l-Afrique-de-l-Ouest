import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import type { TotemAnimalId } from '@/data/quiz';
import { getQuoteDuJour } from '@/data/quotes';
import type { Quote } from '@/data/quotes';

interface QuizResult {
  primary: TotemAnimalId;
  secondary: TotemAnimalId;
  completedAt: string;
}

interface AppContextType {
  favorites: string[];
  toggleFavorite: (animalId: string) => void;
  isFavorite: (animalId: string) => boolean;
  quizResult: QuizResult | null;
  setQuizResult: (result: QuizResult) => void;
  clearQuizResult: () => void;
  dailyQuote: Quote;
  refreshQuote: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const FAVORITES_KEY = '@animaux_sacres_favorites';
const QUIZ_RESULT_KEY = '@animaux_sacres_quiz_result';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [quizResult, setQuizResultState] = useState<QuizResult | null>(null);
  const [dailyQuote, setDailyQuote] = useState<Quote>(getQuoteDuJour());

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [storedFavs, storedQuiz] = await Promise.all([
        AsyncStorage.getItem(FAVORITES_KEY),
        AsyncStorage.getItem(QUIZ_RESULT_KEY),
      ]);
      if (storedFavs) setFavorites(JSON.parse(storedFavs));
      if (storedQuiz) setQuizResultState(JSON.parse(storedQuiz));
    } catch (_) {}
  }

  const toggleFavorite = useCallback(async (animalId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(animalId) ? prev.filter((id) => id !== animalId) : [...prev, animalId];
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const isFavorite = useCallback((animalId: string) => favorites.includes(animalId), [favorites]);

  const setQuizResult = useCallback(async (result: QuizResult) => {
    setQuizResultState(result);
    try {
      await AsyncStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(result));
    } catch (_) {}
  }, []);

  const clearQuizResult = useCallback(async () => {
    setQuizResultState(null);
    try {
      await AsyncStorage.removeItem(QUIZ_RESULT_KEY);
    } catch (_) {}
  }, []);

  const refreshQuote = useCallback(() => {
    setDailyQuote(getQuoteDuJour());
  }, []);

  return (
    <AppContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, quizResult, setQuizResult, clearQuizResult, dailyQuote, refreshQuote }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
