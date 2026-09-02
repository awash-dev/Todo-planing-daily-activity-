import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';

export default function TodoTab({ tasks, setTasks }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('personal');

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      completed: false,
      group: 'today'
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');
  };

  const todayTasks = tasks.filter(t => t.group === 'today');
  const recurringTasks = tasks.filter(t => t.group === 'recurring');

  const todayCompleted = todayTasks.filter(t => t.completed).length;
  const todayTotal = todayTasks.length;
  const progressPercent = todayTotal > 0 ? Math.round((todayCompleted / todayTotal) * 100) : 0;

  const getTagBadge = (category) => {
    switch (category) {
      case 'finance':
        return <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-800">finance</span>;
      case 'recurring':
        return <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-amber-100 text-amber-800">recurring</span>;
      case 'personal':
      default:
        return <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-blue-100 text-blue-800">personal</span>;
    }
  };

  return (
    <div className="flex flex-col space-y-5 px-4 pt-3 pb-6">
      {/* Header section */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Good morning</h1>
        <p className="text-sm text-gray-500 font-medium">
          Wednesday, 2 Sep — {todayCompleted} of {todayTotal} done
        </p>
      </div>

      {/* Today group */}
      <div className="space-y-2.5">
        <h2 className="text-xs font-semibold text-gray-400 tracking-wide uppercase">today</h2>
        <div className="space-y-2">
          {todayTasks.map(task => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/70 hover:bg-white border border-gray-100 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0 mr-2">
                <button
                  type="button"
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                    task.completed
                      ? 'bg-emerald-500 text-white'
                      : 'border-2 border-gray-300 group-hover:border-emerald-400'
                  }`}
                >
                  {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
                <span
                  className={`text-sm text-gray-800 transition-colors leading-snug ${
                    task.completed ? 'line-through text-gray-400' : 'font-normal'
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <div className="shrink-0">
                {getTagBadge(task.category)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recurring group */}
      <div className="space-y-2.5">
        <h2 className="text-xs font-semibold text-gray-400 tracking-wide">recurring — auto-added</h2>
        <div className="space-y-2">
          {recurringTasks.map(task => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/70 hover:bg-white border border-gray-100 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0 mr-2">
                <button
                  type="button"
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                    task.completed
                      ? 'bg-emerald-500 text-white'
                      : 'border-2 border-gray-300 group-hover:border-emerald-400'
                  }`}
                >
                  {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
                <span
                  className={`text-sm text-gray-800 transition-colors leading-snug ${
                    task.completed ? 'line-through text-gray-400' : 'font-normal'
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <div className="shrink-0">
                {getTagBadge(task.category)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add task bar */}
      <form onSubmit={handleAddTask} className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-2xs">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden"
        />
        <select
          value={newTaskCategory}
          onChange={(e) => setNewTaskCategory(e.target.value)}
          className="text-xs bg-gray-50 border border-gray-200 text-gray-600 rounded-md px-1.5 py-1 mr-2 focus:outline-hidden"
        >
          <option value="personal">personal</option>
          <option value="finance">finance</option>
          <option value="recurring">recurring</option>
        </select>
        <button
          type="submit"
          className="text-gray-400 hover:text-emerald-600 transition-colors p-1"
          aria-label="Add task"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>

      {/* Activity Today Progress Card */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold text-gray-400 tracking-wide">activity today</h2>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-2xs space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-700">Tasks completed</span>
            <span className="font-semibold text-gray-900">{todayCompleted} / {todayTotal}</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
