import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuizFilters } from './components/QuizFilters';
import { QuizCard } from './components/QuizCard';
import { LiveQuizArena } from './components/LiveQuizArena';
import { QuizResultsView } from './components/QuizResultsView';
import { QuizDetailsModal } from './components/QuizDetailsModal';
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
import { CheckCircle } from 'lucide-react';

export function App() {
  const [view, setView] = useState<'catalog' | 'arena' | 'results'>('catalog');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [selectedQuizForDetails, setSelectedQuizForDetails] = useState<Quiz | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Result state
  const [lastSubmission, setLastSubmission] = useState<QuizSubmission | null>(null);
  const [lastLeaderboard, setLastLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>('all');
  const [selectedStatus, setSelectedStatus] = useState<QuizStatus | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty | 'all'>('all');

  // Load quizzes on mount
  useEffect(() => {
    const list = quizService.getQuizzes();
    setQuizzes(list);
  }, []);

  const stats = quizService.getUserStats();

  // Filtered Quizzes
  const filteredQuizzes = quizzes.filter(quiz => {
    // Search match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = quiz.title.toLowerCase().includes(q);
      const matchesDesc = quiz.description.toLowerCase().includes(q);
      const matchesTags = quiz.tags.some(t => t.toLowerCase().includes(q));
      const matchesCompany = quiz.company?.name.toLowerCase().includes(q);
      if (!matchesTitle && !matchesDesc && !matchesTags && !matchesCompany) {
        return false;
      }
    }

    // Category match
    if (selectedCategory !== 'all' && quiz.category !== selectedCategory) {
      return false;
    }

    // Status match
    if (selectedStatus !== 'all' && quiz.status !== selectedStatus) {
      return false;
    }

    // Difficulty match
    if (selectedDifficulty !== 'all' && quiz.difficulty !== selectedDifficulty) {
      return false;
    }

    return true;
  });

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setSelectedQuizForDetails(null);
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
    // Refresh quizzes list in case participants count changed
    setQuizzes(quizService.getQuizzes());
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizCreated = (newQuiz: Quiz) => {
    quizService.saveQuiz(newQuiz);
    setQuizzes(quizService.getQuizzes());
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
      {/* View: Live Test Arena */}
      {view === 'arena' && selectedQuiz && (
        <LiveQuizArena
          quiz={selectedQuiz}
          onExit={() => setView('catalog')}
          onSubmit={handleSubmitQuiz}
        />
      )}

      {/* View: Quiz Results & Leaderboard */}
      {view === 'results' && selectedQuiz && lastSubmission && (
        <QuizResultsView
          quiz={selectedQuiz}
          submission={lastSubmission}
          leaderboard={lastLeaderboard}
          onRetake={() => handleStartQuiz(selectedQuiz)}
          onBackToHub={() => setView('catalog')}
        />
      )}

      {/* View: Catalog / Discovery Hub */}
      {view === 'catalog' && (
        <>
          <Navbar
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            onHomeClick={() => setView('catalog')}
            userCompletedCount={stats.totalCompleted}
          />

          <Hero
            totalQuizzesCount={quizzes.length}
            onQuickStart={() => {
              const fullstackQuiz = quizzes.find(q => q.category === 'fullstack') || quizzes[0];
              if (fullstackQuiz) handleStartQuiz(fullstackQuiz);
            }}
          />

          <QuizFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
          />

          {/* Main Quiz Cards Grid Section */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Available Assessments
                </h2>
                <p className="text-xs text-slate-500">
                  Showing {filteredQuizzes.length} challenges matching your filters
                </p>
              </div>

              {/* Verified Partner Badge */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Standardized for InternAtlas Profiles</span>
              </div>
            </div>

            {/* Cards Grid */}
            {filteredQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuizzes.map(quiz => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    onSelect={q => setSelectedQuizForDetails(q)}
                    onStart={handleStartQuiz}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-sm">
                <p className="text-slate-400 font-bold text-lg mb-2">No Quizzes Found</p>
                <p className="text-xs text-slate-500 mb-6">
                  No assessments match your current search and filter settings.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedStatus('all');
                    setSelectedDifficulty('all');
                  }}
                  className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-xl hover:bg-indigo-100 transition"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-slate-200 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900">Intern<span className="text-indigo-600">Atlas</span></span>
                <span>• Quizzes & Assessment Engine MVP</span>
              </div>
              <p>Built with React, TypeScript & Tailwind CSS for InternAtlas.in</p>
            </div>
          </footer>
        </>
      )}

      {/* Quiz Details Modal */}
      <QuizDetailsModal
        quiz={selectedQuizForDetails}
        onClose={() => setSelectedQuizForDetails(null)}
        onStart={handleStartQuiz}
      />

      {/* Create Quiz Modal */}
      <CreateQuizModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onQuizCreated={handleQuizCreated}
      />
    </div>
  );
}

export default App;
