import type { Quiz } from '../types/quiz';

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-fullstack-2026',
    title: 'Full Stack Engineering Hiring Sprint 2026',
    description: 'Comprehensive hiring evaluation for high-growth tech companies covering React 19, Node.js concurrency, PostgreSQL transaction isolation, and RESTful system architecture.',
    category: 'fullstack',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    totalMarks: 50,
    bannerUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    reward: {
      prizePool: '₹35,000 Cash Pool',
      firstPrize: '₹20,000 + Direct Interview',
      secondPrize: '₹10,000 + Certificate',
      thirdPrize: '₹5,000 + Swag Kit',
      certificate: true,
      badge: 'InternAtlas Full Stack Fellow',
      fastTrackInterview: true
    },
    status: 'live',
    entryFee: 'Free',
    schedule: '15 - 20 Sep 2026',
    registrationDeadline: '20 Sep 2026, 11:59 PM',
    eligibility: 'Open to all Engineering & CS Students (Graduation: 2025, 2026, 2027)',
    rules: [
      'The assessment is timed (15 minutes). Once started, the timer cannot be paused.',
      'Single-choice questions covering full stack fundamentals with immediate evaluation.',
      'No negative marking is applied for incorrect attempts in Round 1.',
      'Top 10% performers on the national leaderboard qualify for Round 2 Technical Interviews.'
    ],
    rounds: [
      {
        roundNumber: 1,
        title: 'Preliminary Technical Screening Quiz',
        type: 'Online Quiz',
        duration: '15 Mins',
        questionsCount: 5,
        description: 'Timed MCQs testing JavaScript event loop, React 19 useTransition, SQL transactions, and HTTP status codes.',
        status: 'Open'
      },
      {
        roundNumber: 2,
        title: 'Full Stack Architecture & API Coding Round',
        type: 'Coding Assessment',
        duration: '90 Mins',
        description: 'Take-home mini full stack feature build with automated unit test verification.',
        status: 'Upcoming'
      },
      {
        roundNumber: 3,
        title: 'Partner Company Technical Interview',
        type: 'Interview Round',
        duration: '45 Mins',
        description: '1-on-1 discussion with engineering leads from participating tech hiring partners.',
        status: 'Upcoming'
      }
    ],
    participantsCount: 1420,
    company: {
      name: 'AtlasTech Labs',
      logoText: 'AT',
      verified: true,
      location: 'Bengaluru / Remote'
    },
    tags: ['React', 'Node.js', 'PostgreSQL', 'System Design', 'Hiring'],
    questions: [
      {
        id: 'q1',
        text: 'In Node.js event loop architecture, during which phase are process.nextTick() callbacks executed?',
        codeSnippet: `process.nextTick(() => console.log('Tick'));
Promise.resolve().then(() => console.log('Promise'));
setTimeout(() => console.log('Timeout'), 0);`,
        codeLanguage: 'javascript',
        options: [
          { id: 'opt1', text: 'Immediately after the current operation finishes, before the event loop continues to next phase' },
          { id: 'opt2', text: 'During the Poll phase alongside I/O callbacks' },
          { id: 'opt3', text: 'During the Timers phase together with setTimeout callbacks' },
          { id: 'opt4', text: 'In the Close Callbacks phase at the very end of the loop cycle' }
        ],
        correctOptionId: 'opt1',
        explanation: 'process.nextTick() is technically not part of the event loop. The nextTickQueue is processed immediately after the current operation completes, regardless of the current phase of the event loop.',
        marks: 10
      },
      {
        id: 'q2',
        text: 'What issue occurs when multiple concurrent transactions read and write to the same row in PostgreSQL under the "Read Committed" isolation level?',
        options: [
          { id: 'opt1', text: 'Dirty Reads (reading uncommitted changes from another transaction)' },
          { id: 'opt2', text: 'Non-repeatable reads and phantom rows can occur between queries in the same transaction' },
          { id: 'opt3', text: 'Automatic table-level locking causing total database freeze' },
          { id: 'opt4', text: 'Serialization failure error is always thrown immediately' }
        ],
        correctOptionId: 'opt2',
        explanation: 'In Read Committed isolation level, each query in a transaction sees a snapshot of data committed before that query began. Thus, a subsequent SELECT within the same transaction can return newly committed changes (non-repeatable read).',
        marks: 10
      },
      {
        id: 'q3',
        text: 'In React 19 / Modern React, what is the primary purpose of the useTransition hook?',
        codeSnippet: `const [isPending, startTransition] = useTransition();

function handleSearch(query) {
  startTransition(() => {
    setFilter(query);
  });
}`,
        codeLanguage: 'typescript',
        options: [
          { id: 'opt1', text: 'To mark UI state updates as non-blocking transitions so urgent inputs remain responsive' },
          { id: 'opt2', text: 'To perform CSS animations smoothly using Web Animations API' },
          { id: 'opt3', text: 'To replace useEffect for fetching asynchronous data in server components' },
          { id: 'opt4', text: 'To cache the return value of expensive computation across re-renders' }
        ],
        correctOptionId: 'opt1',
        explanation: 'useTransition lets you mark state updates as non-urgent transitions. While the transition is rendering, user interactions like typing or clicking remain responsive without freezing the browser thread.',
        marks: 10
      },
      {
        id: 'q4',
        text: 'Which HTTP status code is most appropriate when an authenticated client requests a resource they do not have sufficient authorization privileges to access?',
        options: [
          { id: 'opt1', text: '401 Unauthorized' },
          { id: 'opt2', text: '403 Forbidden' },
          { id: 'opt3', text: '400 Bad Request' },
          { id: 'opt4', text: '404 Not Found' }
        ],
        correctOptionId: 'opt2',
        explanation: '401 Unauthorized indicates authentication is missing or invalid. 403 Forbidden indicates the user is authenticated, but their credentials do not grant permission to access the requested resource.',
        marks: 10
      },
      {
        id: 'q5',
        text: 'What will be the output of the following JavaScript code snippet?',
        codeSnippet: `const obj = {
  count: 10,
  getCount: () => {
    return this.count;
  },
  getRegularCount() {
    return this.count;
  }
};

console.log(obj.getCount(), obj.getRegularCount());`,
        codeLanguage: 'javascript',
        options: [
          { id: 'opt1', text: '10 10' },
          { id: 'opt2', text: 'undefined 10' },
          { id: 'opt3', text: 'undefined undefined' },
          { id: 'opt4', text: 'TypeError: Cannot read property count of undefined' }
        ],
        correctOptionId: 'opt2',
        explanation: 'Arrow functions do not bind their own this; they capture this from the enclosing lexical scope (in this case, the module/window scope where count is undefined). Standard methods bind this to obj.',
        marks: 10
      }
    ]
  },
  {
    id: 'quiz-dsa-sprint',
    title: 'DSA & Algorithmic Problem Solving National Sprint',
    description: 'Battle-tested challenge on dynamic programming, graph traversal (Dijkstra, BFS), AVL tree balancing, and amortized complexity bounds.',
    category: 'dsa',
    difficulty: 'Advanced',
    durationMinutes: 20,
    totalMarks: 40,
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    reward: {
      prizePool: '₹50,000 Cash Pool',
      firstPrize: '₹30,000 Cash Prize',
      secondPrize: '₹15,000 Cash Prize',
      thirdPrize: '₹5,000 Cash Prize',
      certificate: true,
      badge: 'DSA National Master'
    },
    status: 'live',
    entryFee: 'Free',
    schedule: '16 - 24 Sep 2026',
    registrationDeadline: '24 Sep 2026, 06:00 PM',
    eligibility: 'Open to All College Students Across India',
    rules: [
      'Strict 20-minute timed quiz format with immediate automated scoring.',
      'Algorithm analysis and complexity questions curated by competitive programmers.',
      'National leaderboard ranks determined by highest marks followed by least time taken.'
    ],
    rounds: [
      {
        roundNumber: 1,
        title: 'Core DSA Conceptual Assessment',
        type: 'Online Quiz',
        duration: '20 Mins',
        questionsCount: 4,
        description: 'High-speed problem analysis focusing on algorithmic paradigms and asymptotic complexity.',
        status: 'Open'
      },
      {
        roundNumber: 2,
        title: 'Live Competitive Coding Sprint',
        type: 'Coding Assessment',
        duration: '120 Mins',
        description: 'Solve 3 hard algorithmic problems on arrays, graphs, and dynamic programming.',
        status: 'Upcoming'
      }
    ],
    participantsCount: 2840,
    company: {
      name: 'CodeCraft India',
      logoText: 'CC',
      verified: true,
      location: 'Hyderabad / Online'
    },
    tags: ['Algorithms', 'Dynamic Programming', 'Graph Theory', 'Trees'],
    questions: [
      {
        id: 'qd1',
        text: 'What is the tight worst-case time complexity of searching for an element in an unbalanced Binary Search Tree versus an AVL Tree with N elements?',
        options: [
          { id: 'opt1', text: 'Unbalanced BST: O(N), AVL Tree: O(log N)' },
          { id: 'opt2', text: 'Unbalanced BST: O(log N), AVL Tree: O(1)' },
          { id: 'opt3', text: 'Unbalanced BST: O(N log N), AVL Tree: O(log N)' },
          { id: 'opt4', text: 'Both have worst-case O(N)' }
        ],
        correctOptionId: 'opt1',
        explanation: 'An unbalanced BST can degenerate into a linked list giving O(N) search. An AVL tree is self-balancing with strict height invariant guaranteeing O(log N).',
        marks: 10
      },
      {
        id: 'qd2',
        text: 'In Dijkstra algorithm for single-source shortest paths on a graph with V vertices and E edges implemented using a Min-Heap (priority queue), what is the optimal time complexity?',
        options: [
          { id: 'opt1', text: 'O(V^2)' },
          { id: 'opt2', text: 'O((V + E) log V)' },
          { id: 'opt3', text: 'O(V * E)' },
          { id: 'opt4', text: 'O(E log E + V)' }
        ],
        correctOptionId: 'opt2',
        explanation: 'With a binary heap, each vertex extraction takes O(log V) and edge relaxation updates take O(E log V), yielding O((V + E) log V).',
        marks: 10
      },
      {
        id: 'qd3',
        text: 'Which algorithmic paradigm is most appropriate to solve the 0/1 Knapsack Problem with integer weights optimally?',
        options: [
          { id: 'opt1', text: 'Greedy approach sorting by value-to-weight ratio' },
          { id: 'opt2', text: 'Dynamic Programming / Memoization' },
          { id: 'opt3', text: 'Divide and Conquer with linear merge' },
          { id: 'opt4', text: 'Pure Breadth-First Search without pruning' }
        ],
        correctOptionId: 'opt2',
        explanation: 'The 0/1 Knapsack problem exhibits optimal substructure and overlapping subproblems, solved in O(N * W) time using 2D or 1D Dynamic Programming.',
        marks: 10
      },
      {
        id: 'qd4',
        text: 'What data structure is utilized internally to efficiently detect cycles in an undirected graph using the Disjoint Set Union (DSU) / Union-Find method?',
        options: [
          { id: 'opt1', text: 'Parent array with path compression and rank optimization' },
          { id: 'opt2', text: 'Breadth-first double-ended queue' },
          { id: 'opt3', text: 'Red-black self balancing tree' },
          { id: 'opt4', text: 'Trie with bitwise prefix matching' }
        ],
        correctOptionId: 'opt1',
        explanation: 'DSU uses a parent array representation with Path Compression and Union by Rank to achieve nearly amortized O(α(N)) nearly constant time operations.',
        marks: 10
      }
    ]
  },
  {
    id: 'quiz-aptitude-campus',
    title: 'Tier-1 Campus Placement Aptitude Assessment',
    description: 'Prepare for tier-1 company selection tests (TCS Digital, Infosys SP, Google, Amazon campus drives) covering Quantitative, Logical Reasoning, and Data Interpretation.',
    category: 'aptitude',
    difficulty: 'Beginner',
    durationMinutes: 10,
    totalMarks: 30,
    bannerUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    reward: {
      prizePool: '₹15,000 Cash Pool',
      firstPrize: '₹10,000 Cash',
      secondPrize: '₹5,000 Cash',
      certificate: true,
      badge: 'Logic Ace Medal'
    },
    status: 'live',
    entryFee: 'Free',
    schedule: '15 - 28 Sep 2026',
    registrationDeadline: '28 Sep 2026, 11:59 PM',
    eligibility: 'All Engineering, BCA, BSc, and MCA Graduates',
    rules: [
      '10-minute sprint test covering quantitative arithmetic, coding-decoding, and work-rate calculations.',
      'Instant verified score report formatted for placement cell verification.'
    ],
    rounds: [
      {
        roundNumber: 1,
        title: 'General Aptitude & Reasoning Sprint',
        type: 'Online Quiz',
        duration: '10 Mins',
        questionsCount: 3,
        description: 'Timed quantitative aptitude and logical deduction test.',
        status: 'Open'
      }
    ],
    participantsCount: 4190,
    company: {
      name: 'InternAtlas Placement Cell',
      logoText: 'IA',
      verified: true,
      location: 'Pan-India / Virtual'
    },
    tags: ['Aptitude', 'Reasoning', 'Campus Prep', 'Math'],
    questions: [
      {
        id: 'qa1',
        text: 'A train 240 m in length crosses a telegraph post in 16 seconds. What is the speed of the train in km/hr?',
        options: [
          { id: 'opt1', text: '54 km/hr' },
          { id: 'opt2', text: '60 km/hr' },
          { id: 'opt3', text: '48 km/hr' },
          { id: 'opt4', text: '72 km/hr' }
        ],
        correctOptionId: 'opt1',
        explanation: 'Speed = Distance / Time = 240 / 16 = 15 m/s. Convert to km/hr: 15 * (18 / 5) = 54 km/hr.',
        marks: 10
      },
      {
        id: 'qa2',
        text: 'If in a certain code language, "COMPUTER" is written as "RFUVQNPC", how will "MEDICINE" be written in that code?',
        options: [
          { id: 'opt1', text: 'EOJDJEFM' },
          { id: 'opt2', text: 'EOJDEJFM' },
          { id: 'opt3', text: 'MFEJDJOE' },
          { id: 'opt4', text: 'EOJDJFEM' }
        ],
        correctOptionId: 'opt1',
        explanation: 'The first and last letters swap positions (M <-> E). The middle letters are each shifted by +1 and reversed in order, giving EOJDJEFM.',
        marks: 10
      },
      {
        id: 'qa3',
        text: 'Two pipes A and B can fill a tank in 20 minutes and 30 minutes respectively. If both pipes are opened together, how long will it take to fill the tank?',
        options: [
          { id: 'opt1', text: '12 minutes' },
          { id: 'opt2', text: '15 minutes' },
          { id: 'opt3', text: '25 minutes' },
          { id: 'opt4', text: '10 minutes' }
        ],
        correctOptionId: 'opt1',
        explanation: 'Work rate = (1/20) + (1/30) = (3 + 2)/60 = 5/60 = 1/12. Hence the tank fills in exactly 12 minutes.',
        marks: 10
      }
    ]
  },
  {
    id: 'quiz-react-mastery',
    title: 'Modern Frontend & React 19 Architecture Challenge',
    description: 'Master Core Web Vitals (CLS, INP, LCP), hydration mismatch prevention, React Server Actions, and performant state orchestration.',
    category: 'frontend',
    difficulty: 'Intermediate',
    durationMinutes: 12,
    totalMarks: 30,
    bannerUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    reward: {
      prizePool: '₹20,000 Bounty',
      firstPrize: '₹15,000 Cash',
      secondPrize: '₹5,000 Cash',
      certificate: true,
      badge: 'React Artisan'
    },
    status: 'practice',
    entryFee: 'Free',
    schedule: 'Self-Paced Practice',
    registrationDeadline: 'Open Forever',
    eligibility: 'Frontend engineers and React developers looking to level up.',
    rules: [
      'Self-paced assessment with detailed answer explanations.',
      'Test your understanding of modern React 19 hooks and web vitals.'
    ],
    rounds: [
      {
        roundNumber: 1,
        title: 'React 19 & Web Architecture Quiz',
        type: 'Online Quiz',
        duration: '12 Mins',
        questionsCount: 3,
        description: 'MCQs on React 19 features, Server Components, and Web Vitals.',
        status: 'Open'
      }
    ],
    participantsCount: 980,
    company: {
      name: 'Veloce UI Studio',
      logoText: 'VU',
      verified: true,
      location: 'Pune / Remote'
    },
    tags: ['React 19', 'Next.js', 'Core Web Vitals', 'Hooks'],
    questions: [
      {
        id: 'qr1',
        text: "What causes the common Next.js / React \"Hydration failed because the server-rendered HTML didn't match the client\" error?",
        options: [
          { id: 'opt1', text: 'Using Date.now() or window.localStorage directly in initial render body causing server/client markup differences' },
          { id: 'opt2', text: 'Forgetting to export default from your page component' },
          { id: 'opt3', text: 'Having CSS modules imported inside a layout component' },
          { id: 'opt4', text: 'Using Tailwind CSS classes with dynamic string interpolation' }
        ],
        correctOptionId: 'opt1',
        explanation: 'Hydration fails when the initial DOM tree generated by server SSR differs from what React renders on the client (e.g. non-deterministic timestamps, browser-only window objects).',
        marks: 10
      },
      {
        id: 'qr2',
        text: 'Which Core Web Vital measures the visual stability of a page during load?',
        options: [
          { id: 'opt1', text: 'CLS (Cumulative Layout Shift)' },
          { id: 'opt2', text: 'LCP (Largest Contentful Paint)' },
          { id: 'opt3', text: 'INP (Interaction to Next Paint)' },
          { id: 'opt4', text: 'FID (First Input Delay)' }
        ],
        correctOptionId: 'opt1',
        explanation: 'Cumulative Layout Shift (CLS) measures unexpected layout shifts that happen during the life of a web page.',
        marks: 10
      },
      {
        id: 'qr3',
        text: 'In React 19, what hook replaces the need to pass callback setters through multiple layers to read form pending status in children?',
        options: [
          { id: 'opt1', text: 'useFormStatus' },
          { id: 'opt2', text: 'useActionState' },
          { id: 'opt3', text: 'useOptimistic' },
          { id: 'opt4', text: 'useRef' }
        ],
        correctOptionId: 'opt1',
        explanation: 'useFormStatus gives status information of the parent <form> without requiring props to be drilled down to child submit buttons.',
        marks: 10
      }
    ]
  },
  {
    id: 'quiz-ai-gen',
    title: 'GenAI, LLMs & Retrieval Augmented Generation (RAG) Challenge',
    description: 'Explore the frontiers of modern AI: Vector databases, chunk overlap optimization, cross-encoder rerankers, cosine similarity, and hallucination reduction.',
    category: 'aiml',
    difficulty: 'Advanced',
    durationMinutes: 15,
    totalMarks: 30,
    bannerUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    reward: {
      prizePool: '₹40,000 Bounty',
      firstPrize: '₹25,000 + AI Internship',
      secondPrize: '₹15,000 + Certificate',
      certificate: true,
      badge: 'AI Pioneer',
      fastTrackInterview: true
    },
    status: 'upcoming',
    entryFee: 'Free',
    schedule: '25 Sep - 02 Oct 2026',
    registrationDeadline: '24 Sep 2026, 11:59 PM',
    eligibility: 'Engineers & Data Science enthusiasts passionate about LLM systems.',
    rules: [
      'Registration required prior to the live challenge window opening on 25 September.',
      'Comprehensive MCQ assessment covering vector search and LLM system architecture.'
    ],
    rounds: [
      {
        roundNumber: 1,
        title: 'Generative AI & RAG Theory Assessment',
        type: 'Online Quiz',
        duration: '15 Mins',
        questionsCount: 3,
        description: 'Evaluate technical mastery of embeddings, reranking, and semantic retrieval pipelines.',
        status: 'Upcoming'
      },
      {
        roundNumber: 2,
        title: 'RAG Pipeline Implementation Hack',
        type: 'Coding Assessment',
        duration: '48 Hours',
        description: 'Build an end-to-end question-answering system using vector search and an open-weights LLM.',
        status: 'Upcoming'
      }
    ],
    participantsCount: 1650,
    company: {
      name: 'Neurolink Systems',
      logoText: 'NS',
      verified: true,
      location: 'Noida / Remote'
    },
    tags: ['LLMs', 'RAG', 'Vector DB', 'Embeddings', 'AI'],
    questions: [
      {
        id: 'qai1',
        text: 'In RAG pipelines, what is "chunk overlap" primarily used for?',
        options: [
          { id: 'opt1', text: 'To maintain semantic context between adjacent text boundaries so sentences are not truncated awkwardly' },
          { id: 'opt2', text: 'To decrease the storage size of vector databases' },
          { id: 'opt3', text: 'To automatically translate non-English documents into English tokens' },
          { id: 'opt4', text: 'To fine-tune transformer weights with backpropagation' }
        ],
        correctOptionId: 'opt1',
        explanation: 'Chunk overlap preserves semantic context across split boundaries so that concepts spanning across two chunks are not lost during vector similarity retrieval.',
        marks: 10
      },
      {
        id: 'qai2',
        text: 'Which metric measures the angle between two embedding vectors regardless of their magnitude?',
        options: [
          { id: 'opt1', text: 'Cosine Similarity' },
          { id: 'opt2', text: 'Euclidean Distance (L2)' },
          { id: 'opt3', text: 'Manhattan Distance (L1)' },
          { id: 'opt4', text: 'Hamming Distance' }
        ],
        correctOptionId: 'opt1',
        explanation: 'Cosine similarity measures the cosine of the angle between two vectors, ranging from -1 to 1, focusing on orientation rather than length.',
        marks: 10
      },
      {
        id: 'qai3',
        text: 'What is the primary role of a "Reranker" model placed after vector database retrieval?',
        options: [
          { id: 'opt1', text: 'To score retrieved documents with a cross-encoder for higher semantic relevance before feeding to the LLM' },
          { id: 'opt2', text: 'To compress token length by removing stopwords' },
          { id: 'opt3', text: 'To convert text into binary images' },
          { id: 'opt4', text: 'To encrypt sensitive user information' }
        ],
        correctOptionId: 'opt1',
        explanation: 'Bi-encoder vector search is fast but approximate. A cross-encoder reranker scores the top-K retrieved candidates with higher accuracy before prompting the generator.',
        marks: 10
      }
    ]
  }
];

export const MOCK_LEADERBOARD = [
  {
    rank: 1,
    userId: 'u-1',
    userName: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
    college: 'IIT Bombay',
    score: 50,
    accuracy: 100,
    timeTaken: '4m 12s'
  },
  {
    rank: 2,
    userId: 'u-2',
    userName: 'Sneha Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    college: 'BITS Pilani',
    score: 50,
    accuracy: 100,
    timeTaken: '5m 05s'
  },
  {
    rank: 3,
    userId: 'u-3',
    userName: 'Rohan Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    college: 'NIT Trichy',
    score: 40,
    accuracy: 80,
    timeTaken: '6m 21s'
  },
  {
    rank: 4,
    userId: 'u-4',
    userName: 'Priya Sundaram',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces',
    college: 'DTU Delhi',
    score: 40,
    accuracy: 80,
    timeTaken: '7m 45s'
  },
  {
    rank: 5,
    userId: 'u-5',
    userName: 'Karan Mehra',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
    college: 'VIT Vellore',
    score: 30,
    accuracy: 60,
    timeTaken: '8m 10s'
  }
];
