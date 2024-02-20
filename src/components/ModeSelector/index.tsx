import { FC, ChangeEvent } from 'react';
import { gameMode } from '../../utils/types/gameMode';
import './ModeSelector.scss';

type ModeSelectorProps = {
  gameModes: gameMode[];
  selectedMode: string | null;
  setSelectedMode: (value: string | null) => void;
  isGameStarted: boolean;
  setActiveSquares: (value: number[]) => void;
  setIsToastShown: (value: boolean) => void;
};

export const ModeSelector: FC<ModeSelectorProps> = ({
  gameModes,
  selectedMode,
  setSelectedMode,
  isGameStarted,
  setActiveSquares,
  setIsToastShown,
}) => {
  const handleModeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedMode(selectedValue);
    setActiveSquares([]);
    setIsToastShown(false);
  };

  return (
    <select
      className="mode-selector"
      value={selectedMode?.toString() ?? ''}
      onChange={handleModeChange}
      disabled={isGameStarted}>
      <option value="" disabled hidden>
        Pick mode
      </option>

      {gameModes.map(({ id, name }) => (
        <option
          key={id}
          value={id}
          className="mode-selector__option"
        >
          {name}
        </option>
      ))}
    </select>
  );
};
