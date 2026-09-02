import React, { useState } from 'react';
import { AlertTriangle, Plus } from 'lucide-react';
import { initialCategories, initialTransactions } from '../data/initialData';

export default function ExpenseTab() {
  const [categories] = useState(initialCategories);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showAddForm, setShowAddForm] = useState(false);
  const [txTitle, setTxTitle] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txCategory, setTxCategory] = useState('food');
  const [txType, setTxType] = useState('expense');

  // Calculate dynamic totals or use fixed target base numbers
  const totalIn = 32000;
  const totalOut = 18650;

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!txTitle.trim() || !txAmount) return;

    const numAmount = parseFloat(txAmount);
    const finalAmount = txType === 'expense' ? -Math.abs(numAmount) : Math.abs(numAmount);

    let dotColor = 'bg-emerald-500';
    if (txType === 'expense') {
      if (txCategory === 'food') dotColor = 'bg-red-500';
      else if (txCategory === 'transport') dotColor = 'bg-blue-500';
      else dotColor = 'bg-amber-500';
    }

    const newTx = {
      id: Date.now().toString(),
      title: txTitle.trim(),
      subtext: `${txCategory} · via SMS`,
      amount: finalAmount,
      currency: 'ETB',
      dotColor
    };

    setTransactions([newTx, ...transactions]);
    setTxTitle('');
    setTxAmount('');
    setShowAddForm(false);
  };

  return (
    <div className="flex flex-col space-y-5 px-4 pt-3 pb-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">September balance</h1>
        <p className="text-sm text-gray-500 font-medium">Auto-read from bank SMS</p>
      </div>

      {/* Balance Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total In */}
        <div className="bg-white/80 rounded-2xl p-3.5 border border-gray-100 shadow-2xs flex flex-col justify-between">
          <span className="text-xs text-gray-500 font-medium">Total in</span>
          <div className="mt-2">
            <span className="text-2xl font-bold text-gray-900 block tracking-tight">
              {totalIn.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-emerald-600">ETB income</span>
          </div>
        </div>

        {/* Total Out */}
        <div className="bg-white/80 rounded-2xl p-3.5 border border-gray-100 shadow-2xs flex flex-col justify-between">
          <span className="text-xs text-gray-500 font-medium">Total out</span>
          <div className="mt-2">
            <span className="text-2xl font-bold text-gray-900 block tracking-tight">
              {totalOut.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-rose-600">ETB spent</span>
          </div>
        </div>
      </div>

      {/* Budget by Category */}
      <div className="space-y-2.5">
        <h2 className="text-xs font-semibold text-gray-400 tracking-wide uppercase">budget by category</h2>
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white/80 rounded-2xl p-3.5 border border-gray-100 shadow-2xs space-y-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-gray-800">{cat.name}</span>
                <span className={`text-xs font-semibold ${cat.status === 'healthy' ? 'text-blue-600' : 'text-rose-600'}`}>
                  {cat.status === 'over' ? 'over' : `${cat.percentage}%`}
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${cat.color}`}
                  style={{ width: `${Math.min(cat.percentage, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-semibold text-gray-400 tracking-wide uppercase">recent transactions</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddTransaction} className="bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Title (e.g. Cafe)"
                value={txTitle}
                onChange={(e) => setTxTitle(e.target.value)}
                className="flex-1 text-xs border border-gray-200 rounded-lg p-2 focus:outline-hidden"
              />
              <input
                type="number"
                placeholder="Amount"
                value={txAmount}
                onChange={(e) => setTxAmount(e.target.value)}
                className="w-24 text-xs border border-gray-200 rounded-lg p-2 focus:outline-hidden"
              />
            </div>
            <div className="flex justify-between items-center text-xs">
              <select
                value={txCategory}
                onChange={(e) => setTxCategory(e.target.value)}
                className="border border-gray-200 rounded-lg p-1.5 text-gray-700 bg-gray-50 focus:outline-hidden"
              >
                <option value="food">food</option>
                <option value="transport">transport</option>
                <option value="bills">bills</option>
                <option value="income">income</option>
              </select>
              <select
                value={txType}
                onChange={(e) => setTxType(e.target.value)}
                className="border border-gray-200 rounded-lg p-1.5 text-gray-700 bg-gray-50 focus:outline-hidden"
              >
                <option value="expense">Expense (-)</option>
                <option value="income">Income (+)</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        )}

        <div className="bg-white/80 rounded-2xl border border-gray-100 shadow-2xs divide-y divide-gray-50 overflow-hidden">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3">
              <div className="flex items-center space-x-3">
                <span className={`w-2.5 h-2.5 rounded-full ${tx.dotColor} shrink-0`} />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 leading-tight">{tx.title}</h3>
                  <p className="text-xs text-gray-400">{tx.subtext}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${tx.amount > 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                {tx.amount > 0 ? `+${tx.amount.toLocaleString()}` : tx.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-amber-100/80 border border-amber-200/80 rounded-2xl p-3.5 flex items-center space-x-3 text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
        <span className="text-xs font-semibold leading-snug">
          Food budget almost full — 4 days left
        </span>
      </div>
    </div>
  );
}
