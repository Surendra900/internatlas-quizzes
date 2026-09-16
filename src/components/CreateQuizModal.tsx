import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import type { Quiz, QuizCategory, QuizDifficulty } from '../types/quiz';

interface CreateQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuizCreated: (newQuiz: Quiz) => void;
}

export const CreateQuizModal: React.FC<CreateQuizModalProps> = ({
  isOpen,
  onClose,
  onQuizCreated,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<QuizCategory>('fullstack');
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('Intermediate');
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [prizePool, setPrizePool] = useState('₹10,000 Cash Pool');
  const [bannerUrl, setBannerUrl] = useState('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80');
  const [tagsInput, setTagsInput] = useState('React, JavaScript, WebDev');

  const [questionText, setQuestionText] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [correctOpt, setCorrectOpt] = useState('opt1');
  const [explanation, setExplanation] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !questionText.trim()) {
      alert('Please fill out the quiz title and at least one question.');
      return;
    }

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    const newQuiz: Quiz = {
      id: `quiz-custom-${Date.now()}`,
      title,
      description: description || 'Community hosted technical challenge on InternAtlas.',
      category,
      difficulty,
      durationMinutes: Number(durationMinutes),
      totalMarks: 20,
      bannerUrl: bannerUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      reward: {
        prizePool: prizePool || undefined,
        firstPrize: '₹10,000 Cash',
        certificate: true,
        badge: `${title.slice(0, 12)} Achiever`,
        fastTrackInterview: true,
      },
      status: 'live',
      entryFee: 'Free',
      schedule: 'Open Now',
      registrationDeadline: 'Active',
      eligibility: 'Open to All Students',
      rules: [
        'Complete all questions within the allocated time window.',
        'Submit before the timer expires.'
      ],
      rounds: [
        {
          roundNumber: 1,
          title: 'Initial Screening Challenge',
          type: 'Online Quiz',
          duration: `${durationMinutes} Mins`,
          questionsCount: 1,
          description: 'Timed assessment evaluating technical mastery.',
          status: 'Open'
        }
      ],
      participantsCount: 1,
      company: {
        name: 'Community Organizer',
        logoText: 'CO',
        verified: true,
        location: 'Virtual'
      },
      tags: tags.length ? tags : ['FullStack', 'Challenge'],
      questions: [
        {
          id: `q-${Date.now()}-1`,
          text: questionText,
          options: [
            { id: 'opt1', text: opt1 || 'Option A' },
            { id: 'opt2', text: opt2 || 'Option B' },
            { id: 'opt3', text: opt3 || 'Option C' },
            { id: 'opt4', text: opt4 || 'Option D' },
          ],
          correctOptionId: correctOpt,
          explanation: explanation || 'Standard fundamental knowledge.',
          marks: 20,
        }
      ]
    };

    onQuizCreated(newQuiz);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#091838]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#DDE2F0] relative my-8 text-left">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#EFF1F9] text-[#7C849E] hover:text-[#0B1E4A] transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-[#E7EDFF] text-[#2E58D7] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0B1E4A]">Host / Create a Quiz</h3>
        </div>
        <p className="text-xs text-[#5B6487] mb-6">
          Publish a timed assessment for college students or job candidates on InternAtlas.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0B1E4A] mb-1">Quiz Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Next.js 15 & Tailwind Architecture Challenge"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#EFF1F9] border border-[#DDE2F0] rounded-xl text-xs text-[#0B1E4A] focus:outline-none focus:ring-2 focus:ring-[#2E58D7]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B1E4A] mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Brief description of the challenge and topics covered..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#EFF1F9] border border-[#DDE2F0] rounded-xl text-xs text-[#0B1E4A] focus:outline-none focus:ring-2 focus:ring-[#2E58D7]/30"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0B1E4A] mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#EFF1F9] border border-[#DDE2F0] rounded-xl text-xs text-[#0B1E4A] focus:outline-none"
              >
                <option value="fullstack">Full Stack</option>
                <option value="dsa">DSA</option>
                <option value="frontend">Frontend</option>
                <option value="aptitude">Aptitude</option>
                <option value="aiml">AI / ML</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1E4A] mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#EFF1F9] border border-[#DDE2F0] rounded-xl text-xs text-[#0B1E4A] focus:outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1E4A] mb-1">Duration (Mins)</label>
              <input
                type="number"
                min="5"
                max="60"
                value={durationMinutes}
                onChange={e => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#EFF1F9] border border-[#DDE2F0] rounded-xl text-xs text-[#0B1E4A] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0B1E4A] mb-1">Prize Pool</label>
              <input
                type="text"
                placeholder="e.g. ₹15,000 Cash Pool"
                value={prizePool}
                onChange={e => setPrizePool(e.target.value)}
                className="w-full px-3 py-2 bg-[#EFF1F9] border border-[#DDE2F0] rounded-xl text-xs text-[#0B1E4A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1E4A] mb-1">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="React, Nextjs, SQL"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 bg-[#EFF1F9] border border-[#DDE2F0] rounded-xl text-xs text-[#0B1E4A] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B1E4A] mb-1">Banner Image URL</label>
            <input
              type="text"
              placeholder="https://..."
              value={bannerUrl}
              onChange={e => setBannerUrl(e.target.value)}
              className="w-full px-3 py-2 bg-[#EFF1F9] border border-[#DDE2F0] rounded-xl text-xs text-[#0B1E4A] focus:outline-none"
            />
          </div>

          {/* Sample Question Box */}
          <div className="border border-[#DDE2F0] rounded-2xl p-4 bg-[#EFF1F9]/50 space-y-3">
            <h4 className="text-xs font-bold text-[#0B1E4A] uppercase tracking-wider">Sample Question</h4>
            <input
              type="text"
              required
              placeholder="Question Prompt..."
              value={questionText}
              onChange={e => setQuestionText(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#DDE2F0] rounded-lg text-xs text-[#0B1E4A]"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Option A"
                value={opt1}
                onChange={e => setOpt1(e.target.value)}
                className="px-3 py-1.5 bg-white border border-[#DDE2F0] rounded-lg text-xs"
              />
              <input
                type="text"
                placeholder="Option B"
                value={opt2}
                onChange={e => setOpt2(e.target.value)}
                className="px-3 py-1.5 bg-white border border-[#DDE2F0] rounded-lg text-xs"
              />
              <input
                type="text"
                placeholder="Option C"
                value={opt3}
                onChange={e => setOpt3(e.target.value)}
                className="px-3 py-1.5 bg-white border border-[#DDE2F0] rounded-lg text-xs"
              />
              <input
                type="text"
                placeholder="Option D"
                value={opt4}
                onChange={e => setOpt4(e.target.value)}
                className="px-3 py-1.5 bg-white border border-[#DDE2F0] rounded-lg text-xs"
              />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-[#0B1E4A]">Correct Option:</span>
              <select
                value={correctOpt}
                onChange={e => setCorrectOpt(e.target.value)}
                className="px-2.5 py-1 bg-white border border-[#DDE2F0] rounded-md text-xs"
              >
                <option value="opt1">Option A</option>
                <option value="opt2">Option B</option>
                <option value="opt3">Option C</option>
                <option value="opt4">Option D</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Explanation for the correct answer..."
              value={explanation}
              onChange={e => setExplanation(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#DDE2F0] rounded-lg text-xs"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-[#5B6487] hover:text-[#0B1E4A] bg-[#EFF1F9] rounded-full cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#2E58D7] hover:bg-[#1C3FA8] rounded-full shadow-md shadow-[#2E58D7]/20 cursor-pointer"
            >
              Publish Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
