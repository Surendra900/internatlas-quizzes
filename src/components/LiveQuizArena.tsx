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

  // Countdown timer
  useEffect(() => {
    if (secondsRemaining <= 0) {
      // Auto submit when time runs out
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
  const isTimeCritical = secondsRemaining < 120; // under 2 minutes

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Test Runner Navigation */}
      <header className="bg-slate-900 text-white px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm">
            IA
          </div>
          <div>
            <h2 className="text-sm font-bold text-white line-clamp-1">{quiz.title}</h2>
            <p className="text-[11px] text-slate-400 flex items-center gap-2">
              <span>Section: General & Technical</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span>Negative Marking: None</span>
            </p>
          </div>
        </div>

        {/* Timer & Submit Group */}
        <div className="flex items-center gap-4">
          {/* Live Timer Pill */}
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-sm font-mono font-bold transition-all ${
            isTimeCritical 
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse' 
              : 'bg-slate-800 text-emerald-400 border-slate-700'
          }`}>
            <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-rose-400 animate-spin' : 'text-emerald-400'}`} />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm shadow-indigo-600/30"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Finish Test</span>
          </button>
        </div>
      </header>

      {/* Progress Bar Line */}
      <div className="w-full bg-slate-200 h-1">
        <div 
          className="bg-indigo-600 h-1 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Runner Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Question Pane (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div>
            {/* Question Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md border border-indigo-100">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  Single Choice
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                +{currentQ.marks} Marks
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-4">
              {currentQ.text}
            </h3>

            {/* Code Snippet Box (if present) */}
            {currentQ.codeSnippet && (
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs sm:text-sm overflow-x-auto mb-6 border border-slate-800 shadow-inner">
                <pre>
                  <code>{currentQ.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Multiple Choice Options */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOptionId === opt.id;
                const letter = String.fromCharCode(65 + idx); // A, B, C, D

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                      isSelected 
                        ? 'bg-indigo-50/70 border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs' 
                        : 'bg-white hover:bg-slate-50/80 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isSelected 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {letter}
                    </span>
                    <span className="text-sm font-medium text-slate-800 pt-0.5 leading-relaxed">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Navigation Footer */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleReview}
                className={`text-xs font-semibold px-3 py-2 rounded-xl border flex items-center gap-1.5 transition ${
                  isMarkedForReview
                    ? 'bg-purple-50 text-purple-700 border-purple-300'
                    : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isMarkedForReview ? 'fill-purple-600 text-purple-600' : ''}`} />
                <span>{isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>

              {selectedOptionId && (
                <button
                  onClick={handleClearAnswer}
                  className="text-xs font-semibold px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition flex items-center gap-1"
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
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 flex items-center gap-1 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentQuestionIndex < quiz.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1 transition shadow-sm"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition shadow-sm shadow-indigo-600/30"
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
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
              Question Palette
            </h4>

            {/* Questions Grid */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {quiz.questions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = !!answers[q.id];
                const isMarked = reviewedQuestionIds.has(q.id);

                let badgeColor = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                if (isAnswered && isMarked) {
                  badgeColor = 'bg-purple-600 text-white';
                } else if (isAnswered) {
                  badgeColor = 'bg-emerald-600 text-white';
                } else if (isMarked) {
                  badgeColor = 'bg-purple-100 text-purple-700 border border-purple-300';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-10 rounded-xl text-xs font-bold transition-all relative ${badgeColor} ${
                      isCurrent ? 'ring-2 ring-indigo-500 ring-offset-2 scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-emerald-600" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-purple-600" />
                <span>Marked for Review ({reviewedQuestionIds.size})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-slate-200" />
                <span>Not Attempted ({quiz.questions.length - answeredCount})</span>
              </div>
            </div>

            {/* Instructions box */}
            <div className="mt-6 p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-[11px] text-indigo-900 leading-relaxed">
              <p className="font-bold mb-1 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-indigo-600" />
                InternAtlas Proctored Environment
              </p>
              Timer is active. Switching tabs or closing window will automatically record your current responses.
            </div>
          </div>

          <button
            onClick={onExit}
            className="w-full text-xs font-semibold py-2.5 text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition"
          >
            Leave Assessment
          </button>
        </div>
      </main>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Send className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">Submit Assessment?</h3>
            <p className="text-xs text-slate-600 mb-6">
              You are about to finalize your submission. Once submitted, answers cannot be edited.
            </p>

            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl mb-6 text-center text-xs">
              <div>
                <p className="font-bold text-emerald-600 text-base">{answeredCount}</p>
                <p className="text-slate-500 text-[11px]">Answered</p>
              </div>
              <div>
                <p className="font-bold text-purple-600 text-base">{reviewedQuestionIds.size}</p>
                <p className="text-slate-500 text-[11px]">Marked</p>
              </div>
              <div>
                <p className="font-bold text-slate-600 text-base">{quiz.questions.length - answeredCount}</p>
                <p className="text-slate-500 text-[11px]">Skipped</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Back to Test
              </button>
              <button
                onClick={() => onSubmit(answers, timeTakenSeconds)}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-md shadow-indigo-600/25"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
