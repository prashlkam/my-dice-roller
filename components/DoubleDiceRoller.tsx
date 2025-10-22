
import React, { useState } from 'react';
import Dice from './Dice';
import HistoryTable from './HistoryTable';
import { RollHistoryEntry } from '../types';

const DoubleDiceRoller: React.FC = () => {
  const [results, setResults] = useState<[number, number]>([1, 6]);
  const [history, setHistory] = useState<RollHistoryEntry[]>([]);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);

    const interval = setInterval(() => {
      setResults([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ]);
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      const finalResults: [number, number] = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ];
      setResults(finalResults);
      
      const total = finalResults[0] + finalResults[1];
      const newEntry: RollHistoryEntry = {
        rollNumber: history.length + 1,
        results: finalResults,
        total: total,
        timestamp: new Date().toISOString(),
      };
      setHistory([newEntry, ...history]);
      setIsRolling(false);
    }, 500);
  };
  
  const total = results[0] + results[1];

  return (
    <div className="flex flex-col items-center p-4">
      <div className={`relative flex justify-center items-center gap-4 p-8 bg-slate-900/50 rounded-xl min-h-[160px] w-full mb-8 transition-shadow duration-300 ${isRolling ? 'shadow-lg shadow-indigo-500/30' : ''}`}>
        <div className={isRolling ? 'animate-bounce' : ''}>
          <Dice value={results[0]} />
        </div>
        <div className={isRolling ? 'animate-bounce delay-75' : ''}>
          <Dice value={results[1]} />
        </div>
        <div className="absolute -bottom-5 bg-slate-700 text-white px-4 py-1 rounded-full text-lg font-bold shadow-md">
            Total: {total}
        </div>
      </div>
      <button
        onClick={handleRoll}
        disabled={isRolling}
        className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105"
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
      <HistoryTable history={history} />
    </div>
  );
};

export default DoubleDiceRoller;
