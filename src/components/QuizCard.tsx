import React from 'react';
import { 
  Clock, 
  HelpCircle, 
  Users, 
  Trophy, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import type { Quiz } from '../types/quiz';

interface QuizCardProps {
  quiz: Quiz;
  onSelect: (quiz: Quiz) => void;
  onStart: (quiz: Quiz) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, onSelect, onStart }) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Advanced':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Card Header & Badges */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            {/* Status Pill */}
            {quiz.status === 'live' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                Live Now
              </span>
            ) : quiz.status === 'practice' ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Practice
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Upcoming
              </span>
            )}

            {/* Difficulty */}
            <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${getDifficultyColor(quiz.difficulty)}`}>
              {quiz.difficulty}
            </span>
          </div>

          {/* Host / Company Badge */}
          {quiz.company && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
              <span className="w-4 h-4 rounded bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center">
                {quiz.company.logoText || 'IA'}
              </span>
              <span className="truncate max-w-[110px]">{quiz.company.name}</span>
              {quiz.company.verified && (
                <CheckCircle2 className="w-3 h-3 text-blue-500 fill-blue-50" />
              )}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 
          onClick={() => onSelect(quiz)}
          className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 cursor-pointer leading-snug mb-2"
        >
          {quiz.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {quiz.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {quiz.tags.map((tag, idx) => (
            <span 
              key={idx}
              className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Reward Highlight Box */}
        {(quiz.reward.prizePool || quiz.reward.fastTrackInterview) && (
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-2 border-amber-500 p-2.5 rounded-r-lg mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-600" />
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {quiz.reward.prizePool || 'Certificate of Excellence'}
                </p>
                {quiz.reward.fastTrackInterview && (
                  <p className="text-[10px] font-semibold text-amber-700 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    Direct Interview Fast-track
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="bg-slate-50/70 border-t border-slate-100 px-6 py-4">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-500 font-medium mb-4">
          <div className="flex items-center justify-center gap-1 bg-white py-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{quiz.durationMinutes} mins</span>
          </div>
          <div className="flex items-center justify-center gap-1 bg-white py-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>{quiz.questions.length} Qs • {quiz.totalMarks}m</span>
          </div>
          <div className="flex items-center justify-center gap-1 bg-white py-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{quiz.participantsCount.toLocaleString()}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelect(quiz)}
            className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition shadow-2xs text-center"
          >
            Details
          </button>
          <button
            onClick={() => onStart(quiz)}
            className="flex-2 py-2 px-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 group-hover:scale-[1.02] active:scale-100"
          >
            <span>Start Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
