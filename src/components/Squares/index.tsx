import React from 'react';
import cn from 'classnames';
import { calculateSquareSize } from '../../utils/helpers';
import './Squares.scss';

interface Props {
  squares: number[];
  activeSquares: number[];
  currentField: number;
  handleSquareHover: (square: number) => void;
}

export const Squares: React.FC<Props> = ({
  squares,
  activeSquares,
  currentField,
  handleSquareHover
}) => {
  const squareSize = calculateSquareSize(500, currentField);

  return (
    <div className="squares">
      {squares.map((square) => (
        <button
          key={square}
          className={cn('square', {
            'square--active': activeSquares.includes(square),
          })}
          style={{
            width: `${squareSize}px`,
            height: `${squareSize}px`,
          }}
          onMouseEnter={() => handleSquareHover(square)}
        />
      ))}
    </div>
  );
};
