import React from 'react';
import { 
  Sparkles, 
  PlusCircle, 
  Flame, 
  Compass, 
  Briefcase, 
  Trophy, 
  GraduationCap 
} from 'lucide-react';

interface NavbarProps {
  onOpenCreateModal: () => void;
  onHomeClick: () => void;
  userCompletedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenCreateModal, 
  onHomeClick, 
  userCompletedCount 
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-300" />
        <span>
          <strong>InternAtlas National Hiring Challenge:</strong> Top 10 rankers in today's Full Stack Sprint get guaranteed interview fast-tracking!
        </span>
        <span className="hidden md:inline-block bg-white/20 px-2 py-0.5 rounded text-[11px] font-semibold">Ends in 3 hrs</span>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button 
              onClick={onHomeClick} 
              className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-all">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-slate-900">
                    Intern<span className="text-indigo-600">Atlas</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">
                    MVP
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 hidden sm:block font-medium">Careers • Skills • Hackathons</p>
              </div>
            </button>

            {/* Navigation items matching the founder's specification */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
              <a href="#internships" className="px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-slate-400" />
                Internships
              </a>
              <a href="#jobs" className="px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                Jobs
              </a>
              <a href="#competitions" className="px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                Competitions
              </a>
              {/* Active Tab: Quizzes */}
              <button 
                onClick={onHomeClick}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg font-bold flex items-center gap-1.5 border border-indigo-200/60 shadow-xs"
              >
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                Quizzes
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              </button>
              <a href="#hackathons" className="px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                Hackathons
              </a>
              <a href="#events" className="px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                Events & Fests
              </a>
            </nav>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            {/* Host Quiz CTA */}
            <button
              onClick={onOpenCreateModal}
              className="hidden sm:inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-indigo-400" />
              Host Quiz
            </button>

            {/* Streak & Achievements */}
            <div className="hidden md:flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-1 rounded-lg text-xs font-bold">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>3 Day Streak</span>
            </div>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full ring-2 ring-indigo-600/20 bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                SG
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">Surendra G</p>
                <p className="text-[10px] text-indigo-600 font-medium">{userCompletedCount} Tests Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
