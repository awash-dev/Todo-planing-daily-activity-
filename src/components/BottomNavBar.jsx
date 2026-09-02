import React from 'react';
import { CheckSquare, Wallet, Calendar, Settings } from 'lucide-react';

export default function BottomNavBar({ activeTab, setActiveTab }) {
  return (
    <div className="border-t border-gray-100 bg-white/90 backdrop-blur-md px-6 py-2 flex justify-around items-center">
      <button
        onClick={() => setActiveTab('todos')}
        className={`flex flex-col items-center space-y-1 transition-colors ${
          activeTab === 'todos' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <CheckSquare className="w-5 h-5" />
        <span className="text-[10px] font-medium">Todos</span>
      </button>

      {activeTab === 'todos' ? (
        <button
          onClick={() => setActiveTab('expenses')}
          className="flex flex-col items-center space-y-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-medium">Activity</span>
        </button>
      ) : (
        <button
          onClick={() => setActiveTab('expenses')}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            activeTab === 'expenses' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[10px] font-medium">Expenses</span>
        </button>
      )}

      <button
        className="flex flex-col items-center space-y-1 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Settings className="w-5 h-5" />
        <span className="text-[10px] font-medium">Settings</span>
      </button>
    </div>
  );
}
