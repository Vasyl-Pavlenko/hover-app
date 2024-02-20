import React from 'react'
import { getSquareRow, getSquareColumn } from '../../utils/helpers'
import './SquaresInfo.scss'

interface Props {
  activeSquares: number[]
  currentField: number
}

export const SquaresInfo: React.FC<Props> = ({ activeSquares, currentField }) => {
  return (
    <div className="info">
      <h1 className="info__title">Hovered squares</h1>

      <div className="info__container">
        {activeSquares.map((square) => {
          const row = getSquareRow(square, currentField as number);
          const col = getSquareColumn(square, currentField as number);

          return (
            <div className="info__container--squares" key={square}>
              {`row ${row} col ${col}`}
            </div>
          );
        })}
      </div>
    </div>
  );
};
