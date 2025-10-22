import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Cell } from '../types';
import { findNearestCells } from '../utils/findNearestCells';

export type Matrix = Cell[][];

type MatrixContextType = {
  matrix: Matrix;
  setMatrix: (m: Matrix) => void;
  highlighted: Set<number>;
  setHighlighted: (ids: Set<number>) => void;
  hoveredRow: number | null;
  setHoveredRow: (rowIndex: number | null) => void;
  addRow: () => void;
  removeRow: (rowIndex: number) => void;
  increaseCell: (rowIndex: number, cellIndex: number) => void;
  handleHoverCell: (cell: Cell | null, x: number) => void;
};

const MatrixContext = createContext<MatrixContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useMatrix = () => {
  const ctx = useContext(MatrixContext);
  if (!ctx) throw new Error('MatrixContext not found');
  return ctx;
};

export const MatrixProvider = ({ children }: { children: ReactNode }) => {
  const [matrix, setMatrix] = useState<Matrix>(() =>
    Array.from({ length: 0 }, (_, r) =>
      Array.from({ length: 0 }, (_, c) => ({
        id: r * 5 + c + 1,
        amount: Math.floor(Math.random() * 900) + 100,
      }))
    )
  );

  const [highlighted, setHighlighted] = useState<Set<number>>(new Set());
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const addRow = () => {
    const N = matrix[0]?.length || 0;
    const maxId = matrix.flat().reduce((max, c) => Math.max(max, c.id), 0);
    const newRow = Array.from({ length: N }, (_, i) => ({
      id: maxId + i + 1,
      amount: Math.floor(Math.random() * 900) + 100,
    }));
    setMatrix([...matrix, newRow]);
  };

  const removeRow = (rowIndex: number) => {
    setMatrix(matrix.filter((_, i) => i !== rowIndex));
  };

  const increaseCell = (rowIndex: number, cellIndex: number) => {
    setMatrix(prev =>
      prev.map((row, r) =>
        r === rowIndex ? row.map((cell, c) => (c === cellIndex ? { ...cell, amount: cell.amount + 1 } : cell)) : row
      )
    );
  };

  const handleHoverCell = (cell: Cell | null, x: number) => {
    if (!cell) return setHighlighted(new Set());
    const nearest = findNearestCells(matrix.flat(), cell, x);
    setHighlighted(nearest);
  };

  return (
    <MatrixContext.Provider
      value={{
        matrix,
        setMatrix,
        highlighted,
        setHighlighted,
        hoveredRow,
        setHoveredRow,
        addRow,
        removeRow,
        increaseCell,
        handleHoverCell,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};
