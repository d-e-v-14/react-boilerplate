const OPTION_LABELS = ['A', 'B', 'C', 'D']

export default function QuestionEditor({ question, index, onChange, onRemove }) {
  function updateOption(optionIndex, value) {
    const nextOptions = [...question.options]
    nextOptions[optionIndex] = value
    onChange({ ...question, options: nextOptions })
  }

  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-100">Question {index + 1}</h3>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-md border border-red-800 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-950"
        >
          Remove
        </button>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
          Question Text
        </label>
        <input
          type="text"
          value={question.text}
          onChange={(event) => onChange({ ...question, text: event.target.value })}
          placeholder="Enter your question"
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 outline-none focus:border-gray-500"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-400">
          Time Limit (seconds)
        </label>
        <input
          type="number"
          min="5"
          value={question.timeLimit}
          onChange={(event) =>
            onChange({ ...question, timeLimit: Number(event.target.value) || 0 })
          }
          className="w-40 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 outline-none focus:border-gray-500"
        />
      </div>

      <div className="space-y-2">
        {question.options.map((option, optionIndex) => {
          const isCorrect = question.correctIndex === optionIndex
          return (
            <div key={optionIndex} className="flex items-center gap-2">
              <input
                type="radio"
                name={`correct-${question.id}`}
                checked={isCorrect}
                onChange={() => onChange({ ...question, correctIndex: optionIndex })}
                className="h-4 w-4"
              />
              <span className="w-5 text-xs font-semibold text-gray-400">{OPTION_LABELS[optionIndex]}</span>
              <input
                type="text"
                value={option}
                onChange={(event) => updateOption(optionIndex, event.target.value)}
                placeholder={`Option ${OPTION_LABELS[optionIndex]}`}
                className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 outline-none focus:border-gray-500"
              />
            </div>
          )
        })}
      </div>
    </article>
  )
}
