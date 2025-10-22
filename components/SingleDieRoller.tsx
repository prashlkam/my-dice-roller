
import React, { useState } from 'react';
import Dice from './Dice';
import HistoryTable from './HistoryTable';
import { RollHistoryEntry } from '../types';

const SingleDieRoller: React.FC = () => {
  const [result, setResult] = useState<number>(6);
  const [history, setHistory] = useState<RollHistoryEntry[]>([]);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);

    const interval = setInterval(() => {
      setResult(Math.floor(Math.random() * 6) + 1);
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      const finalResult = Math.floor(Math.random() * 6) + 1;
      setResult(finalResult);

      const newEntry: RollHistoryEntry = {
        rollNumber: history.length + 1,
        results: [finalResult],
        total: finalResult,
        timestamp: new Date().toISOString(),
      };
      setHistory([newEntry, ...history]);
      setIsRolling(false);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className={`flex justify-center items-center gap-4 p-8 bg-slate-900/50 rounded-xl min-h-[160px] w-full mb-8 transition-shadow duration-300 ${isRolling ? 'shadow-lg shadow-indigo-500/30' : ''}`}>
        <div className={isRolling ? 'animate-bounce' : ''}>
          <Dice value={result} />
        </div>
      </div>
      <button
        onClick={handleRoll}
        disabled={isRolling}
        className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105"
      >
        {isRolling ? 'Rolling...' : 'Roll Die'}
      </button>
      <HistoryTable history={history} />
    </div>
  );
};

export default SingleDieRoller;
