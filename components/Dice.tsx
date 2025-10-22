
import React from 'react';

interface DiceProps {
  value: number;
}

const Dice: React.FC<DiceProps> = ({ value }) => {
  const dotPositions: { [key: number]: string[] } = {
    1: ['center'],
    2: ['top-left', 'bottom-right'],
    3: ['top-left', 'center', 'bottom-right'],
    4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
    6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'],
  };

  const getDotClass = (pos: string) => {
    const base = 'absolute w-[22%] h-[22%] bg-slate-800 rounded-full';
    switch (pos) {
      case 'center': return `${base} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`;
      case 'top-left': return `${base} top-[15%] left-[15%]`;
      case 'top-right': return `${base} top-[15%] right-[15%]`;
      case 'middle-left': return `${base} top-1/2 left-[15%] -translate-y-1/2`;
      case 'middle-right': return `${base} top-1/2 right-[15%] -translate-y-1/2`;
      case 'bottom-left': return `${base} bottom-[15%] left-[15%]`;
      case 'bottom-right': return `${base} bottom-[15%] right-[15%]`;
      default: return '';
    }
  };

  return (
    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-lg shadow-lg p-2 relative transform transition-transform duration-300 ease-in-out">
      {(dotPositions[value] || []).map(pos => (
        <div key={pos} className={getDotClass(pos)}></div>
      ))}
    </div>
  );
};

export default Dice;
