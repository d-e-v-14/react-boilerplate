import { useState } from 'react'

export function useStudentQuizFlow() {
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [quizResult, setQuizResult] = useState(null)

  function startQuiz(quiz) {
    setSelectedQuiz(quiz)
    setQuizResult(null)
  }

  function finishQuiz(result) {
    setQuizResult(result)
  }

  function retryQuiz() {
    setQuizResult(null)
  }

  function returnToList() {
    setSelectedQuiz(null)
    setQuizResult(null)
  }

  return {
    selectedQuiz,
    quizResult,
    startQuiz,
    finishQuiz,
    retryQuiz,
    returnToList,
  }
}
