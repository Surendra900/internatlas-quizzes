import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  HelpCircle, 
  Trophy, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import type { Quiz } from '../types/quiz';

interface QuizInstructionsModalProps {
  isOpen: boolean;
  quiz: Quiz | null;
  onClose: () => void;
  onConfirmStart: (quiz: Quiz) => void;
}

export const QuizInstructionsModal: React.FC<QuizInstructionsModalProps> = ({
  isOpen,
  quiz,
  onClose,
  onConfirmStart,
}) => {
  const [agreed, setAgreed] = useState(false);

  if (!isOpen || !quiz) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#091838]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#DDE2F0] shadow-[0_20px_50px_rgba(11,30,74,0.2)] text-left relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#EFF1F9] text-[#7C849E] hover:text-[#0B1E4A] transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#E7EDFF] text-[#2E58D7] uppercase tracking-wider">
            PRE-ASSESSMENT CHECKLIST
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-[#0B1E4A] mb-2 leading-snug">
          {quiz.title}
        </h2>

        <p className="text-xs text-[#5B6487] mb-6">
          Please review the instructions below before commencing your timed assessment session.
        </p>

        {/* Test Matrix */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-[#EFF1F9] rounded-2xl border border-[#DDE2F0] mb-6 text-center">
          <div>
            <span className="text-[10px] text-[#7C849E] uppercase font-bold block">Duration</span>
            <span className="text-xs font-black text-[#0B1E4A] flex items-center justify-center gap-1 mt-1">
              <Clock className="w-3.5 h-3.5 text-[#2E58D7]" />
              {quiz.durationMinutes} Minutes
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#7C849E] uppercase font-bold block">Questions</span>
            <span className="text-xs font-black text-[#0B1E4A] flex items-center justify-center gap-1 mt-1">
              <HelpCircle className="w-3.5 h-3.5 text-[#2E58D7]" />
              {quiz.questions.length} Questions
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#7C849E] uppercase font-bold block">Total Marks</span>
            <span className="text-xs font-black text-[#0B1E4A] flex items-center justify-center gap-1 mt-1">
              <Trophy className="w-3.5 h-3.5 text-[#2E58D7]" />
              {quiz.totalMarks} Marks
            </span>
          </div>
        </div>

        {/* Essential Rules */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1E4A] flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-[#2E58D7]" />
            Test Instructions
          </h4>
          <ul className="space-y-2 text-xs text-[#5B6487]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
              <span>Each question carries positive marks. There is <strong>no negative marking</strong> for incorrect responses.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
              <span>You may mark questions for review and jump between questions using the question palette.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
              <span>Once the countdown timer reaches 00:00, your test will <strong>automatically submit</strong>.</span>
            </li>
          </ul>
        </div>

        {/* Honor Code Checkbox */}
        <div className="p-3.5 rounded-xl bg-[#EFF1F9] border border-[#DDE2F0] mb-6">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#0B1E4A]">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-[#2E58D7] rounded focus:ring-[#2E58D7]"
            />
            <span className="leading-snug">
              I certify that I will attempt this assessment independently without external unauthorized assistance or tab switching.
            </span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-xs font-bold text-[#5B6487] hover:text-[#0B1E4A] bg-[#EFF1F9] hover:bg-[#DDE2F0] rounded-full transition cursor-pointer text-center"
          >
            Cancel
          </button>
          <button
            disabled={!agreed}
            onClick={() => onConfirmStart(quiz)}
            className="flex-2 py-3 text-xs font-extrabold text-white bg-[#2E58D7] hover:bg-[#1C3FA8] disabled:opacity-40 disabled:cursor-not-allowed rounded-full transition shadow-md shadow-[#2E58D7]/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>I am Ready, Start Test</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
