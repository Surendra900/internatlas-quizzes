import type { Quiz, QuizSubmission, LeaderboardEntry } from '../types/quiz';
import { INITIAL_QUIZZES, MOCK_LEADERBOARD } from '../data/mockQuizzes';

const QUIZZES_KEY = 'internatlas_quizzes';
const SUBMISSIONS_KEY = 'internatlas_submissions';
const LEADERBOARD_KEY = 'internatlas_leaderboards';

export const quizService = {
  getQuizzes(): Quiz[] {
    const saved = localStorage.getItem(QUIZZES_KEY);
    if (!saved) {
      localStorage.setItem(QUIZZES_KEY, JSON.stringify(INITIAL_QUIZZES));
      return INITIAL_QUIZZES;
    }
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_QUIZZES;
    }
  },

  getQuizById(id: string): Quiz | undefined {
    const quizzes = this.getQuizzes();
    return quizzes.find(q => q.id === id);
  },

  saveQuiz(newQuiz: Quiz): void {
    const quizzes = this.getQuizzes();
    const updated = [newQuiz, ...quizzes];
    localStorage.setItem(QUIZZES_KEY, JSON.stringify(updated));
  },

  submitQuiz(quizId: string, answers: Record<string, string>, timeTakenSeconds: number): {
    submission: QuizSubmission;
    leaderboard: LeaderboardEntry[];
  } {
    const quiz = this.getQuizById(quizId);
    if (!quiz) throw new Error('Quiz not found');

    let score = 0;
    let correctCount = 0;

    quiz.questions.forEach(q => {
      if (answers[q.id] === q.correctOptionId) {
        score += q.marks;
        correctCount += 1;
      }
    });

    const totalPossibleScore = quiz.questions.reduce((acc, q) => acc + q.marks, 0);
    const accuracy = Math.round((correctCount / quiz.questions.length) * 100);

    const submission: QuizSubmission = {
      quizId,
      userId: 'user-surendra',
      userName: 'Surendra G (You)',
      answers,
      score,
      totalPossibleScore,
      accuracy,
      timeTakenSeconds,
      submittedAt: new Date().toISOString(),
    };

    // Save submission
    const existingSubmissionsStr = localStorage.getItem(SUBMISSIONS_KEY);
    const existingSubmissions: QuizSubmission[] = existingSubmissionsStr 
      ? JSON.parse(existingSubmissionsStr) 
      : [];
    existingSubmissions.push(submission);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(existingSubmissions));

    // Update participants count for this quiz
    const quizzes = this.getQuizzes().map(q => {
      if (q.id === quizId) {
        return { ...q, participantsCount: q.participantsCount + 1 };
      }
      return q;
    });
    localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes));

    // Update leaderboard
    const minutes = Math.floor(timeTakenSeconds / 60);
    const seconds = timeTakenSeconds % 60;
    const timeFormatted = `${minutes}m ${seconds.toString().padStart(2, '0')}s`;

    const userEntry: LeaderboardEntry = {
      rank: 1, // will calculate
      userId: 'user-surendra',
      userName: 'Surendra G (You)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
      college: 'InternAtlas Developer Fellow',
      score,
      accuracy,
      timeTaken: timeFormatted,
      isCurrentUser: true,
    };

    let board: LeaderboardEntry[] = [...MOCK_LEADERBOARD];
    // remove existing user entry if present
    board = board.filter(b => b.userId !== 'user-surendra');
    board.push(userEntry);

    // Sort by score desc, then time asc
    board.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.accuracy > b.accuracy ? -1 : 1;
    });

    // Reassign ranks
    board = board.map((entry, idx) => ({
      ...entry,
      rank: idx + 1,
    }));

    localStorage.setItem(`${LEADERBOARD_KEY}_${quizId}`, JSON.stringify(board));

    return {
      submission,
      leaderboard: board
    };
  },

  getLeaderboard(quizId: string): LeaderboardEntry[] {
    const saved = localStorage.getItem(`${LEADERBOARD_KEY}_${quizId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return MOCK_LEADERBOARD;
      }
    }
    return MOCK_LEADERBOARD;
  },

  getUserStats() {
    const saved = localStorage.getItem(SUBMISSIONS_KEY);
    const submissions: QuizSubmission[] = saved ? JSON.parse(saved) : [];
    const totalCompleted = submissions.length;
    const totalScore = submissions.reduce((sum, s) => sum + s.score, 0);
    const avgAccuracy = totalCompleted > 0 
      ? Math.round(submissions.reduce((sum, s) => sum + s.accuracy, 0) / totalCompleted) 
      : 0;

    return {
      totalCompleted,
      totalScore,
      avgAccuracy,
      badges: totalCompleted > 0 ? ['Speed Demon', 'Verified Full Stack Candidate'] : [],
    };
  }
};
