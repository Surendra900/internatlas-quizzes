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

  useEffect(() => {
    if (submission.accuracy >= 60) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2E58D7', '#00CBE8', '#FFE2EB', '#10B981'],
      });
    }
  }, [submission.accuracy]);

  const userRankEntry = leaderboard.find(l => l.isCurrentUser);
  const rankNumber = userRankEntry?.rank || 1;

  const handleShare = () => {
    navigator.clipboard.writeText(
      `I scored ${submission.score}/${submission.totalPossibleScore} (${submission.accuracy}%) on the "${quiz.title}" assessment on InternAtlas! Check out https://internatlas-quizzes.vercel.app`
    );
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const minutes = Math.floor(submission.timeTakenSeconds / 60);
  const seconds = submission.timeTakenSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds}s`;

  return (
    <div className="min-h-screen bg-[#EFF1F9] py-10 text-left">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Back Nav */}
        <button
          onClick={onBackToHub}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#2E58D7] hover:text-[#1C3FA8] transition bg-white px-4 py-2 rounded-full border border-[#DDE2F0] shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Quizzes Hub</span>
        </button>

        {/* Hero Scorecard Banner (Deep Navy #091838 from section 10 of design spec) */}
        <div className="bg-[#091838] rounded-3xl text-white p-6 sm:p-10 shadow-[0_12px_36px_rgba(11,30,74,0.18)] border border-[#0B1E4A] relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            {/* Score & Badge details */}
            <div className="text-center md:text-left space-y-3 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#00CBE8] border border-[#00CBE8]/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#00CBE8]" />
                <span>Assessment Completed Successfully</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-[-0.035em] text-white">
                {quiz.title}
              </h1>

              <p className="text-xs text-[#DDE2F0] max-w-xl">
                Your performance has been evaluated against {quiz.participantsCount.toLocaleString()} candidates nationwide.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <button
                  onClick={handleShare}
                  className="bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2 rounded-full transition flex items-center gap-1.5 border border-white/20 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedShare ? 'Copied to Clipboard!' : 'Share Scorecard'}</span>
                </button>

                <button
                  onClick={onRetake}
                  className="bg-[#2E58D7] hover:bg-[#1C3FA8] text-white text-xs font-bold px-4 py-2 rounded-full transition flex items-center gap-1.5 shadow-md shadow-[#2E58D7]/30 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>
              </div>
            </div>

            {/* Score Pill / Dial */}
            <div className="shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 text-center min-w-[200px] shadow-lg">
              <span className="text-[10px] uppercase tracking-wider text-[#DDE2F0] font-bold block mb-1">
                Your Score
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white">
                {submission.score}
                <span className="text-xl text-[#7AD9E8] font-medium">/{submission.totalPossibleScore}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 text-xs font-bold text-[#00CBE8] flex items-center justify-center gap-1">
                <Medal className="w-4 h-4 text-[#00CBE8]" />
                <span>Rank #{rankNumber} on Leaderboard</span>
              </div>
            </div>
          </div>

          {/* Metric Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 text-center">
            <div>
              <p className="text-xs text-[#DDE2F0] font-medium flex items-center justify-center gap-1">
                <Percent className="w-3.5 h-3.5 text-[#00CBE8]" />
                Accuracy
              </p>
              <p className="text-xl font-extrabold text-white mt-0.5">{submission.accuracy}%</p>
            </div>

            <div>
              <p className="text-xs text-[#DDE2F0] font-medium flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#7AD9E8]" />
                Time Spent
              </p>
              <p className="text-xl font-extrabold text-white mt-0.5">{timeFormatted}</p>
            </div>

            <div>
              <p className="text-xs text-[#DDE2F0] font-medium flex items-center justify-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-[#00CBE8]" />
                Percentile
              </p>
              <p className="text-xl font-extrabold text-white mt-0.5">
                {Math.min(99.2, Math.max(70, Math.round(submission.accuracy * 0.95 + 5)))}%
              </p>
            </div>

            <div>
              <p className="text-xs text-[#DDE2F0] font-medium flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                Certification
              </p>
              <p className="text-xl font-extrabold text-[#10B981] mt-0.5">
                {submission.accuracy >= 50 ? 'Verified' : 'Attempted'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation: Leaderboard vs Solutions */}
        <div className="flex items-center gap-3 border-b border-[#DDE2F0] pb-2">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'bg-[#2E58D7] text-white shadow-xs'
                : 'bg-white text-[#5B6487] hover:text-[#0B1E4A] border border-[#DDE2F0]'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>National Leaderboard</span>
          </button>

          <button
            onClick={() => setActiveTab('solutions')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${
              activeTab === 'solutions'
                ? 'bg-[#2E58D7] text-white shadow-xs'
                : 'bg-white text-[#5B6487] hover:text-[#0B1E4A] border border-[#DDE2F0]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Detailed Solutions &amp; Analysis</span>
          </button>
        </div>

        {/* Tab 1: Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-2xl border border-[#DDE2F0] shadow-[0_4px_18px_rgba(11,30,74,0.06)] overflow-hidden">
            <div className="p-5 border-b border-[#DDE2F0] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-[#0B1E4A]">Live National Rankings</h3>
                <p className="text-xs text-[#5B6487]">Candidates ranked by total score and submission speed</p>
              </div>
              <span className="text-xs font-bold text-[#2E58D7] bg-[#E7EDFF] px-3 py-1 rounded-full">
                Live Updates
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EFF1F9] text-[#7C849E] font-bold uppercase tracking-wider border-b border-[#DDE2F0]">
                  <tr>
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Candidate</th>
                    <th className="py-3 px-4">College</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Accuracy</th>
                    <th className="py-3 px-4">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE2F0]">
                  {leaderboard.map((entry) => {
                    const isUser = entry.isCurrentUser;
                    return (
                      <tr 
                        key={entry.userId}
                        className={`transition-colors ${
                          isUser ? 'bg-[#E7EDFF] font-bold text-[#0B1E4A]' : 'hover:bg-[#EFF1F9]/50'
                        }`}
                      >
                        <td className="py-3.5 px-4 font-black">
                          {entry.rank === 1 ? '🥇 #1' : entry.rank === 2 ? '🥈 #2' : entry.rank === 3 ? '🥉 #3' : `#${entry.rank}`}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <img 
                              src={entry.avatar} 
                              alt={entry.userName} 
                              className="w-7 h-7 rounded-full object-cover border border-[#DDE2F0]" 
                            />
                            <div>
                              <span className="font-bold text-[#0B1E4A]">{entry.userName}</span>
                              {isUser && (
                                <span className="ml-2 text-[10px] bg-[#2E58D7] text-white px-2 py-0.5 rounded-full font-bold">
                                  YOU
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[#5B6487]">{entry.college}</td>
                        <td className="py-3.5 px-4 font-black text-[#2E58D7]">{entry.score} pts</td>
                        <td className="py-3.5 px-4 font-semibold text-[#0B1E4A]">{entry.accuracy}%</td>
                        <td className="py-3.5 px-4 text-[#7C849E] font-mono">{entry.timeTaken}</td>
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
                  className="bg-white rounded-2xl border border-[#DDE2F0] p-6 shadow-[0_4px_18px_rgba(11,30,74,0.06)] space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#DDE2F0]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-[#EFF1F9] text-[#0B1E4A] px-2.5 py-1 rounded-md">
                        Question {idx + 1}
                      </span>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#10B981] bg-[#10B981]/15 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Correct (+{q.marks} marks)
                        </span>
                      ) : isUnanswered ? (
                        <span className="text-xs font-bold text-[#7C849E] bg-[#EFF1F9] px-2.5 py-1 rounded-full">
                          Not Attempted (0 marks)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C1205B] bg-[#FFE2EB] px-2.5 py-1 rounded-full">
                          <XCircle className="w-3.5 h-3.5" />
                          Incorrect (0 marks)
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm font-bold text-[#0B1E4A] leading-relaxed">
                    {q.text}
                  </p>

                  {q.codeSnippet && (
                    <div className="bg-[#091838] text-[#DDE2F0] rounded-xl p-3 font-mono text-xs overflow-x-auto border border-[#0B1E4A]">
                      <pre><code>{q.codeSnippet}</code></pre>
                    </div>
                  )}

                  <div className="space-y-2">
                    {q.options.map((opt) => {
                      const isOptionSelected = userAnswerId === opt.id;
                      const isOptionCorrect = q.correctOptionId === opt.id;

                      let style = 'bg-[#EFF1F9]/60 border-[#DDE2F0] text-[#0B1E4A]';
                      if (isOptionCorrect) {
                        style = 'bg-[#10B981]/15 border-[#10B981] text-[#0B1E4A] font-semibold';
                      } else if (isOptionSelected && !isCorrect) {
                        style = 'bg-[#FFE2EB] border-[#C1205B] text-[#C1205B] font-semibold';
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 ${style}`}
                        >
                          <div className="flex items-center gap-2">
                            {isOptionCorrect && <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />}
                            {isOptionSelected && !isCorrect && <XCircle className="w-4 h-4 text-[#C1205B] shrink-0" />}
                            <span>{opt.text}</span>
                          </div>
                          {isOptionCorrect && (
                            <span className="text-[10px] uppercase font-extrabold text-[#10B981] bg-white px-2 py-0.5 rounded-full">
                              Correct Answer
                            </span>
                          )}
                          {isOptionSelected && !isCorrect && (
                            <span className="text-[10px] uppercase font-extrabold text-[#C1205B] bg-white px-2 py-0.5 rounded-full">
                              Your Choice
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 bg-[#EFF1F9] rounded-xl border border-[#DDE2F0] text-xs text-[#0B1E4A]">
                    <p className="font-bold text-[#2E58D7] mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#2E58D7]" />
                      Detailed Explanation:
                    </p>
                    <p className="leading-relaxed text-[#5B6487]">{q.explanation}</p>
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
