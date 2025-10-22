
import React, { useState } from 'react';
import SingleDieRoller from './components/SingleDieRoller';
import DoubleDiceRoller from './components/DoubleDiceRoller';
import MultiDiceRoller from './components/MultiDiceRoller';

type Tab = 'single' | 'double' | 'multi';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('single');

  const renderContent = () => {
    switch (activeTab) {
      case 'single':
        return <SingleDieRoller />;
      case 'double':
        return <DoubleDiceRoller />;
      case 'multi':
        return <MultiDiceRoller />;
      default:
        return <SingleDieRoller />;
    }
  };

  const TabButton: React.FC<{ tabName: Tab; label: string; isPremium?: boolean }> = ({ tabName, label, isPremium }) => {
    const isActive = activeTab === tabName;
    return (
      <button
        onClick={() => setActiveTab(tabName)}
        className={`flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-semibold rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${
          isActive
            ? isPremium
              ? 'bg-amber-500 text-slate-900 focus:ring-amber-400'
              : 'bg-indigo-600 text-white focus:ring-indigo-500'
            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        }`}
      >
        {isPremium && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v.518a3 3 0 012.535 2.443l.29 1.453a.75.75 0 01-1.48-.294l-.29-1.453a1.5 1.5 0 00-1.268-1.222V3.75A.75.75 0 0110 3v-.25A.75.75 0 0110 2zM5.932 4.135a.75.75 0 011.06 0l.25.25a.75.75 0 11-1.06 1.06l-.25-.25a.75.75 0 010-1.06zM12.758 5.445a.75.75 0 011.06 1.06l-.25.25a.75.75 0 01-1.06-1.06l.25-.25zM10 6a4 4 0 100 8 4 4 0 000-8zM7.47 14.53a.75.75 0 010-1.06l.25-.25a.75.75 0 111.06 1.06l-.25.25a.75.75 0 01-1.06 0zM12.53 13.47a.75.75 0 011.06 0l.25.25a.75.75 0 11-1.06 1.06l-.25-.25a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        )}
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-8 flex flex-col items-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Gemini Dice Roller
        </h1>
        <p className="text-slate-400 mt-2">A fair and simple dice rolling simulator.</p>
      </header>
      
      <div className="w-full max-w-3xl bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-6 border border-slate-700">
        <nav className="flex justify-center mb-6 gap-2 sm:gap-4">
          <TabButton tabName="single" label="Single Die" />
          <TabButton tabName="double" label="Two Dice" />
          <TabButton tabName="multi" label="Multi-Dice" isPremium />
        </nav>
        
        <main>
          {renderContent()}
        </main>
      </div>

      <footer className="mt-8 text-center text-slate-500 text-sm">
        <p>Powered by React & Tailwind CSS. Designed for Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
