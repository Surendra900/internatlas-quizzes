import React from 'react';
import { 
  X, 
  Clock, 
  HelpCircle, 
  Trophy, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import type { Quiz } from '../types/quiz';

interface QuizDetailsModalProps {
  quiz: Quiz | null;
  onClose: () => void;
  onStart: (quiz: Quiz) => void;
}

export const QuizDetailsModal: React.FC<QuizDetailsModalProps> = ({ quiz, onClose, onStart }) => {
  if (!quiz) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
            {quiz.category.toUpperCase()}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            {quiz.difficulty}
          </span>
          {quiz.status === 'live' && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
              🔴 Live Challenge
            </span>
          )}
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 leading-snug">
          {quiz.title}
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          {quiz.description}
        </p>

        {/* Quick Spec Matrix */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6 text-center">
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">Duration</span>
            <span className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              {quiz.durationMinutes} Minutes
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">Questions</span>
            <span className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1 mt-0.5">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              {quiz.questions.length} Questions
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">Total Marks</span>
            <span className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1 mt-0.5">
              <Trophy className="w-3.5 h-3.5 text-indigo-600" />
              {quiz.totalMarks} Marks
            </span>
          </div>
        </div>

        {/* Rewards Breakdown */}
        <div className="mb-6 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            Rewards & Benefits
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {quiz.reward.prizePool && (
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-amber-900 font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{quiz.reward.prizePool}</span>
              </div>
            )}
            {quiz.reward.certificate && (
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-emerald-900 font-medium flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>InternAtlas Verified Skill Certificate</span>
              </div>
            )}
            {quiz.reward.fastTrackInterview && (
              <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-200/80 text-indigo-900 font-medium flex items-center gap-2 sm:col-span-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Top 10% performers receive direct referral to participating hiring partners.</span>
              </div>
            )}
          </div>
        </div>

        {/* Guidelines */}
        <div className="mb-8 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-2">
          <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            Assessment Guidelines:
          </h5>
          <ul className="list-disc pl-4 space-y-1 text-slate-500">
            <li>The test timer starts immediately upon clicking "Start Assessment".</li>
            <li>No negative marking is applied for incorrect answers.</li>
            <li>You can mark questions for review and navigate freely using the question palette.</li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition text-center"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              onStart(quiz);
            }}
            className="flex-2 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25"
          >
            <span>Start Assessment Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
