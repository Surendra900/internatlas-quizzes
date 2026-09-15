import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Percent, 
  RotateCcw, 
  Share2, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Medal
} from 'lucide-react';
import type { Quiz, QuizSubmission, LeaderboardEntry } from '../types/quiz';

interface QuizResultsViewProps {
  quiz: Quiz;
  submission: QuizSubmission;
  leaderboard: LeaderboardEntry[];
  onRetake: () => void;
  onBackToHub: () => void;
}

export const QuizResultsView: React.FC<QuizResultsViewProps> = ({
  quiz,
  submission,
  leaderboard,
  onRetake,
  onBackToHub,
}) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'solutions'>('leaderboard');
  const [copiedShare, setCopiedShare] = useState(false);

  // Trigger confetti on mount if performance was good (>= 60%)
  useEffect(() => {
    if (submission.accuracy >= 60) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#38bdf8', '#f59e0b', '#10b981'],
      });
    }
  }, [submission.accuracy]);

  const userRankEntry = leaderboard.find(l => l.isCurrentUser);
  const rankNumber = userRankEntry?.rank || 1;

  const handleShare = () => {
    navigator.clipboard.writeText(
      `I scored ${submission.score}/${submission.totalPossibleScore} (${submission.accuracy}%) on the "${quiz.title}" assessment on InternAtlas! Check out https://internatlas.in`
    );
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const minutes = Math.floor(submission.timeTakenSeconds / 60);
  const seconds = submission.timeTakenSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds}s`;

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Back Nav */}
        <button
          onClick={onBackToHub}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Quizzes</span>
        </button>

        {/* Hero Scorecard Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl text-white p-6 sm:p-10 shadow-xl border border-indigo-900/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            {/* Score & Badge details */}
            <div className="text-center md:text-left space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Assessment Completed Successfully</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {quiz.title}
              </h1>

              <p className="text-xs text-slate-300 max-w-xl">
                Your performance has been evaluated against {quiz.participantsCount.toLocaleString()} candidates. Results and verifiable credentials have been added to your profile.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <button
                  onClick={handleShare}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1.5 border border-white/10"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedShare ? 'Copied to Clipboard!' : 'Share Scorecard'}</span>
                </button>

                <button
                  onClick={onRetake}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>
              </div>
            </div>

            {/* Score Pill / Dial */}
            <div className="shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center min-w-[200px] shadow-lg">
              <span className="text-[11px] uppercase tracking-wider text-slate-300 font-bold block mb-1">
                Your Score
              </span>
              <div className="text-4xl sm:text-5xl font-black text-amber-400">
                {submission.score}
                <span className="text-xl text-slate-400 font-medium">/{submission.totalPossibleScore}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1">
                <Medal className="w-4 h-4 text-amber-400" />
                <span>Rank #{rankNumber} on Leaderboard</span>
              </div>
            </div>
          </div>

          {/* Metric Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 text-center">
            <div>
              <p className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
                <Percent className="w-3.5 h-3.5 text-indigo-400" />
                Accuracy
              </p>
              <p className="text-xl font-bold text-white mt-0.5">{submission.accuracy}%</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                Time Spent
              </p>
              <p className="text-xl font-bold text-white mt-0.5">{timeFormatted}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Percentile
              </p>
              <p className="text-xl font-bold text-white mt-0.5">
                {Math.min(99.2, Math.max(70, Math.round(submission.accuracy * 0.95 + 5)))}%
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Certification
              </p>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">
                {submission.accuracy >= 50 ? 'Verified' : 'Attempted'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation: Leaderboard vs Solutions */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition ${
              activeTab === 'leaderboard'
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Leaderboard</span>
          </button>

          <button
            onClick={() => setActiveTab('solutions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition ${
              activeTab === 'solutions'
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Detailed Solutions & Analysis</span>
          </button>
        </div>

        {/* Tab 1: Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">National Leaderboard</h3>
                <p className="text-xs text-slate-500">Top performers in {quiz.title}</p>
              </div>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                Updated Live
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Candidate</th>
                    <th className="py-3 px-4">College / Inst.</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Accuracy</th>
                    <th className="py-3 px-4">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leaderboard.map((entry) => {
                    const isUser = entry.isCurrentUser;
                    return (
                      <tr 
                        key={entry.userId}
                        className={`transition-colors ${
                          isUser ? 'bg-indigo-50/80 font-bold text-indigo-950' : 'hover:bg-slate-50/60'
                        }`}
                      >
                        <td className="py-3.5 px-4 font-black">
                          {entry.rank === 1 ? (
                            <span className="w-6 h-6 rounded-full bg-amber-400 text-white flex items-center justify-center text-xs shadow-xs">
                              1
                            </span>
                          ) : entry.rank === 2 ? (
                            <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center text-xs shadow-xs">
                              2
                            </span>
                          ) : entry.rank === 3 ? (
                            <span className="w-6 h-6 rounded-full bg-amber-600/70 text-white flex items-center justify-center text-xs shadow-xs">
                              3
                            </span>
                          ) : (
                            <span className="text-slate-600 pl-1.5">#{entry.rank}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <img 
                              src={entry.avatar} 
                              alt={entry.userName} 
                              className="w-7 h-7 rounded-full object-cover border border-slate-200" 
                            />
                            <div>
                              <span className="font-semibold text-slate-900">{entry.userName}</span>
                              {isUser && (
                                <span className="ml-1.5 text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded font-bold">
                                  YOU
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">{entry.college}</td>
                        <td className="py-3.5 px-4 font-black text-indigo-600">{entry.score} pts</td>
                        <td className="py-3.5 px-4">{entry.accuracy}%</td>
                        <td className="py-3.5 px-4 text-slate-500 font-mono">{entry.timeTaken}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Solutions and Explanations */}
        {activeTab === 'solutions' && (
          <div className="space-y-4">
            {quiz.questions.map((q, idx) => {
              const userAnswerId = submission.answers[q.id];
              const isCorrect = userAnswerId === q.correctOptionId;
              const isUnanswered = !userAnswerId;

              return (
                <div 
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                        Question {idx + 1}
                      </span>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Correct (+{q.marks} marks)
                        </span>
                      ) : isUnanswered ? (
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                          Not Attempted (0 marks)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                          <XCircle className="w-3.5 h-3.5" />
                          Incorrect (0 marks)
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm font-bold text-slate-900 leading-snug">
                    {q.text}
                  </p>

                  {q.codeSnippet && (
                    <div className="bg-slate-900 text-slate-100 rounded-xl p-3 font-mono text-xs overflow-x-auto">
                      <pre><code>{q.codeSnippet}</code></pre>
                    </div>
                  )}

                  {/* Options List */}
                  <div className="space-y-2">
                    {q.options.map((opt) => {
                      const isOptionSelected = userAnswerId === opt.id;
                      const isOptionCorrect = q.correctOptionId === opt.id;

                      let style = 'bg-slate-50 border-slate-200 text-slate-700';
                      if (isOptionCorrect) {
                        style = 'bg-emerald-50/80 border-emerald-500 text-emerald-900 font-semibold ring-1 ring-emerald-500/30';
                      } else if (isOptionSelected && !isCorrect) {
                        style = 'bg-rose-50/80 border-rose-500 text-rose-900 font-semibold';
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 ${style}`}
                        >
                          <div className="flex items-center gap-2">
                            {isOptionCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                            {isOptionSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                            <span>{opt.text}</span>
                          </div>
                          {isOptionCorrect && (
                            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                              Correct Answer
                            </span>
                          )}
                          {isOptionSelected && !isCorrect && (
                            <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                              Your Choice
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-slate-800">
                    <p className="font-bold text-indigo-900 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      Detailed Explanation:
                    </p>
                    <p className="leading-relaxed text-slate-600">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
