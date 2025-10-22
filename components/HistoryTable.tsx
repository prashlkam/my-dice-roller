
import React from 'react';
import { RollHistoryEntry } from '../types';

interface HistoryTableProps {
  history: RollHistoryEntry[];
}

const HistoryTable: React.FC<HistoryTableProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="text-center text-slate-400 py-8">
        <p>No rolls yet. Roll the dice to see history!</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-center mb-4 text-slate-300">Roll History</h3>
      <div className="max-h-60 overflow-y-auto rounded-lg bg-slate-900/50 border border-slate-700">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs text-slate-400 uppercase bg-slate-700 sticky top-0">
            <tr>
              <th scope="col" className="px-4 py-3 text-center">Roll #</th>
              <th scope="col" className="px-4 py-3">Results</th>
              <th scope="col" className="px-4 py-3 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry.rollNumber} className="border-b border-slate-700 hover:bg-slate-700/50">
                <td className="px-4 py-3 text-center font-medium">{entry.rollNumber}</td>
                <td className="px-4 py-3">{entry.results.join(', ')}</td>
                <td className="px-4 py-3 text-center font-bold text-white">{entry.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
