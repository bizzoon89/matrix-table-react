import { useState } from 'react';
import { MatrixProvider, useMatrix } from './context/matrixContext';
import { createMatrix, limitX } from './utils/createMatrix';
import { Table } from './components/Table';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { clampValue } from './utils/inputUtils';

function AppContent() {
  const { setMatrix } = useMatrix();

  const [M, setM] = useState<number>(0);
  const [N, setN] = useState<number>(0);
  const [X, setX] = useState<number>(0);

  const handleGenerate = () => {
    const finalX = limitX(M, N, X);
    setX(finalX);
    setMatrix(createMatrix(M, N));
  };

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4 text-center'>Table</h1>
      <div className='flex gap-2 justify-center mb-4 items-end'>
        <Input
          id='lbl1'
          type='number'
          min={0}
          max={100}
          value={M}
          onChange={e => {
            const value = clampValue(Number(e.target.value), 0, 100);
            setM(value);
          }}
          placeholder='Rows (M)'
          name='M'
          label='Rows (M)'
        />
        <Input
          id='lbl2'
          type='number'
          min={0}
          max={100}
          value={N}
          onChange={e => {
            const value = clampValue(Number(e.target.value), 0, 100);
            setN(value);
          }}
          placeholder='Cols (N)'
          name='N'
          label='Cols (N)'
        />
        <Input
          id='lbl3'
          type='number'
          min={0}
          max={100}
          value={X}
          onChange={e => {
            const value = clampValue(Number(e.target.value), 0, 100);
            setX(value);
          }}
          placeholder='X nearest cells'
          name='X'
          label='X nearest cells'
        />
        <Button
          typeButton='submit'
          onClick={handleGenerate}
        >
          Generate
        </Button>
      </div>
      <Table X={X} />
    </div>
  );
}

function App() {
  return (
    <MatrixProvider>
      <AppContent />
    </MatrixProvider>
  );
}

export default App;
