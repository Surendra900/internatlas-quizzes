import React from 'react';
import { 
  Bell, 
  Bookmark, 
  PlusCircle, 
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  onOpenCreateModal: () => void;
  onHomeClick: () => void;
  userCompletedCount: number;
  bookmarkedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenCreateModal, 
  onHomeClick, 
  userCompletedCount,
  bookmarkedCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#DDE2F0] shadow-[0_2px_10px_rgba(11,30,74,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-10">
            <button 
              onClick={onHomeClick} 
              className="flex items-center gap-1.5 text-left group transition-transform active:scale-95 cursor-pointer"
            >
              <span className="text-2xl font-extrabold tracking-[-0.035em] text-[#0B1E4A]">
                InternAtlas<span className="text-[#2E58D7]">.</span>
              </span>
            </button>

            {/* Navigation links matching the approved InternAtlas layout */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-[#0B1E4A]">
              <a href="#opportunities" className="px-3.5 py-2 text-[#5B6487] hover:text-[#0B1E4A] hover:bg-[#EFF1F9] rounded-lg transition-colors">
                Opportunities
              </a>
              <button 
                onClick={onHomeClick}
                className="px-3.5 py-2 text-[#2E58D7] bg-[#E7EDFF] rounded-full font-bold flex items-center gap-1.5 transition-all"
              >
                <GraduationCap className="w-4 h-4 text-[#2E58D7]" />
                Quizzes &amp; Tests
              </button>
              <a href="#events" className="px-3.5 py-2 text-[#5B6487] hover:text-[#0B1E4A] hover:bg-[#EFF1F9] rounded-lg transition-colors">
                Events &amp; Fests
              </a>
              <a href="#scholarships" className="px-3.5 py-2 text-[#5B6487] hover:text-[#0B1E4A] hover:bg-[#EFF1F9] rounded-lg transition-colors">
                Scholarships
              </a>
              <a href="#colleges" className="px-3.5 py-2 text-[#5B6487] hover:text-[#0B1E4A] hover:bg-[#EFF1F9] rounded-lg transition-colors">
                For Colleges
              </a>
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Host Assessment CTA */}
            <button
              onClick={onOpenCreateModal}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#2E58D7] hover:bg-[#1C3FA8] text-white text-xs font-bold px-4 py-2.5 rounded-full transition shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#00CBE8]" />
              Host a Quiz
            </button>

            {/* Bookmarks Icon */}
            <div className="relative p-2 text-[#5B6487] hover:text-[#0B1E4A] rounded-full hover:bg-[#EFF1F9] cursor-pointer transition">
              <Bookmark className="w-4 h-4" />
              {bookmarkedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#2E58D7] text-white text-[9px] font-bold flex items-center justify-center">
                  {bookmarkedCount}
                </span>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative p-2 text-[#5B6487] hover:text-[#0B1E4A] rounded-full hover:bg-[#EFF1F9] cursor-pointer transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C1205B]" />
            </div>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#DDE2F0]">
              <div className="w-9 h-9 rounded-full ring-2 ring-[#DDE2F0] bg-gradient-to-tr from-[#0B1E4A] to-[#2E58D7] flex items-center justify-center text-white font-bold text-xs shadow-xs">
                SG
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-bold text-[#0B1E4A] leading-tight">Surendra G</p>
                <p className="text-[11px] text-[#5B6487] font-medium">{userCompletedCount} Assessments</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
