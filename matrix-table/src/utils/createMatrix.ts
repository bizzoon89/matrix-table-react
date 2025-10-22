import type { Cell } from '../types';

export const createMatrix = (M: number, N: number): Cell[][] => {
  let id = 1;
  return Array.from({ length: M }, () =>
    Array.from({ length: N }, () => ({
      id: id++,
      amount: Math.floor(Math.random() * 900) + 100,
    }))
  );
};

export const limitX = (M: number, N: number, X: number): number => {
  const maxX = Math.max(M * N - 1, 0);
  return Math.min(X, maxX);
};
