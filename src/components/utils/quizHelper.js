export function calculateScore(questions, answers) {
  return questions.reduce((accumulator, question) => {
    const correctIndex = getCorrectIndex(question)
    return accumulator + (answers[question.id] === correctIndex ? 1 : 0)
  }, 0)
}

export function getGrade(percentage) {
  if (percentage >= 90) return { label: 'Excellent', color: 'text-emerald-700' }
  if (percentage >= 70) return { label: 'Good Job', color: 'text-teal-700' }
  if (percentage >= 50) return { label: 'Keep Going', color: 'text-amber-700' }
  return { label: 'Keep Practicing', color: 'text-red-700' }
}

export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0')
  return `${minutes}:${remainingSeconds}`
}

export function getCorrectIndex(question) {
  if (typeof question.correctIndex === 'number') return question.correctIndex
  if (typeof question.correct === 'number') return question.correct
  return 0
}

export function getQuestionTimeLimit(question, quiz) {
  if (typeof question.timeLimit === 'number' && question.timeLimit > 0) return question.timeLimit
  if (typeof quiz.timeLimit === 'number' && quiz.timeLimit > 0) return quiz.timeLimit
  if (typeof quiz.defaultQuestionTime === 'number' && quiz.defaultQuestionTime > 0) return quiz.defaultQuestionTime
  return 30
}

export function buildResult(quiz, answers) {
  const total = quiz.questions.length
  const score = calculateScore(quiz.questions, answers)
  const percentage = total ? Math.round((score / total) * 100) : 0
  return { score, total, percentage, answers }
}

export function normalizeQuizzes(quizzes) {
  return quizzes.map((quiz) => ({
    ...quiz,
    defaultQuestionTime: quiz.defaultQuestionTime ?? quiz.timeLimit ?? 30,
    questions: (quiz.questions ?? []).map((question) => ({
      ...question,
      timeLimit: question.timeLimit ?? quiz.timeLimit ?? quiz.defaultQuestionTime ?? 30,
      correctIndex: question.correctIndex ?? question.correct ?? 0,
    })),
  }))
}
