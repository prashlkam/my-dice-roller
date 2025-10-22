
import React, { useState, useEffect } from 'react';
import Dice from './Dice';
import HistoryTable from './HistoryTable';
import { RollHistoryEntry } from '../types';

const STORAGE_KEY = 'multiDiceHistory';

const MultiDiceRoller: React.FC = () => {
  const [numDice, setNumDice] = useState<number>(3);
  const [results, setResults] = useState<number[]>(Array(3).fill(6));
  const [history, setHistory] = useState<RollHistoryEntry[]>(() => {
    try {
      const savedHistory = window.localStorage.getItem(STORAGE_KEY);
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error("Failed to parse history from localStorage", error);
      return [];
    }
  });
  const [isRolling, setIsRolling] = useState<boolean>(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history to localStorage", error);
    }
  }, [history]);

  useEffect(() => {
    setResults(Array(numDice).fill(6));
  }, [numDice]);

  const handleNumDiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) value = 1;
    if (value > 10) value = 10; // Cap at 10 for UI reasons
    setNumDice(value);
  };
  
  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);

    const interval = setInterval(() => {
        setResults(Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1));
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      const finalResults = Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1);
      setResults(finalResults);

      const total = finalResults.reduce((sum, val) => sum + val, 0);
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
  
  const total = results.reduce((sum, val) => sum + val, 0);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-6 flex items-center gap-4 bg-slate-900/50 p-3 rounded-lg">
        <label htmlFor="numDice" className="font-semibold text-slate-300">Number of Dice:</label>
        <input
          type="number"
          id="numDice"
          value={numDice}
          onChange={handleNumDiceChange}
          min="1"
          max="10"
          className="w-20 bg-slate-700 text-white font-bold text-center rounded-md p-2 border-2 border-slate-600 focus:border-amber-500 focus:ring-amber-500 focus:outline-none"
        />
      </div>
      <div className={`relative flex flex-wrap justify-center items-center gap-4 p-8 bg-slate-900/50 rounded-xl min-h-[160px] w-full mb-8 transition-shadow duration-300 ${isRolling ? 'shadow-lg shadow-amber-500/30' : ''}`}>
        {results.map((val, i) => (
          <div key={i} className={isRolling ? 'animate-bounce' : ''} style={{ animationDelay: `${i * 50}ms`}}>
              <Dice value={val} />
          </div>
        ))}
        {results.length > 0 && (
             <div className="absolute -bottom-5 bg-slate-700 text-white px-4 py-1 rounded-full text-lg font-bold shadow-md">
                Total: {total}
            </div>
        )}
      </div>
      <button
        onClick={handleRoll}
        disabled={isRolling}
        className="bg-amber-500 hover:bg-amber-400 disabled:bg-amber-700 disabled:cursor-not-allowed text-slate-900 font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105"
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
      <HistoryTable history={history} />
    </div>
  );
};

export default MultiDiceRoller;
