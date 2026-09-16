import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Trophy, 
  Users, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Share2, 
  Bookmark, 
  Zap, 
  Mail
} from 'lucide-react';
import type { Quiz, LeaderboardEntry } from '../types/quiz';

interface QuizDetailsPageProps {
  quiz: Quiz;
  leaderboard: LeaderboardEntry[];
  onBack: () => void;
  onStartQuiz: (quiz: Quiz) => void;
  onBookmarkToggle: (quizId: string) => void;
}

export const QuizDetailsPage: React.FC<QuizDetailsPageProps> = ({
  quiz,
  leaderboard,
  onBack,
  onStartQuiz,
  onBookmarkToggle,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'stages' | 'rewards' | 'leaderboard'>('overview');
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(
      `Check out the ${quiz.title} on InternAtlas: https://internatlas-quizzes.vercel.app`
    );
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#EFF1F9] pb-16 text-left">
      {/* Top Back Navigation Bar */}
      <div className="bg-white border-b border-[#DDE2F0] py-3.5 sticky top-18 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#2E58D7] hover:text-[#1C3FA8] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Quizzes</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onBookmarkToggle(quiz.id)}
              className="p-2 text-[#5B6487] hover:text-[#2E58D7] bg-[#EFF1F9] hover:bg-[#DDE2F0] rounded-full transition cursor-pointer"
              title="Bookmark"
            >
              <Bookmark className={`w-4 h-4 ${quiz.isBookmarked ? 'fill-[#2E58D7] text-[#2E58D7]' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-[#5B6487] hover:text-[#2E58D7] bg-[#EFF1F9] hover:bg-[#DDE2F0] rounded-full transition cursor-pointer relative"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
              {copiedShare && (
                <span className="absolute -bottom-7 right-0 text-[10px] bg-[#0B1E4A] text-white px-2 py-0.5 rounded whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Big Themed Hero Banner (Exact match to approved InternAtlas details view) */}
        <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(11,30,74,0.12)] bg-[#091838] border border-white">
          <div className="relative h-64 sm:h-72 w-full overflow-hidden">
            <img 
              src={quiz.bannerUrl} 
              alt={quiz.title} 
              className="w-full h-full object-cover opacity-45 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#091838] via-[#091838]/60 to-transparent" />
          </div>

          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30">
                {quiz.category}
              </span>

              {quiz.status === 'live' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-[#10B981] border border-[#10B981]/30 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                  Registration Open
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#2E58D7]">
                  {quiz.status.toUpperCase()}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-[-0.035em] leading-tight">
                {quiz.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#DDE2F0] font-medium pt-1">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#00CBE8]" />
                  {quiz.company.name}
                </span>
                {quiz.company.location && (
                  <span className="flex items-center gap-1 text-[#DDE2F0]">
                    <MapPin className="w-3.5 h-3.5 text-[#00CBE8]" />
                    {quiz.company.location}
                  </span>
                )}
                <span className="flex items-center gap-1 text-[#DDE2F0]">
                  <Calendar className="w-3.5 h-3.5 text-[#00CBE8]" />
                  {quiz.schedule}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip Box */}
        <div className="bg-white rounded-2xl p-4 border border-[#DDE2F0] shadow-[0_4px_18px_rgba(11,30,74,0.06)] grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-[#E7EDFF] flex items-center justify-center text-[#2E58D7] shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-[#7C849E] font-medium">Entry Fee / Prize</p>
              <p className="text-xs font-extrabold text-[#0B1E4A]">{quiz.entryFee} • {quiz.reward.prizePool || 'Certificates'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-[#E8F9FC] flex items-center justify-center text-[#00CBE8] shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-[#7C849E] font-medium">Registered Participants</p>
              <p className="text-xs font-extrabold text-[#0B1E4A]">{quiz.participantsCount.toLocaleString()}+ Students</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-[#EFF1F9] flex items-center justify-center text-[#0B1E4A] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-[#7C849E] font-medium">Assessment Window</p>
              <p className="text-xs font-extrabold text-[#0B1E4A]">{quiz.durationMinutes} Mins • Timed</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-[#FFE2EB] flex items-center justify-center text-[#C1205B] shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-[#7C849E] font-medium">Contact &amp; Support</p>
              <p className="text-xs font-extrabold text-[#0B1E4A]">support@internatlas.in</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-[#DDE2F0] pb-1 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'stages', label: 'Stages & Timelines (Rounds)' },
            { id: 'rewards', label: 'Prizes & Certification' },
            { id: 'leaderboard', label: 'Live Leaderboard' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#2E58D7] text-white shadow-xs'
                  : 'bg-white text-[#5B6487] hover:text-[#0B1E4A] border border-[#DDE2F0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Split Body: Left Tab Content (8 cols) & Right Action Card (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Tab Panels (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DDE2F0] shadow-[0_4px_18px_rgba(11,30,74,0.06)] space-y-6">
                <div>
                  <h3 className="text-base font-extrabold text-[#0B1E4A] mb-2">About the Assessment</h3>
                  <p className="text-xs sm:text-sm text-[#5B6487] leading-relaxed">
                    {quiz.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DDE2F0]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1E4A] mb-3">
                    Assessment Highlights
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-[#EFF1F9] border border-[#DDE2F0] text-xs">
                      <p className="text-[#7C849E] text-[10px]">Total Questions</p>
                      <p className="font-extrabold text-[#0B1E4A] mt-0.5">{quiz.questions.length} Questions</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#EFF1F9] border border-[#DDE2F0] text-xs">
                      <p className="text-[#7C849E] text-[10px]">Total Marks</p>
                      <p className="font-extrabold text-[#0B1E4A] mt-0.5">{quiz.totalMarks} Marks</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#EFF1F9] border border-[#DDE2F0] text-xs">
                      <p className="text-[#7C849E] text-[10px]">Negative Marking</p>
                      <p className="font-extrabold text-[#10B981] mt-0.5">None (0 marks)</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DDE2F0]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1E4A] mb-2">
                    Eligibility &amp; Target Candidates
                  </h4>
                  <p className="text-xs text-[#5B6487] leading-relaxed">
                    {quiz.eligibility}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DDE2F0]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1E4A] mb-3">
                    Guidelines &amp; Proctoring Rules
                  </h4>
                  <ul className="space-y-2 text-xs text-[#5B6487]">
                    {quiz.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#E7EDFF] text-[#2E58D7] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab: Stages & Timelines */}
            {activeTab === 'stages' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DDE2F0] shadow-[0_4px_18px_rgba(11,30,74,0.06)] space-y-6">
                <div>
                  <h3 className="text-base font-extrabold text-[#0B1E4A] mb-1">Stages &amp; Timelines</h3>
                  <p className="text-xs text-[#5B6487]">This challenge consists of {quiz.rounds.length} sequential rounds:</p>
                </div>

                <div className="space-y-4">
                  {quiz.rounds.map((round) => (
                    <div 
                      key={round.roundNumber}
                      className="p-5 rounded-2xl border border-[#DDE2F0] bg-[#EFF1F9]/50 hover:bg-white hover:border-[#7AD9E8] transition space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-xl bg-[#2E58D7] text-white text-xs font-extrabold flex items-center justify-center shadow-xs">
                            R{round.roundNumber}
                          </span>
                          <div>
                            <h4 className="text-sm font-extrabold text-[#0B1E4A]">{round.title}</h4>
                            <p className="text-[11px] text-[#7C849E]">{round.type} • Duration: {round.duration}</p>
                          </div>
                        </div>

                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          round.status === 'Open' 
                            ? 'bg-[#10B981]/15 text-[#10B981]' 
                            : 'bg-[#EFF1F9] text-[#7C849E]'
                        }`}>
                          {round.status}
                        </span>
                      </div>

                      <p className="text-xs text-[#5B6487] pl-9">
                        {round.description}
                      </p>

                      {round.status === 'Open' && (
                        <div className="pl-9 pt-1">
                          <button
                            onClick={() => onStartQuiz(quiz)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#2E58D7] hover:bg-[#1C3FA8] px-3.5 py-1.5 rounded-full transition shadow-xs cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5 text-[#00CBE8]" />
                            <span>Start Round {round.roundNumber} Now</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Rewards & Prizes */}
            {activeTab === 'rewards' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DDE2F0] shadow-[0_4px_18px_rgba(11,30,74,0.06)] space-y-6">
                <div>
                  <h3 className="text-base font-extrabold text-[#0B1E4A] mb-1">Rewards &amp; Fast-Track Opportunities</h3>
                  <p className="text-xs text-[#5B6487]">Win certificates, verified badges, and direct interview opportunities.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {quiz.reward.firstPrize && (
                    <div className="p-4 rounded-2xl bg-[#FFE2EB]/50 border border-[#C1205B]/20 text-center space-y-1">
                      <span className="text-2xl">🥇</span>
                      <p className="text-xs font-extrabold text-[#C1205B]">1st Place Winner</p>
                      <p className="text-sm font-black text-[#0B1E4A]">{quiz.reward.firstPrize}</p>
                    </div>
                  )}

                  {quiz.reward.secondPrize && (
                    <div className="p-4 rounded-2xl bg-[#EFF1F9] border border-[#DDE2F0] text-center space-y-1">
                      <span className="text-2xl">🥈</span>
                      <p className="text-xs font-extrabold text-[#5B6487]">2nd Place Runner-Up</p>
                      <p className="text-sm font-black text-[#0B1E4A]">{quiz.reward.secondPrize}</p>
                    </div>
                  )}

                  {quiz.reward.thirdPrize && (
                    <div className="p-4 rounded-2xl bg-[#EFF1F9] border border-[#DDE2F0] text-center space-y-1">
                      <span className="text-2xl">🥉</span>
                      <p className="text-xs font-extrabold text-[#5B6487]">3rd Place Runner-Up</p>
                      <p className="text-sm font-black text-[#0B1E4A]">{quiz.reward.thirdPrize}</p>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-[#E8F9FC] border border-[#7AD9E8] space-y-2 text-xs">
                  <p className="font-extrabold text-[#0B1E4A] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#00CBE8]" />
                    Verified Certificate of Excellence
                  </p>
                  <p className="text-[#5B6487]">
                    All candidates scoring &ge; 60% receive an InternAtlas Verified Skill Certificate that automatically attaches to their InternAtlas profile for participating companies.
                  </p>
                </div>
              </div>
            )}

            {/* Tab: Leaderboard */}
            {activeTab === 'leaderboard' && (
              <div className="bg-white rounded-2xl border border-[#DDE2F0] shadow-[0_4px_18px_rgba(11,30,74,0.06)] overflow-hidden">
                <div className="p-5 border-b border-[#DDE2F0] flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B1E4A]">National Leaderboard</h3>
                    <p className="text-xs text-[#5B6487]">Current top performers in {quiz.title}</p>
                  </div>
                  <span className="text-xs font-bold text-[#2E58D7] bg-[#E7EDFF] px-3 py-1 rounded-full">
                    Live
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
                      {leaderboard.map((entry) => (
                        <tr key={entry.userId} className="hover:bg-[#EFF1F9]/50 transition">
                          <td className="py-3 px-4 font-black text-[#0B1E4A]">
                            {entry.rank === 1 ? '🥇 #1' : entry.rank === 2 ? '🥈 #2' : entry.rank === 3 ? '🥉 #3' : `#${entry.rank}`}
                          </td>
                          <td className="py-3 px-4 font-bold text-[#0B1E4A] flex items-center gap-2">
                            <img src={entry.avatar} alt={entry.userName} className="w-6 h-6 rounded-full object-cover" />
                            <span>{entry.userName}</span>
                          </td>
                          <td className="py-3 px-4 text-[#5B6487]">{entry.college}</td>
                          <td className="py-3 px-4 font-extrabold text-[#2E58D7]">{entry.score} pts</td>
                          <td className="py-3 px-4 text-[#5B6487]">{entry.accuracy}%</td>
                          <td className="py-3 px-4 text-[#7C849E] font-mono">{entry.timeTaken}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Sticky Action Box (4 cols) */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
            
            {/* Action Box */}
            <div className="bg-white rounded-2xl p-6 border border-[#DDE2F0] shadow-[0_6px_24px_rgba(11,30,74,0.08)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DDE2F0]">
                <span className="text-xs text-[#7C849E] font-semibold">Participation Status</span>
                <span className="text-xs font-extrabold text-[#10B981] bg-[#10B981]/15 px-2.5 py-0.5 rounded-full">
                  Free Registration
                </span>
              </div>

              {/* Big CTA Pill Button */}
              <button
                onClick={() => onStartQuiz(quiz)}
                className="w-full py-3.5 px-6 bg-[#2E58D7] hover:bg-[#1C3FA8] text-white text-sm font-extrabold rounded-full transition shadow-[0_6px_20px_rgba(46,88,215,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-[#00CBE8]" />
                <span>Start Assessment Now</span>
              </button>

              <div className="space-y-2 text-xs text-[#5B6487] pt-2">
                <div className="flex items-center justify-between">
                  <span>Deadline:</span>
                  <span className="font-bold text-[#0B1E4A]">{quiz.registrationDeadline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Mode:</span>
                  <span className="font-bold text-[#0B1E4A]">Online / Browser</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Questions:</span>
                  <span className="font-bold text-[#0B1E4A]">{quiz.questions.length} MCQs</span>
                </div>
              </div>
            </div>

            {/* Quote / Inspo Card */}
            <div className="bg-[#EFF1F9] rounded-2xl p-5 border border-[#DDE2F0] text-center space-y-2">
              <p className="font-editorial text-lg text-[#0B1E4A] leading-snug">
                “Sharpen your skills today. Unlock the opportunities of tomorrow.”
              </p>
              <p className="text-[11px] font-bold text-[#2E58D7]">
                InternAtlas Careers Network
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
