import React from 'react';
import { CheckSquare, Wallet } from 'lucide-react';

export default function TopTabBar({ activeTab, setActiveTab }) {
  return (
    <div className="flex border-b border-gray-200 bg-white">
      <button
        onClick={() => setActiveTab('todos')}
        className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-semibold transition-colors relative ${
          activeTab === 'todos'
            ? 'text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <CheckSquare className="w-4 h-4" />
        <span>Todos</span>
        {activeTab === 'todos' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
        )}
      </button>

      <button
        onClick={() => setActiveTab('expenses')}
        className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-semibold transition-colors relative ${
          activeTab === 'expenses'
            ? 'text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <Wallet className="w-4 h-4" />
        <span>Expenses</span>
        {activeTab === 'expenses' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
        )}
      </button>
    </div>
  );
}
