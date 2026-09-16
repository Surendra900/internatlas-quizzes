import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Bookmark, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import type { Quiz } from '../types/quiz';

interface QuizCardProps {
  quiz: Quiz;
  onSelect: (quiz: Quiz) => void;
  onBookmarkToggle: (quizId: string) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ 
  quiz, 
  onSelect,
  onBookmarkToggle
}) => {
  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'fullstack':
        return 'bg-[#E7EDFF] text-[#2E58D7] border border-[#2E58D7]/20';
      case 'dsa':
        return 'bg-[#E8F9FC] text-[#00CBE8] border border-[#7AD9E8]';
      case 'aiml':
        return 'bg-[#FFE2EB] text-[#C1205B] border border-[#C1205B]/30';
      case 'aptitude':
        return 'bg-[#EFF1F9] text-[#0B1E4A] border border-[#DDE2F0]';
      default:
        return 'bg-[#E7EDFF] text-[#2E58D7] border border-[#DDE2F0]';
    }
  };

  return (
    <div className="card-internatlas flex flex-col justify-between overflow-hidden group cursor-pointer text-left">
      {/* Top Banner Image Container */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img 
          src={quiz.bannerUrl} 
          alt={quiz.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Badges Overlay */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {/* Category Tag */}
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs capitalize ${getCategoryBadge(quiz.category)}`}>
            {quiz.category}
          </span>

          {/* Registration Status Badge */}
          {quiz.status === 'live' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#10B981] border border-[#10B981]/30 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
              Registration Open
            </span>
          ) : quiz.status === 'practice' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#2E58D7] border border-[#2E58D7]/30 shadow-xs">
              Self Practice
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#F59E0B] border border-[#F59E0B]/30 shadow-xs">
              Upcoming
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Title */}
          <h3 
            onClick={() => onSelect(quiz)}
            className="text-base font-extrabold text-[#0B1E4A] group-hover:text-[#2E58D7] transition-colors line-clamp-2 leading-snug mb-1.5"
          >
            {quiz.title}
          </h3>

          {/* Organizer / College & Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#5B6487] font-medium mb-2">
            <span className="font-semibold text-[#0B1E4A] truncate">{quiz.company.name}</span>
            {quiz.company.verified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2E58D7] fill-[#E7EDFF] shrink-0" />
            )}
            {quiz.company.location && (
              <>
                <span className="text-[#DDE2F0]">•</span>
                <span className="truncate text-[#7C849E] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#7C849E]" />
                  {quiz.company.location}
                </span>
              </>
            )}
          </div>

          {/* Schedule / Dates */}
          <div className="flex items-center gap-1.5 text-xs text-[#5B6487] font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#2E58D7]" />
            <span>{quiz.schedule}</span>
          </div>
        </div>

        {/* Card Footer: Entry Fee + View Details + Bookmark */}
        <div className="pt-3.5 border-t border-[#DDE2F0] flex items-center justify-between">
          <div className="text-xs">
            <span className="text-[#7C849E]">Entry: </span>
            <span className="font-bold text-[#0B1E4A]">{quiz.entryFee}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(quiz)}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#2E58D7] hover:text-[#1C3FA8] transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-[#EFF1F9]"
            >
              <span>View details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkToggle(quiz.id);
              }}
              className="p-1.5 rounded-lg text-[#7C849E] hover:text-[#2E58D7] hover:bg-[#EFF1F9] transition cursor-pointer"
              title="Bookmark quiz"
            >
              <Bookmark className={`w-4 h-4 ${quiz.isBookmarked ? 'fill-[#2E58D7] text-[#2E58D7]' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
