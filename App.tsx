import React, { useState } from 'react';
import { BookOpen, Activity, Projector } from 'lucide-react';
import { TheoryView } from './components/TheoryView';
import { SimulationDashboard } from './components/Simulation/SimulationDashboard';
import { SlidesView } from './components/SlidesView';

enum Tab {
  THEORY = 'theory',
  SIMULATION = 'simulation',
  SLIDES = 'slides',
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.THEORY);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-sm flex items-center justify-center text-white font-bold">
                Ψ
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                Spectral Attention
              </span>
            </div>
            
            <nav className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab(Tab.THEORY)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === Tab.THEORY
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <BookOpen size={16} />
                Formalism
              </button>
              <button
                onClick={() => setActiveTab(Tab.SIMULATION)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === Tab.SIMULATION
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Activity size={16} />
                Simulation
              </button>
              <button
                onClick={() => setActiveTab(Tab.SLIDES)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === Tab.SLIDES
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Projector size={16} />
                Slides
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === Tab.THEORY && <TheoryView />}
        {activeTab === Tab.SIMULATION && <SimulationDashboard />}
        {activeTab === Tab.SLIDES && <SlidesView />}
      </main>
    </div>
  );
};

export default App;
