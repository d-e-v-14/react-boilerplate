export const INITIAL_QUIZZES = [
  {
    id: 1,
    title: "React Basics",
    description: "Test your knowledge of React fundamentals",
    timeLimit: 30,
    questions: [
      {
        id: 1,
        text: "What hook is used to manage state in React?",
        options: ["useEffect", "useState", "useRef", "useContext"],
        correct: 1,
      },
      {
        id: 2,
        text: "What does JSX stand for?",
        options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extra"],
        correct: 0,
      },
      {
        id: 3,
        text: "Which hook runs side effects after render?",
        options: ["useState", "useEffect", "useRef", "useMemo"],
        correct: 1,
      },
    ],
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    description: "Core JS concepts every developer should know",
    timeLimit: 45,
    questions: [
      {
        id: 1,
        text: "Which keyword declares a block-scoped variable?",
        options: ["var", "let", "const", "Both let and const"],
        correct: 3,
      },
      {
        id: 2,
        text: "What does the spread operator (...) do?",
        options: [
          "Deletes array items",
          "Expands iterable elements",
          "Creates a new function",
          "Loops through an array",
        ],
        correct: 1,
      },
    ],
  },
];
