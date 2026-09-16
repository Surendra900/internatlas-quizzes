import React from 'react';
import type { QuizCategory, QuizDifficulty, QuizStatus } from '../types/quiz';

interface SidebarFiltersProps {
  selectedCategory: QuizCategory;
  onCategoryChange: (cat: QuizCategory) => void;
  selectedDifficulty: QuizDifficulty | 'all';
  onDifficultyChange: (diff: QuizDifficulty | 'all') => void;
  selectedStatus: QuizStatus | 'all';
  onStatusChange: (status: QuizStatus | 'all') => void;
  selectedEntryFee: string;
  onEntryFeeChange: (fee: string) => void;
  onClearAll: () => void;
}

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedStatus,
  onStatusChange,
  selectedEntryFee,
  onEntryFeeChange,
  onClearAll,
}) => {
  const categories: { id: QuizCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Domains', count: 5 },
    { id: 'fullstack', label: 'Full Stack Web', count: 1 },
    { id: 'dsa', label: 'DSA & Algorithms', count: 1 },
    { id: 'frontend', label: 'Frontend & React', count: 1 },
    { id: 'aptitude', label: 'Campus Aptitude', count: 1 },
    { id: 'aiml', label: 'GenAI & Machine Learning', count: 1 },
  ];

  const difficulties: { id: QuizDifficulty | 'all'; label: string }[] = [
    { id: 'all', label: 'All Levels' },
    { id: 'Beginner', label: 'Beginner' },
    { id: 'Intermediate', label: 'Intermediate' },
    { id: 'Advanced', label: 'Advanced' },
  ];

  const statuses: { id: QuizStatus | 'all'; label: string }[] = [
    { id: 'all', label: 'All Statuses' },
    { id: 'live', label: '🔴 Live Challenges' },
    { id: 'practice', label: 'Self Practice' },
    { id: 'upcoming', label: 'Upcoming' },
  ];

  return (
    <aside className="bg-white rounded-2xl p-5 border border-[#DDE2F0] shadow-[0_4px_18px_rgba(11,30,74,0.06)] space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#DDE2F0]">
        <h3 className="text-sm font-extrabold text-[#0B1E4A] uppercase tracking-wider">
          Filter by
        </h3>
        <button
          onClick={onClearAll}
          className="text-xs font-semibold text-[#2E58D7] hover:underline cursor-pointer"
        >
          Clear all
        </button>
      </div>

      {/* Domain Category Filter */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-[#0B1E4A] uppercase tracking-wide">
          Quiz Domain
        </h4>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <label 
              key={cat.id} 
              className="flex items-center justify-between text-xs text-[#5B6487] hover:text-[#0B1E4A] cursor-pointer p-1 rounded-md hover:bg-[#EFF1F9]"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sidebar-category"
                  checked={selectedCategory === cat.id}
                  onChange={() => onCategoryChange(cat.id)}
                  className="w-3.5 h-3.5 text-[#2E58D7] focus:ring-[#2E58D7]"
                />
                <span className={selectedCategory === cat.id ? 'font-bold text-[#0B1E4A]' : ''}>
                  {cat.label}
                </span>
              </div>
              <span className="text-[10px] bg-[#EFF1F9] text-[#7C849E] px-1.5 py-0.5 rounded font-medium">
                {cat.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Difficulty Level */}
      <div className="space-y-2.5 pt-3 border-t border-[#DDE2F0]">
        <h4 className="text-xs font-bold text-[#0B1E4A] uppercase tracking-wide">
          Difficulty
        </h4>
        <div className="space-y-1.5">
          {difficulties.map((diff) => (
            <label 
              key={diff.id} 
              className="flex items-center gap-2 text-xs text-[#5B6487] hover:text-[#0B1E4A] cursor-pointer p-1 rounded-md hover:bg-[#EFF1F9]"
            >
              <input
                type="radio"
                name="sidebar-difficulty"
                checked={selectedDifficulty === diff.id}
                onChange={() => onDifficultyChange(diff.id)}
                className="w-3.5 h-3.5 text-[#2E58D7] focus:ring-[#2E58D7]"
              />
              <span className={selectedDifficulty === diff.id ? 'font-bold text-[#0B1E4A]' : ''}>
                {diff.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Assessment Status */}
      <div className="space-y-2.5 pt-3 border-t border-[#DDE2F0]">
        <h4 className="text-xs font-bold text-[#0B1E4A] uppercase tracking-wide">
          Status
        </h4>
        <div className="space-y-1.5">
          {statuses.map((st) => (
            <label 
              key={st.id} 
              className="flex items-center gap-2 text-xs text-[#5B6487] hover:text-[#0B1E4A] cursor-pointer p-1 rounded-md hover:bg-[#EFF1F9]"
            >
              <input
                type="radio"
                name="sidebar-status"
                checked={selectedStatus === st.id}
                onChange={() => onStatusChange(st.id)}
                className="w-3.5 h-3.5 text-[#2E58D7] focus:ring-[#2E58D7]"
              />
              <span className={selectedStatus === st.id ? 'font-bold text-[#0B1E4A]' : ''}>
                {st.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Entry Fee */}
      <div className="space-y-2.5 pt-3 border-t border-[#DDE2F0]">
        <h4 className="text-xs font-bold text-[#0B1E4A] uppercase tracking-wide">
          Entry Fee
        </h4>
        <div className="space-y-1.5">
          {['all', 'Free', 'Paid'].map((fee) => (
            <label 
              key={fee} 
              className="flex items-center gap-2 text-xs text-[#5B6487] hover:text-[#0B1E4A] cursor-pointer p-1 rounded-md hover:bg-[#EFF1F9]"
            >
              <input
                type="radio"
                name="sidebar-fee"
                checked={selectedEntryFee === fee}
                onChange={() => onEntryFeeChange(fee)}
                className="w-3.5 h-3.5 text-[#2E58D7] focus:ring-[#2E58D7]"
              />
              <span className={selectedEntryFee === fee ? 'font-bold text-[#0B1E4A]' : ''}>
                {fee === 'all' ? 'All (Free & Paid)' : fee}
              </span>
            </label>
          ))}
        </div>
      </div>

    </aside>
  );
};
