import { useMemo, useState } from 'react'
import QuestionEditor from './QuestionEditor'

function createQuestion(defaultSeconds = 30) {
  return {
    id: crypto.randomUUID(),
    text: '',
    timeLimit: defaultSeconds,
    options: ['', '', '', ''],
    correctIndex: 0,
  }
}

export default function QuizEditor({ initialQuiz, onSave, onCancel }) {
  const [title, setTitle] = useState(initialQuiz?.title ?? '')
  const [description, setDescription] = useState(initialQuiz?.description ?? '')
  const [defaultQuestionTime, setDefaultQuestionTime] = useState(initialQuiz?.defaultQuestionTime ?? 30)
  const [questions, setQuestions] = useState(initialQuiz?.questions ?? [createQuestion(initialQuiz?.defaultQuestionTime ?? 30)])
  const [error, setError] = useState('')

  const isEditing = Boolean(initialQuiz)

  function addQuestion() {
    setQuestions((current) => [...current, createQuestion(defaultQuestionTime || 30)])
  }

  function removeQuestion(questionIndex) {
    setQuestions((current) => current.filter((_, index) => index !== questionIndex))
  }

  function updateQuestion(questionIndex, updatedQuestion) {
    setQuestions((current) =>
      current.map((question, index) => (index === questionIndex ? updatedQuestion : question)),
    )
  }

  const totalSeconds = useMemo(
    () => questions.reduce((sum, question) => sum + (Number(question.timeLimit) || 0), 0),
    [questions],
  )

  function validateForm() {
    if (!title.trim()) return 'Quiz title is required.'
    if (!questions.length) return 'Add at least one question.'

    for (let index = 0; index < questions.length; index += 1) {
      const question = questions[index]
      if (!question.text.trim()) return `Question ${index + 1} text is required.`
      if (!Number(question.timeLimit) || Number(question.timeLimit) < 5) {
        return `Question ${index + 1} time must be at least 5 seconds.`
      }
      if (question.options.some((option) => !option.trim())) {
        return `All 4 options are required for question ${index + 1}.`
      }
    }

    return ''
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formError = validateForm()
    setError(formError)

    if (formError) return

    onSave({
      id: initialQuiz?.id ?? crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      defaultQuestionTime: Number(defaultQuestionTime) || 30,
      questions,
      updatedAt: new Date().toISOString(),
      createdAt: initialQuiz?.createdAt ?? new Date().toISOString(),
    })
  }

  return (
    <section className="mx-auto max-w-4xl rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-100">
          {isEditing ? 'Edit Quiz' : 'Create Quiz'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-700 px-3 py-2 text-sm text-gray-200 hover:bg-gray-800"
        >
          Back to list
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">Quiz Title</label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Algebra Basics"
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">Default Time / Question (seconds)</label>
            <input
              type="number"
              min="5"
              value={defaultQuestionTime}
              onChange={(event) => setDefaultQuestionTime(Number(event.target.value) || 0)}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 outline-none focus:border-gray-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">Description</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            placeholder="Short quiz description"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 outline-none focus:border-gray-500"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
              Questions ({questions.length})
            </h3>
            <button
              type="button"
              onClick={addQuestion}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
            >
              Add Question
            </button>
          </div>

          {questions.map((question, index) => (
            <QuestionEditor
              key={question.id}
              question={question}
              index={index}
              onChange={(updatedQuestion) => updateQuestion(index, updatedQuestion)}
              onRemove={() => removeQuestion(index)}
            />
          ))}
        </div>

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <div className="flex items-center justify-between border-t border-gray-800 pt-4">
          <p className="text-sm text-gray-400">Estimated total time: {totalSeconds} seconds</p>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Save Quiz
          </button>
        </div>
      </form>
    </section>
  )
}
