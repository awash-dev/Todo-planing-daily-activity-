import React, { useState } from 'react';
import StatusBar from './components/StatusBar';
import TopTabBar from './components/TopTabBar';
import BottomNavBar from './components/BottomNavBar';
import TodoTab from './components/TodoTab';
import ExpenseTab from './components/ExpenseTab';
import { initialTasks } from './data/initialData';
import { Columns2, Smartphone } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('todos');
  const [tasks, setTasks] = useState(initialTasks);
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'split'

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
      {/* Top Header Control Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6 px-2">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">2-Tab Screen Layout Strategy</h1>
          <p className="text-xs text-slate-400">Todo & Activity + Expense Tracker</p>
        </div>
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setViewMode('single')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'single'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Interactive Mobile</span>
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'split'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span>Side-by-Side View</span>
          </button>
        </div>
      </div>

      {/* Main Content View */}
      {viewMode === 'single' ? (
        /* Single Mobile Phone Mockup */
        <div className="w-full max-w-[390px] bg-neutral-50 text-gray-900 rounded-[40px] shadow-2xl border-4 border-slate-800 overflow-hidden flex flex-col min-h-[820px]">
          <StatusBar />
          <TopTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="flex-1 overflow-y-auto">
            {activeTab === 'todos' ? (
              <TodoTab tasks={tasks} setTasks={setTasks} />
            ) : (
              <ExpenseTab />
            )}
          </div>

          <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      ) : (
        /* Side-by-Side View matching prompt layout strategy */
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Screen - Tab 1 */}
          <div className="flex flex-col items-center">
            <div className="mb-2 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Tab 1 — Todo & activity
              </span>
            </div>
            <div className="w-full max-w-[390px] bg-neutral-50 text-gray-900 rounded-[40px] shadow-2xl border-4 border-slate-800 overflow-hidden flex flex-col min-h-[820px]">
              <StatusBar />
              <TopTabBar activeTab="todos" setActiveTab={setActiveTab} />
              <div className="flex-1 overflow-y-auto">
                <TodoTab tasks={tasks} setTasks={setTasks} />
              </div>
              <BottomNavBar activeTab="todos" setActiveTab={setActiveTab} />
            </div>
          </div>

          {/* Right Screen - Tab 2 */}
          <div className="flex flex-col items-center">
            <div className="mb-2 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Tab 2 — Expense tracker
              </span>
            </div>
            <div className="w-full max-w-[390px] bg-neutral-50 text-gray-900 rounded-[40px] shadow-2xl border-4 border-slate-800 overflow-hidden flex flex-col min-h-[820px]">
              <StatusBar />
              <TopTabBar activeTab="expenses" setActiveTab={setActiveTab} />
              <div className="flex-1 overflow-y-auto">
                <ExpenseTab />
              </div>
              <BottomNavBar activeTab="expenses" setActiveTab={setActiveTab} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
