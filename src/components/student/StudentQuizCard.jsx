export default function StudentQuizCard({ quiz, onStart }) {
  const averageTime = quiz.timeLimit ?? quiz.defaultQuestionTime ?? 30

  return (
    <article className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-100">{quiz.title}</h3>
      <p className="mt-1 min-h-10 text-sm text-gray-400">{quiz.description || 'No description'}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-300">
          {quiz.questions.length} questions
        </span>
        <span className="rounded-full bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300">
          {averageTime}s per question
        </span>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
      >
        Start Quiz
      </button>
    </article>
  )
}
