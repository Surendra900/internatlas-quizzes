import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SidebarFilters } from './components/SidebarFilters';
import { QuizCard } from './components/QuizCard';
import { QuizDetailsPage } from './components/QuizDetailsPage';
import { QuizInstructionsModal } from './components/QuizInstructionsModal';
import { LiveQuizArena } from './components/LiveQuizArena';
import { QuizResultsView } from './components/QuizResultsView';
import { CreateQuizModal } from './components/CreateQuizModal';
import { quizService } from './services/quizService';
import type { 
  Quiz, 
  QuizCategory, 
  QuizDifficulty, 
  QuizStatus, 
  QuizSubmission, 
  LeaderboardEntry 
} from './types/quiz';
import { SlidersHorizontal } from 'lucide-react';

export function App() {
  const [view, setView] = useState<'catalog' | 'details' | 'arena' | 'results'>('catalog');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Result state
  const [lastSubmission, setLastSubmission] = useState<QuizSubmission | null>(null);
  const [lastLeaderboard, setLastLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>('all');
  const [selectedStatus, setSelectedStatus] = useState<QuizStatus | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty | 'all'>('all');
  const [selectedEntryFee, setSelectedEntryFee] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'participants' | 'duration'>('latest');

  // Load quizzes on mount
  useEffect(() => {
    const list = quizService.getQuizzes();
    setQuizzes(list);
  }, []);

  const stats = quizService.getUserStats();
  const bookmarkedCount = quizzes.filter(q => q.isBookmarked).length;

  const handleBookmarkToggle = (quizId: string) => {
    const updated = quizService.toggleBookmark(quizId);
    setQuizzes(updated);
    if (selectedQuiz && selectedQuiz.id === quizId) {
      setSelectedQuiz(prev => prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null);
    }
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedDifficulty('all');
    setSelectedEntryFee('all');
  };

  const hasActiveFilters = 
    Boolean(searchQuery.trim()) || 
    selectedCategory !== 'all' || 
    selectedStatus !== 'all' || 
    selectedDifficulty !== 'all' || 
    selectedEntryFee !== 'all';

  // Filtered & Sorted Quizzes
  const filteredQuizzes = quizzes.filter(quiz => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = quiz.title.toLowerCase().includes(q);
      const matchesDesc = quiz.description.toLowerCase().includes(q);
      const matchesTags = quiz.tags.some(t => t.toLowerCase().includes(q));
      const matchesCompany = quiz.company.name.toLowerCase().includes(q);
      if (!matchesTitle && !matchesDesc && !matchesTags && !matchesCompany) {
        return false;
      }
    }

    if (selectedCategory !== 'all' && quiz.category !== selectedCategory) {
      return false;
    }

    if (selectedStatus !== 'all' && quiz.status !== selectedStatus) {
      return false;
    }

    if (selectedDifficulty !== 'all' && quiz.difficulty !== selectedDifficulty) {
      return false;
    }

    if (selectedEntryFee !== 'all') {
      if (selectedEntryFee === 'Free' && quiz.entryFee.toLowerCase() !== 'free') return false;
      if (selectedEntryFee === 'Paid' && quiz.entryFee.toLowerCase() === 'free') return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'participants') return b.participantsCount - a.participantsCount;
    if (sortBy === 'duration') return a.durationMinutes - b.durationMinutes;
    return 0; // default latest
  });

  // Flow handlers
  const handleOpenDetails = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInitiateQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setShowInstructionsModal(true);
  };

  const handleConfirmStartQuiz = (quiz: Quiz) => {
    setShowInstructionsModal(false);
    setSelectedQuiz(quiz);
    setView('arena');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitQuiz = (answers: Record<string, string>, timeTakenSeconds: number) => {
    if (!selectedQuiz) return;
    const { submission, leaderboard } = quizService.submitQuiz(
      selectedQuiz.id,
      answers,
      timeTakenSeconds
    );
    setLastSubmission(submission);
    setLastLeaderboard(leaderboard);
    setQuizzes(quizService.getQuizzes());
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizCreated = (newQuiz: Quiz) => {
    quizService.saveQuiz(newQuiz);
    setQuizzes(quizService.getQuizzes());
  };

  return (
    <div className="min-h-screen bg-[#EFF1F9] flex flex-col font-sans antialiased text-[#0B1E4A]">
      {/* 1. Global Navigation Bar */}
      {view !== 'arena' && (
        <Navbar
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
          onHomeClick={() => {
            setView('catalog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          userCompletedCount={stats.totalCompleted}
          bookmarkedCount={bookmarkedCount}
        />
      )}

      {/* 2. Main View Router */}
      {view === 'arena' && selectedQuiz && (
        <LiveQuizArena
          quiz={selectedQuiz}
          onExit={() => setView('details')}
          onSubmit={handleSubmitQuiz}
        />
      )}

      {view === 'details' && selectedQuiz && (
        <QuizDetailsPage
          quiz={selectedQuiz}
          leaderboard={quizService.getLeaderboard(selectedQuiz.id)}
          onBack={() => setView('catalog')}
          onStartQuiz={handleInitiateQuiz}
          onBookmarkToggle={handleBookmarkToggle}
        />
      )}

      {view === 'results' && selectedQuiz && lastSubmission && (
        <QuizResultsView
          quiz={selectedQuiz}
          submission={lastSubmission}
          leaderboard={lastLeaderboard}
          onRetake={() => handleInitiateQuiz(selectedQuiz)}
          onBackToHub={() => setView('catalog')}
        />
      )}

      {view === 'catalog' && (
        <>
          {/* Hero Section with Search & Top Filters */}
          <Hero
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
            selectedEntryFee={selectedEntryFee}
            onEntryFeeChange={setSelectedEntryFee}
            onClearFilters={handleClearAllFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* Two-Column Explorer Layout (Matching approved InternAtlas screenshot) */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Sidebar Filters (3 cols) */}
              <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24">
                <SidebarFilters
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  selectedDifficulty={selectedDifficulty}
                  onDifficultyChange={setSelectedDifficulty}
                  selectedStatus={selectedStatus}
                  onStatusChange={setSelectedStatus}
                  selectedEntryFee={selectedEntryFee}
                  onEntryFeeChange={setSelectedEntryFee}
                  onClearAll={handleClearAllFilters}
                />
              </div>

              {/* Right Column: Cards Grid Header & Results (9 cols) */}
              <div className="lg:col-span-9 space-y-6 text-left">
                {/* Header bar above cards */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#DDE2F0]">
                  <div>
                    <h2 className="text-base font-extrabold text-[#0B1E4A] tracking-[-0.035em]">
                      Showing {filteredQuizzes.length} assessments
                    </h2>
                    <p className="text-xs text-[#5B6487]">
                      Curated challenges tailored for university placements &amp; tech fellowships
                    </p>
                  </div>

                  {/* Sort By Dropdown */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#7C849E] font-medium">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-1.5 bg-white border border-[#DDE2F0] rounded-full text-xs font-bold text-[#0B1E4A] focus:outline-none focus:ring-2 focus:ring-[#2E58D7]/30 cursor-pointer"
                    >
                      <option value="latest">Latest</option>
                      <option value="participants">Most Popular</option>
                      <option value="duration">Fastest First</option>
                    </select>
                  </div>
                </div>

                {/* Cards Grid (3 Columns like in approved screenshot) */}
                {filteredQuizzes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredQuizzes.map(quiz => (
                      <QuizCard
                        key={quiz.id}
                        quiz={quiz}
                        onSelect={handleOpenDetails}
                        onBookmarkToggle={handleBookmarkToggle}
                      />
                    ))}
                  </div>
                ) : (
                  /* Approved Empty State Layout (Matching reference screenshot) */
                  <div className="bg-white rounded-2xl border border-[#DDE2F0] p-12 text-center max-w-md mx-auto shadow-[0_4px_18px_rgba(11,30,74,0.06)] space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#E7EDFF] text-[#2E58D7] flex items-center justify-center mx-auto">
                      <SlidersHorizontal className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-[#0B1E4A]">No quizzes found</h3>
                      <p className="text-xs text-[#5B6487] mt-1">
                        Try changing your search or filter criteria to find more quizzes.
                      </p>
                    </div>
                    <button
                      onClick={handleClearAllFilters}
                      className="px-5 py-2 bg-[#2E58D7] text-white text-xs font-bold rounded-full hover:bg-[#1C3FA8] transition shadow-xs cursor-pointer"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>

            </div>
          </main>

          {/* 3. Deep Navy Footer (Conforming strictly to Section 11 of design spec) */}
          <footer className="bg-[#091838] text-white border-t border-[#0B1E4A] py-12 mt-20 text-left">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
              
              <div className="space-y-3 md:col-span-2">
                <span className="text-2xl font-black text-white tracking-[-0.035em]">
                  InternAtlas<span className="text-[#00CBE8]">.</span>
                </span>
                <p className="text-xs text-[#DDE2F0] max-w-sm leading-relaxed">
                  The unified career launchpad for students. Discover internships, fresher jobs, national hackathons, and skill assessments.
                </p>
                <p className="text-[11px] text-[#7AD9E8]">
                  Design specification: Deep Navy • Soft Lavender • White Surfaces
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                  Platforms &amp; Portals
                </h4>
                <ul className="space-y-2 text-xs text-[#DDE2F0]">
                  <li><a href="#internships" className="hover:text-[#7AD9E8] transition">Internship Portal</a></li>
                  <li><a href="#quizzes" className="hover:text-[#7AD9E8] transition">Skill Quizzes &amp; Tests</a></li>
                  <li><a href="#competitions" className="hover:text-[#7AD9E8] transition">National Competitions</a></li>
                  <li><a href="#events" className="hover:text-[#7AD9E8] transition">College Festivals &amp; Fests</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                  For Recruiters &amp; Colleges
                </h4>
                <ul className="space-y-2 text-xs text-[#DDE2F0]">
                  <li><button onClick={() => setIsCreateModalOpen(true)} className="hover:text-[#7AD9E8] transition cursor-pointer">Host an Assessment</button></li>
                  <li><a href="#employers" className="hover:text-[#7AD9E8] transition">Post an Internship</a></li>
                  <li><a href="#campus" className="hover:text-[#7AD9E8] transition">Campus Partnership</a></li>
                  <li><a href="#contact" className="hover:text-[#7AD9E8] transition">Support &amp; Contact</a></li>
                </ul>
              </div>

            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#DDE2F0] gap-2">
              <p>© 2026 InternAtlas Technologies Inc. All rights reserved.</p>
              <div className="flex items-center gap-4 text-[#7AD9E8]">
                <span>Terms of Service</span>
                <span>Privacy Policy</span>
                <span>Honor Code</span>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Pre-Assessment Instructions Modal */}
      <QuizInstructionsModal
        isOpen={showInstructionsModal}
        quiz={selectedQuiz}
        onClose={() => setShowInstructionsModal(false)}
        onConfirmStart={handleConfirmStartQuiz}
      />

      {/* Create / Host Quiz Modal */}
      <CreateQuizModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onQuizCreated={handleQuizCreated}
      />
    </div>
  );
}

export default App;
