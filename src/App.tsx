import React from 'react';
import { ModeSelector, Squares, SquaresInfo } from './components';
import { client } from './utils/fetchClient';
import { generateSquareIndices } from './utils/helpers';
import { gameMode } from './utils/types/gameMode';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import './App.scss';

export const App: React.FC = () => {
  const [gameModes, setGameModes] = React.useState<gameMode[]>([]);
  const [activeSquares, setActiveSquares] = React.useState<number[]>([]);
  const [isGameStarted, setIsGameStarted] = React.useState<boolean>(false);
  const [selectedMode, setSelectedMode] = React.useState<string | null>(null);
  const [isToastShown, setIsToastShown] = React.useState<boolean>(false);

  const currentField = gameModes.find((mode) => mode.id === selectedMode)?.field || 5;
  const squares = generateSquareIndices(currentField);
  const buttonText = isGameStarted ? 'Finish' : 'Start';

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await client.get<gameMode[]>();
        setGameModes(res);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
      }
    }
    fetchData();
  }, []);

  const showWarningToast = () => {
    if (!isToastShown) {
      toast.warning('Please, start the game firstly');
      setIsToastShown(true);
    }
  };

  const toggleGameStatus = () => {
    setIsGameStarted((prev) => !prev);
    setIsToastShown(false);

    if (!isGameStarted) {
      setActiveSquares([]);
      toast.success('Game started');

    } else {
      setSelectedMode(null);
      setActiveSquares([]);
      toast.info('Game finished');
    }
  };

  const handleStartGame = () => {
    if (selectedMode) {
      toggleGameStatus();
    } else {
      setIsToastShown(false);
      toast.error('Please, select a mode');
    }
  };

  const handleSquareHover = (square: number) => {
    if (isGameStarted) {
      const updatedSquares = activeSquares.includes(square)
        ? activeSquares.filter((s) => s !== square)
        : [square, ...activeSquares];
      setActiveSquares(updatedSquares);
    } else {
      showWarningToast();
    }
  };

  return (
    <div className="game">
      <div className="game__container">
        <div className="game__container--selectors">
          <ModeSelector
            isGameStarted={isGameStarted}
            gameModes={gameModes}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            setActiveSquares={setActiveSquares}
            setIsToastShown={setIsToastShown}
          />

          <button
            onClick={handleStartGame}
            className="game__container--button"
          >
            {buttonText}
          </button>
        </div>

        <Squares {...{ squares, activeSquares, currentField, handleSquareHover }} />
      </div>

      <SquaresInfo
        activeSquares={activeSquares}
        currentField={currentField}
      />
    </div>
  );
};
