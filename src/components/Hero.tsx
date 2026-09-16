import React from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import type { QuizCategory, QuizDifficulty } from '../types/quiz';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: QuizCategory;
  onCategoryChange: (cat: QuizCategory) => void;
  selectedDifficulty: QuizDifficulty | 'all';
  onDifficultyChange: (diff: QuizDifficulty | 'all') => void;
  selectedEntryFee: string;
  onEntryFeeChange: (fee: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedEntryFee,
  onEntryFeeChange,
  onClearFilters,
  hasActiveFilters,
}) => {
  return (
    <div 
      className="border-b border-[#DDE2F0] pt-10 pb-12 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #EFF1F9 68%, #FFE2EB 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Split: Text on Left, Organic Banner Graphic on Right */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10">
          {/* Left Text */}
          <div className="max-w-2xl text-left">
            <span className="text-xs font-black uppercase tracking-wider text-[#2E58D7] block mb-2">
              SKILL ASSESSMENTS &amp; QUIZZES
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1E4A] tracking-[-0.035em] leading-[1.12] mb-3">
              Discover <span className="font-editorial">Curated</span> Quizzes
            </h1>
            <p className="text-base text-[#5B6487] leading-relaxed">
              Explore technical, aptitude, and hiring challenges from top universities and tech enterprises.
            </p>
          </div>

          {/* Right Floating Organic Graphic (as in approved InternAtlas reference) */}
          <div className="relative shrink-0 hidden md:block">
            <div className="relative w-80 h-44 rounded-3xl overflow-hidden shadow-[0_12px_32px_rgba(11,30,74,0.12)] border border-white">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&auto=format&fit=crop&q=80" 
                alt="Students taking quizzes" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091838]/80 via-transparent to-transparent flex items-end p-4">
                <p className="text-white text-xs font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00CBE8]" />
                  <span>More Quizzes, More Opportunities</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Big Search & Filter Bar Container (Exact approved reference design) */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#DDE2F0] shadow-[0_6px_24px_rgba(11,30,74,0.06)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input Box */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7C849E]" />
              <input
                type="text"
                placeholder="Search by quiz name, college, skill or tag..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#EFF1F9]/50 hover:bg-[#EFF1F9] focus:bg-white border border-[#DDE2F0] rounded-xl text-sm text-[#0B1E4A] placeholder-[#7C849E] focus:outline-none focus:ring-2 focus:ring-[#2E58D7]/30 transition"
              />
            </div>

            {/* Category Filter Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-[#EFF1F9]/50 border border-[#DDE2F0] rounded-xl text-xs font-semibold text-[#0B1E4A] focus:outline-none focus:ring-2 focus:ring-[#2E58D7]/30 cursor-pointer"
              >
                <option value="all">All Domains</option>
                <option value="fullstack">Full Stack</option>
                <option value="dsa">DSA &amp; Algo</option>
                <option value="frontend">Frontend &amp; React</option>
                <option value="aptitude">Campus Aptitude</option>
                <option value="aiml">AI &amp; Machine Learning</option>
              </select>
            </div>

            {/* Difficulty Filter Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedDifficulty}
                onChange={(e) => onDifficultyChange(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-[#EFF1F9]/50 border border-[#DDE2F0] rounded-xl text-xs font-semibold text-[#0B1E4A] focus:outline-none focus:ring-2 focus:ring-[#2E58D7]/30 cursor-pointer"
              >
                <option value="all">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Entry Fee Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedEntryFee}
                onChange={(e) => onEntryFeeChange(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#EFF1F9]/50 border border-[#DDE2F0] rounded-xl text-xs font-semibold text-[#0B1E4A] focus:outline-none focus:ring-2 focus:ring-[#2E58D7]/30 cursor-pointer"
              >
                <option value="all">Any Entry Fee</option>
                <option value="Free">Free Entry</option>
                <option value="Paid">Paid Only</option>
              </select>
            </div>

            {/* Action Buttons: Search & Clear */}
            <div className="md:col-span-2 flex items-center gap-2">
              <button 
                className="flex-1 py-2.5 px-4 bg-[#2E58D7] hover:bg-[#1C3FA8] text-white text-xs font-bold rounded-full transition shadow-xs cursor-pointer text-center"
              >
                Search
              </button>

              {hasActiveFilters && (
                <button
                  onClick={onClearFilters}
                  title="Clear All Filters"
                  className="p-2.5 text-[#5B6487] hover:text-[#0B1E4A] bg-[#EFF1F9] hover:bg-[#DDE2F0] rounded-full transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
