import { FC, useState } from 'react';

import Button from '../buttons/Button';

interface BracketProps {
  rows: '1' | '2' | '3' | '4';
  cols: '1' | '2' | '3' | '4';
  className?: string;
}

/* Function Component */
export const Bracket: FC<BracketProps> = ({ cols, rows, className }) => {
  const [currentCol, setCurrentCol] = useState(0);

  return (
    <section
      className={`pt-12 flex flex-col items-center justify-center ${className}`}
    >
      <div>
        <Button onClick={() => setCurrentCol(2)}>2x</Button>
        <Button onClick={() => setCurrentCol(3)}>3x</Button>
        <Button onClick={() => setCurrentCol(4)}>4x</Button>
      </div>
      <div
        style={{
          gridTemplateColumns: `10px repeat(${
            Number(currentCol) / 2
          }, min-content) 10px`,
          gridTemplateRows: `repeat(${rows}, 100px)`,
        }}
        className={`grid gap-x-4 h-full place-items-center place-content-center mt-4`}
      >
        <span style={{ gridColumn: `${1}` }} data-col={1} className='🐻'>
          <svg
            width='55'
            height='195'
            viewBox='0 0 55 195'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M5 -3.05176e-05H55V4.99997H5L4.99999 190H55V195H4.99999H0V190V4.99997V-3.05176e-05H5Z'
              fill='white'
            />
          </svg>
        </span>

        <span style={{ gridColumn: `${cols}` }} data-col={4} className='🐻'>
          <svg
            width='55'
            height='195'
            viewBox='0 0 55 195'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M50 195L0 195L4.37114e-07 190L50 190L50 4.99994L1.66103e-05 4.99993L1.70474e-05 -6.58434e-05L50 -6.14723e-05L55 -6.10352e-05L55 4.99994L55 190L55 195L50 195Z'
              fill='white'
            />
          </svg>
        </span>
      </div>
    </section>
  );
};
