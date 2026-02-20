import { useMemo, useState } from 'react'
import QuizEditor from './QuizEditor'
import TeacherQuizCard from './TeacherQuizCard'
import { INITIAL_QUIZZES } from '../data/initialData'

function normalizeQuizData(quizzes) {
  return quizzes.map((quiz) => ({
    ...quiz,
    defaultQuestionTime: quiz.defaultQuestionTime ?? quiz.timeLimit ?? 30,
    questions: (quiz.questions ?? []).map((question) => ({
      ...question,
      timeLimit: question.timeLimit ?? quiz.timeLimit ?? 30,
      correctIndex: question.correctIndex ?? question.correct ?? 0,
    })),
  }))
}

export default function TeacherDashboard() {
  const [quizzes, setQuizzes] = useState(() => normalizeQuizData(INITIAL_QUIZZES))
  const [view, setView] = useState('list')
  const [editingQuiz, setEditingQuiz] = useState(null)

  const summary = useMemo(() => {
    const totalQuizzes = quizzes.length
    const totalQuestions = quizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0)
    return { totalQuizzes, totalQuestions }
  }, [quizzes])

  function handleCreateNew() {
    setEditingQuiz(null)
    setView('create')
  }

  function handleEditQuiz(quiz) {
    setEditingQuiz(quiz)
    setView('edit')
  }

  function handleDeleteQuiz(quizId) {
    setQuizzes((current) => current.filter((quiz) => quiz.id !== quizId))
  }

  function handleSaveQuiz(savedQuiz) {
    setQuizzes((current) => {
      const existingIndex = current.findIndex((quiz) => quiz.id === savedQuiz.id)
      if (existingIndex === -1) return [savedQuiz, ...current]

      const next = [...current]
      next[existingIndex] = savedQuiz
      return next
    })

    setEditingQuiz(null)
    setView('list')
  }

  function handleCancelEditor() {
    setEditingQuiz(null)
    setView('list')
  }

  if (view === 'create' || view === 'edit') {
    return (
      <QuizEditor
        initialQuiz={editingQuiz}
        onSave={handleSaveQuiz}
        onCancel={handleCancelEditor}
      />
    )
  }

  return (
    <section className="mx-auto max-w-4xl rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200">Create a quiz</h1>
          <p className="mt-1 text-sm text-gray-400">
            {summary.totalQuizzes} quizzes • {summary.totalQuestions} total questions
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Add Quiz
        </button>
      </div>

      {quizzes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900 p-10 text-center">
          <p className="text-sm text-gray-400">No quizzes yet. Create your first quiz.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {quizzes.map((quiz) => (
            <TeacherQuizCard
              key={quiz.id}
              quiz={quiz}
              onEdit={() => handleEditQuiz(quiz)}
              onDelete={() => handleDeleteQuiz(quiz.id)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
