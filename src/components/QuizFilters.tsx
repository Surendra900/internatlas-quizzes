import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { QuizCategory, QuizDifficulty, QuizStatus } from '../types/quiz';

interface QuizFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: QuizCategory;
  onCategoryChange: (cat: QuizCategory) => void;
  selectedStatus: QuizStatus | 'all';
  onStatusChange: (status: QuizStatus | 'all') => void;
  selectedDifficulty: QuizDifficulty | 'all';
  onDifficultyChange: (diff: QuizDifficulty | 'all') => void;
}

export const QuizFilters: React.FC<QuizFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedDifficulty,
  onDifficultyChange,
}) => {
  const categories: { id: QuizCategory; label: string }[] = [
    { id: 'all', label: 'All Fields' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'dsa', label: 'DSA & Algorithms' },
    { id: 'frontend', label: 'Frontend & React' },
    { id: 'aptitude', label: 'Campus Aptitude' },
    { id: 'aiml', label: 'GenAI & Machine Learning' },
  ];

  const statuses: { id: QuizStatus | 'all'; label: string; dot?: string }[] = [
    { id: 'all', label: 'All Quizzes' },
    { id: 'live', label: 'Live Challenges', dot: 'bg-rose-500 animate-pulse' },
    { id: 'practice', label: 'Self Practice', dot: 'bg-emerald-500' },
    { id: 'upcoming', label: 'Upcoming', dot: 'bg-amber-500' },
  ];

  return (
    <div id="quiz-catalog" className="bg-white border-b border-slate-200 py-6 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Top Filter Row: Search & Status Pills */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by topic, skill, company (e.g. React, SQL, Aptitude)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl overflow-x-auto">
            {statuses.map(s => (
              <button
                key={s.id}
                onClick={() => onStatusChange(s.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedStatus === s.id
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {s.dot && <span className={`w-2 h-2 rounded-full ${s.dot}`} />}
                {s.label}
              </button>
            ))}
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={selectedDifficulty}
              onChange={(e) => onDifficultyChange(e.target.value as any)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="all">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
