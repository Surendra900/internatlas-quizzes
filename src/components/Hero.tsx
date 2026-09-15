import React from 'react';
import { 
  Sparkles, 
  Zap, 
  Trophy, 
  Users, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

interface HeroProps {
  onQuickStart: () => void;
  totalQuizzesCount: number;
}

export const Hero: React.FC<HeroProps> = ({ onQuickStart, totalQuizzesCount }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 border-b border-slate-200/80 pt-10 pb-12">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-4 ring-1 ring-indigo-200/60 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Next-Gen Skill Assessments for InternAtlas</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="text-indigo-800 font-bold">100% Free & Verified</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-4">
            Test Your Knowledge. Win Prizes.{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Fast-Track Your Career.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
            Take timed challenges in Full Stack, DSA, Aptitude, and AI. Earn verifiable badges that automatically showcase on your InternAtlas profile for top employers.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <button
              onClick={onQuickStart}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              Start Hiring Challenge
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#quiz-catalog"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-300/80 shadow-xs transition-colors"
            >
              Browse All {totalQuizzesCount} Quizzes
            </a>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-slate-200/80 pt-6">
            <div className="flex flex-col items-center p-2">
              <span className="text-2xl font-black text-slate-900">₹1,50,000+</span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                Monthly Prize Pool
              </span>
            </div>

            <div className="flex flex-col items-center p-2">
              <span className="text-2xl font-black text-slate-900">12,400+</span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5 text-indigo-500" />
                Active Test Takers
              </span>
            </div>

            <div className="flex flex-col items-center p-2">
              <span className="text-2xl font-black text-slate-900">92%</span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Verified Certificates
              </span>
            </div>

            <div className="flex flex-col items-center p-2">
              <span className="text-2xl font-black text-slate-900">&lt; 15 mins</span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                <Zap className="w-3.5 h-3.5 text-violet-500" />
                Quick & Snackable
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
