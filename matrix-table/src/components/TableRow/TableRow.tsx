import { useMatrix } from '../../context/matrixContext';
import type { Cell } from '../../types';
import { Button } from '../Button';

type tableRowProps = {
  row: Cell[];
  rowIndex: number;
  x: number;
};

export const TableRow = ({ row, rowIndex, x }: tableRowProps) => {
  const { hoveredRow, setHoveredRow, highlighted, increaseCell, handleHoverCell, removeRow } = useMatrix();

  const sum = row.reduce((acc, c) => acc + c.amount, 0);
  const maxValue = Math.max(...row.map(c => c.amount));
  const isHovered = hoveredRow === rowIndex;

  return (
    <tr>
      <td className='border p-2 font-medium text-gray-700 text-left'>Cell Value M = {rowIndex + 1}</td>

      {row.map((cell, colIndex) => {
        const displayValue = isHovered ? ((cell.amount / sum) * 100).toFixed(0) + '%' : cell.amount;
        const isHighlighted = highlighted.has(cell.id);

        return (
          <td
            key={cell.id}
            onClick={() => increaseCell(rowIndex, colIndex)}
            onMouseEnter={() => handleHoverCell(cell, x)}
            onMouseLeave={() => handleHoverCell(null, x)}
            className={`border p-2 cursor-pointer transition ${isHighlighted ? 'bg-yellow-200' : ''}`}
            style={isHovered ? { backgroundColor: `rgba(255,205,0,${cell.amount / maxValue})` } : {}}
          >
            {displayValue}
          </td>
        );
      })}

      <td
        className='border p-2 font-semibold bg-gray-50 cursor-pointer'
        onMouseEnter={() => setHoveredRow(rowIndex)}
        onMouseLeave={() => setHoveredRow(null)}
      >
        {sum}
      </td>

      <td className='border p-2'>
        <Button
          typeButton='delete'
          onClick={() => removeRow(rowIndex)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};
