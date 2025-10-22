import type { Cell } from '../types';

export const findNearestCells = (allCells: Cell[], target: Cell, x: number): Set<number> => {
  const sorted = [...allCells]
    .map(c => ({ ...c, diff: Math.abs(c.amount - target.amount) }))
    .sort((a, b) => a.diff - b.diff)
    .slice(1, x + 1);
  return new Set(sorted.map(c => c.id));
};
