export type QuizCategory = 
  | 'all'
  | 'fullstack'
  | 'dsa'
  | 'frontend'
  | 'backend'
  | 'aptitude'
  | 'aiml';

export type QuizDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type QuizStatus = 'live' | 'upcoming' | 'practice';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  codeSnippet?: string;
  codeLanguage?: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
  marks: number;
}

export interface QuizRound {
  roundNumber: number;
  title: string;
  type: 'Online Quiz' | 'Coding Assessment' | 'Interview Round';
  duration: string;
  questionsCount?: number;
  description: string;
  status: 'Open' | 'Upcoming' | 'Completed';
}

export interface QuizReward {
  prizePool?: string;
  firstPrize?: string;
  secondPrize?: string;
  thirdPrize?: string;
  certificate: boolean;
  badge?: string;
  fastTrackInterview?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  durationMinutes: number;
  totalMarks: number;
  reward: QuizReward;
  status: QuizStatus;
  participantsCount: number;
  bannerUrl: string;
  company: {
    name: string;
    logoText?: string;
    verified: boolean;
    location?: string;
  };
  entryFee: string; // 'Free' or '₹99'
  schedule: string; // '15 - 20 Sep 2026'
  registrationDeadline: string;
  eligibility: string;
  rules: string[];
  rounds: QuizRound[];
  tags: string[];
  questions: Question[];
  isBookmarked?: boolean;
}

export interface QuizSubmission {
  quizId: string;
  userId: string;
  userName: string;
  answers: Record<string, string>;
  score: number;
  totalPossibleScore: number;
  accuracy: number;
  timeTakenSeconds: number;
  submittedAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  avatar: string;
  college: string;
  score: number;
  accuracy: number;
  timeTaken: string;
  isCurrentUser?: boolean;
}
