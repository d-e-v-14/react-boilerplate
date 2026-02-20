import { getCorrectIndex, getGrade } from '../utils/quizHelper'

export default function ResultView({ quiz, result, onRetry, onHome }) {
  const percentage = result.percentage
  const grade = getGrade(percentage)

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
      <div className="rounded-xl border border-gray-800 bg-gray-950 p-6 text-center">
        <h2 className={`text-2xl font-bold ${grade.color}`}>{grade.label}</h2>
        <p className="mt-2 text-gray-300">
          Score: <span className="font-semibold">{result.score}</span> / {result.total}
        </p>
        <p className="text-sm text-gray-400">{percentage}%</p>
      </div>

      <div className="mt-5 rounded-xl border border-gray-800 bg-gray-950 p-5">
        <h3 className="mb-4 text-lg font-semibold text-gray-100">Answer Review</h3>
        <div className="space-y-3">
          {quiz.questions.map((question, index) => {
            const correctIndex = getCorrectIndex(question)
            const userAnswer = result.answers[question.id]
            const isCorrect = userAnswer === correctIndex
            const isTimedOut = userAnswer === -1

            return (
              <article
                key={question.id}
                className={`rounded-lg border px-4 py-3 ${
                  isCorrect ? 'border-green-700 bg-green-900/20' : 'border-red-800 bg-red-950/30'
                }`}
              >
                <p className="text-sm font-medium text-gray-100">
                  Q{index + 1}. {question.text}
                </p>
                {isTimedOut ? (
                  <p className="mt-1 text-xs text-amber-400">Time ran out</p>
                ) : (
                  <p className="mt-1 text-xs text-gray-300">
                    Your answer: {question.options[userAnswer]}
                  </p>
                )}
                {!isCorrect && (
                  <p className="mt-1 text-xs font-medium text-green-300">
                    Correct answer: {question.options[correctIndex]}
                  </p>
                )}
              </article>
            )
          })}
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="flex-1 rounded-md border border-gray-700 px-4 py-2 text-sm font-semibold text-gray-200 hover:bg-gray-800"
        >
          Retry
        </button>
        <button
          type="button"
          onClick={onHome}
          className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          More Quizzes
        </button>
      </div>
    </section>
  )
}
