const SQUARE_MARGIN = 1;

export const getSquareColumn = (squareIndex: number, fieldSize: number) => {
  const column = squareIndex % fieldSize;
  
  return column || fieldSize;
};
export const getSquareRow = (squareIndex: number, fieldSize: number) => {
  return Math.ceil(squareIndex / fieldSize);
};

export const generateSquareIndices = (fieldSize: number) => {
  const squareIndices: number[] = [];
  const lastSquareIndex = fieldSize > 0 ? fieldSize ** 2 : 0;

  for (let i = 1; i <= lastSquareIndex; i++) {
    squareIndices.push(i);
  }

  return squareIndices;
};

export const calculateSquareSize = (gameFieldSize: number, fieldSize: number) => {
  return gameFieldSize / fieldSize - SQUARE_MARGIN;
};
