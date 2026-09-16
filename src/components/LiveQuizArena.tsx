import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  RotateCcw,
  Shield
} from 'lucide-react';
import type { Quiz } from '../types/quiz';

interface LiveQuizArenaProps {
  quiz: Quiz;
  onExit: () => void;
  onSubmit: (answers: Record<string, string>, timeTakenSeconds: number) => void;
}

export const LiveQuizArena: React.FC<LiveQuizArenaProps> = ({ quiz, onExit, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [reviewedQuestionIds, setReviewedQuestionIds] = useState<Set<string>>(new Set());
  const [secondsRemaining, setSecondsRemaining] = useState(quiz.durationMinutes * 60);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const totalDurationSeconds = quiz.durationMinutes * 60;
  const timeTakenSeconds = totalDurationSeconds - secondsRemaining;

  useEffect(() => {
    if (secondsRemaining <= 0) {
      onSubmit(answers, totalDurationSeconds);
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining, answers, totalDurationSeconds, onSubmit]);

  const currentQ = quiz.questions[currentQuestionIndex];
  const selectedOptionId = answers[currentQ.id];
  const isMarkedForReview = reviewedQuestionIds.has(currentQ.id);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleClearAnswer = () => {
    setAnswers(prev => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
  };

  const handleToggleReview = () => {
    setReviewedQuestionIds(prev => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) {
        next.delete(currentQ.id);
      } else {
        next.add(currentQ.id);
      }
      return next;
    });
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / quiz.questions.length) * 100);
  const isTimeCritical = secondsRemaining < 120;

  return (
    <div className="min-h-screen bg-[#EFF1F9] flex flex-col text-left">
      {/* Test Arena Top Navigation Bar */}
      <header className="bg-[#0B1E4A] text-white px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-[#091838] shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#2E58D7] flex items-center justify-center font-extrabold text-sm text-white">
            IA
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white line-clamp-1">{quiz.title}</h2>
            <p className="text-[11px] text-[#DDE2F0] flex items-center gap-2">
              <span>Section: General &amp; Technical</span>
              <span className="w-1 h-1 rounded-full bg-[#7AD9E8]" />
              <span>No Negative Marking</span>
            </p>
          </div>
        </div>

        {/* Live Timer Pill & Submit Button */}
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-sm font-mono font-bold transition-all ${
            isTimeCritical 
              ? 'bg-[#C1205B]/20 text-[#FFE2EB] border-[#C1205B] animate-pulse' 
              : 'bg-[#091838] text-[#00CBE8] border-[#2E58D7]/40'
          }`}>
            <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-[#C1205B] animate-spin' : 'text-[#00CBE8]'}`} />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="bg-[#2E58D7] hover:bg-[#1C3FA8] text-white text-xs font-bold px-4 py-2 rounded-full transition flex items-center gap-1.5 shadow-sm shadow-[#2E58D7]/30 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Test</span>
          </button>
        </div>
      </header>

      {/* Progress Bar Line */}
      <div className="w-full bg-[#DDE2F0] h-1.5">
        <div 
          className="bg-[#2E58D7] h-1.5 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Runner Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Question Pane (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white rounded-2xl border border-[#DDE2F0] shadow-[0_4px_18px_rgba(11,30,74,0.06)] p-6 sm:p-8 min-h-[540px]">
          <div>
            {/* Question Top Meta */}
            <div className="flex items-center justify-between pb-4 border-b border-[#DDE2F0] mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-[#E7EDFF] text-[#2E58D7] px-3 py-1 rounded-full border border-[#2E58D7]/20">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </span>
                <span className="text-xs font-semibold text-[#5B6487]">
                  Single Choice
                </span>
              </div>
              <span className="text-xs font-extrabold text-[#10B981] bg-[#10B981]/15 px-3 py-1 rounded-full">
                +{currentQ.marks} Marks
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-bold text-[#0B1E4A] leading-relaxed mb-4">
              {currentQ.text}
            </h3>

            {/* Code Snippet Box (if present) */}
            {currentQ.codeSnippet && (
              <div className="bg-[#091838] text-[#DDE2F0] rounded-2xl p-4 font-mono text-xs sm:text-sm overflow-x-auto mb-6 border border-[#0B1E4A] shadow-inner">
                <pre>
                  <code>{currentQ.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Multiple Choice Options */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOptionId === opt.id;
                const letter = String.fromCharCode(65 + idx);

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                      isSelected 
                        ? 'bg-[#E7EDFF] border-[#2E58D7] ring-2 ring-[#2E58D7]/20 shadow-xs' 
                        : 'bg-white hover:bg-[#EFF1F9] border-[#DDE2F0] text-[#0B1E4A]'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isSelected 
                        ? 'bg-[#2E58D7] text-white shadow-xs' 
                        : 'bg-[#EFF1F9] text-[#5B6487]'
                    }`}>
                      {letter}
                    </span>
                    <span className="text-sm font-medium text-[#0B1E4A] pt-0.5 leading-relaxed">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Navigation Footer */}
          <div className="pt-6 border-t border-[#DDE2F0] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleReview}
                className={`text-xs font-bold px-3.5 py-2 rounded-full border flex items-center gap-1.5 transition cursor-pointer ${
                  isMarkedForReview
                    ? 'bg-[#FFE2EB] text-[#C1205B] border-[#C1205B]'
                    : 'bg-white hover:bg-[#EFF1F9] text-[#5B6487] border-[#DDE2F0]'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isMarkedForReview ? 'fill-[#C1205B] text-[#C1205B]' : ''}`} />
                <span>{isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>

              {selectedOptionId && (
                <button
                  onClick={handleClearAnswer}
                  className="text-xs font-bold px-3 py-2 rounded-full text-[#7C849E] hover:text-[#0B1E4A] hover:bg-[#EFF1F9] transition flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className="px-4 py-2 text-xs font-bold rounded-full border border-[#DDE2F0] bg-white hover:bg-[#EFF1F9] disabled:opacity-40 disabled:cursor-not-allowed text-[#0B1E4A] flex items-center gap-1 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentQuestionIndex < quiz.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  className="px-5 py-2 text-xs font-bold rounded-full bg-[#0B1E4A] hover:bg-[#091838] text-white flex items-center gap-1 transition shadow-xs cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="px-5 py-2 text-xs font-bold rounded-full bg-[#2E58D7] hover:bg-[#1C3FA8] text-white flex items-center gap-1.5 transition shadow-sm shadow-[#2E58D7]/30 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Submit Quiz</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Question Palette & Overview (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-[#DDE2F0] shadow-[0_4px_18px_rgba(11,30,74,0.06)] p-6">
            <h4 className="text-xs font-bold text-[#0B1E4A] uppercase tracking-wider mb-4 pb-2 border-b border-[#DDE2F0]">
              Question Palette
            </h4>

            {/* Questions Grid */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {quiz.questions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = !!answers[q.id];
                const isMarked = reviewedQuestionIds.has(q.id);

                let badgeColor = 'bg-[#EFF1F9] text-[#0B1E4A] hover:bg-[#DDE2F0]';
                if (isAnswered && isMarked) {
                  badgeColor = 'bg-[#C1205B] text-white';
                } else if (isAnswered) {
                  badgeColor = 'bg-[#10B981] text-white';
                } else if (isMarked) {
                  badgeColor = 'bg-[#FFE2EB] text-[#C1205B] border border-[#C1205B]';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-10 rounded-xl text-xs font-bold transition-all relative cursor-pointer ${badgeColor} ${
                      isCurrent ? 'ring-2 ring-[#2E58D7] ring-offset-2 scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs text-[#5B6487] border-t border-[#DDE2F0] pt-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#10B981]" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#C1205B]" />
                <span>Marked for Review ({reviewedQuestionIds.size})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#DDE2F0]" />
                <span>Not Attempted ({quiz.questions.length - answeredCount})</span>
              </div>
            </div>

            <div className="mt-6 p-3.5 bg-[#EFF1F9] rounded-xl border border-[#DDE2F0] text-[11px] text-[#0B1E4A] leading-relaxed">
              <p className="font-bold mb-1 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#2E58D7]" />
                Proctored Test Window
              </p>
              Please avoid closing or refreshing your browser until your responses are submitted.
            </div>
          </div>

          <button
            onClick={onExit}
            className="w-full text-xs font-bold py-2.5 text-[#7C849E] hover:text-[#0B1E4A] bg-white hover:bg-[#EFF1F9] border border-[#DDE2F0] rounded-full transition cursor-pointer"
          >
            Leave Assessment
          </button>
        </div>
      </main>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 bg-[#091838]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#DDE2F0] text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#E7EDFF] text-[#2E58D7] flex items-center justify-center mb-4">
              <Send className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-[#0B1E4A] mb-2">Submit Assessment?</h3>
            <p className="text-xs text-[#5B6487] mb-6">
              You are about to finalize your submission. Once submitted, answers cannot be altered.
            </p>

            <div className="grid grid-cols-3 gap-2 p-3 bg-[#EFF1F9] rounded-xl mb-6 text-center text-xs">
              <div>
                <p className="font-bold text-[#10B981] text-base">{answeredCount}</p>
                <p className="text-[#7C849E] text-[11px]">Answered</p>
              </div>
              <div>
                <p className="font-bold text-[#C1205B] text-base">{reviewedQuestionIds.size}</p>
                <p className="text-[#7C849E] text-[11px]">Marked</p>
              </div>
              <div>
                <p className="font-bold text-[#5B6487] text-base">{quiz.questions.length - answeredCount}</p>
                <p className="text-[#7C849E] text-[11px]">Skipped</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-2.5 text-xs font-bold text-[#5B6487] bg-[#EFF1F9] hover:bg-[#DDE2F0] rounded-full transition cursor-pointer"
              >
                Back to Test
              </button>
              <button
                onClick={() => onSubmit(answers, timeTakenSeconds)}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-[#2E58D7] hover:bg-[#1C3FA8] rounded-full transition shadow-md shadow-[#2E58D7]/25 cursor-pointer"
              >
                Confirm &amp; Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
