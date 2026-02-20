import { useCallback, useMemo, useState } from 'react'
import { useTimer } from '../hooks/useTimer'
import { buildResult, formatTime, getQuestionTimeLimit } from '../utils/quizHelper'

export default function QuizTaker({ quiz, onFinish, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [answers, setAnswers] = useState({})

  const currentQuestion = quiz.questions[currentIndex]
  const isLastQuestion = currentIndex === quiz.questions.length - 1
  const timeLimit = getQuestionTimeLimit(currentQuestion, quiz)
  const progress = useMemo(
    () => Math.round(((currentIndex + 1) / quiz.questions.length) * 100),
    [currentIndex, quiz.questions.length],
  )

  const submitCurrent = useCallback(
    (value) => {
      const answerValue = typeof value === 'number' ? value : -1
      const nextAnswers = {
        ...answers,
        [currentQuestion.id]: answerValue,
      }
      setAnswers(nextAnswers)

      if (isLastQuestion) {
        onFinish(buildResult(quiz, nextAnswers))
        return
      }

      setCurrentIndex((previous) => previous + 1)
      setSelectedIndex(null)
    },
    [answers, currentQuestion.id, isLastQuestion, onFinish, quiz],
  )

  const { timeLeft, isWarning } = useTimer(timeLimit, () => submitCurrent(selectedIndex))

  function handleNext() {
    if (selectedIndex === null) return
    submitCurrent(selectedIndex)
  }

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-gray-700 px-3 py-2 text-sm text-gray-200 hover:bg-gray-800"
        >
          Back
        </button>
        <span className="text-sm text-gray-400">
          Question {currentIndex + 1} / {quiz.questions.length}
        </span>
      </div>

      <div className="mb-5 h-2 overflow-hidden rounded-full bg-gray-800">
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-100">{quiz.title}</h3>
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            isWarning ? 'bg-red-900/30 text-red-300' : 'bg-blue-900/30 text-blue-300'
          }`}
        >
          {formatTime(timeLeft)}
        </span>
      </div>

      <article className="rounded-xl border border-gray-800 bg-gray-950 p-5">
        <p className="mb-4 text-base font-medium text-gray-100">{currentQuestion.text}</p>

        <div className="space-y-2">
          {currentQuestion.options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              type="button"
              onClick={() => setSelectedIndex(optionIndex)}
              className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition ${
                selectedIndex === optionIndex
                  ? 'border-blue-500 bg-blue-900/30 text-blue-200'
                  : 'border-gray-700 bg-gray-900 text-gray-200 hover:bg-gray-800'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </article>

      <button
        type="button"
        onClick={handleNext}
        disabled={selectedIndex === null}
        className={`mt-5 w-full rounded-md px-4 py-3 text-sm font-semibold transition ${
          selectedIndex === null
            ? 'cursor-not-allowed bg-gray-800 text-gray-500'
            : 'bg-blue-600 text-white hover:bg-blue-500'
        }`}
      >
        {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
      </button>
    </section>
  )
}
