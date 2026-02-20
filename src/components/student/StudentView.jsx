import { useStudentQuizFlow } from '../hooks/useStudentQuizFlow'
import StudentQuizCard from './StudentQuizCard'
import QuizTaker from './QuizTaker'
import ResultView from './ResultView'

export default function StudentView({ quizzes }) {
  const {
    selectedQuiz,
    quizResult,
    startQuiz,
    finishQuiz,
    retryQuiz,
    returnToList,
  } = useStudentQuizFlow()

  if (selectedQuiz && quizResult) {
    return (
      <ResultView
        quiz={selectedQuiz}
        result={quizResult}
        onRetry={retryQuiz}
        onHome={returnToList}
      />
    )
  }

  if (selectedQuiz) {
    return (
      <QuizTaker
        quiz={selectedQuiz}
        onFinish={finishQuiz}
        onBack={returnToList}
      />
    )
  }

  return (
    <section className="mx-auto max-w-5xl rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Student Quiz Portal</h2>
        <p className="mt-1 text-sm text-gray-400">Select a quiz and start answering.</p>
      </div>

      {quizzes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900 p-10 text-center">
          <p className="text-sm text-gray-400">No quizzes available right now.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {quizzes.map((quiz) => (
            <StudentQuizCard
              key={quiz.id}
              quiz={quiz}
              onStart={() => startQuiz(quiz)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
