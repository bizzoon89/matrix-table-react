import { useMatrix } from '../../context/matrixContext';
import { calculatePercentile } from '../../utils/calculatePercentile';
import { Button } from '../Button';
import { TableRow } from '../TableRow';

type tableProps = {
  X: number;
};

export const Table = ({ X = 5 }: tableProps) => {
  const { matrix, addRow } = useMatrix();

  const columnPercentiles = matrix[0]
    ? matrix[0].map((_, c) => {
        const colValues = matrix.map(row => row[c].amount);
        return calculatePercentile(colValues, 60);
      })
    : [];

  return (
    <div className='p-6 bg-white rounded-2xl shadow-lg '>
      <div className='overflow-y-auto'>
        {matrix.length === 0 ? (
          <div className='text-center text-blue-600 py-10 italic'> No data yet. Please generate the matrix.</div>
        ) : (
          <table className='min-w-full divide-y divide-blue-200 text-center mb-5'>
            <thead className='bg-blue-100'>
              <tr>
                <th className='px-4 py-3 text-left text-sm font-medium text-blue-700 uppercase tracking-wider'> </th>
                {matrix[0]?.map((_, i) => (
                  <th
                    key={i}
                    className='px-4 py-3 text-sm font-medium text-blue-700 uppercase tracking-wider'
                  >
                    Cell N = {i + 1}
                  </th>
                ))}
                <th className='px-4 py-3 text-sm font-medium text-blue-700 uppercase tracking-wider'>Sum</th>
                <th className='px-4 py-3 text-sm font-medium text-blue-700 uppercase tracking-wider'></th>
              </tr>
            </thead>

            <tbody className='bg-white divide-y divide-gray-200'>
              {matrix.map((row, i) => (
                <TableRow
                  key={i}
                  row={row}
                  rowIndex={i}
                  x={X}
                />
              ))}

              <tr className='bg-blue-100 font-semibold'>
                <td className='px-4 py-3 text-left divide-blue-200'>60th percentile</td>
                {columnPercentiles.map((p, i) => (
                  <td
                    key={i}
                    className='px-4 py-3 text-blue-700'
                  >
                    {p.toFixed(1)}
                  </td>
                ))}
                <td className='px-4 py-3'></td>
                <td className='px-4 py-3'></td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      {matrix.length > 0 && (
        <Button
          typeButton='add'
          onClick={addRow}
        >
          + Add Row
        </Button>
      )}
    </div>
  );
};
