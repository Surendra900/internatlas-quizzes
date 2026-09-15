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

export interface QuizReward {
  prizePool?: string;
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
  company?: {
    name: string;
    logoText?: string;
    verified: boolean;
  };
  startDate?: string;
  endsAt?: string;
  tags: string[];
  questions: Question[];
}

export interface QuizSubmission {
  quizId: string;
  userId: string;
  userName: string;
  answers: Record<string, string>; // questionId -> optionId
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
