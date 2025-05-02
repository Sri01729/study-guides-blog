import { useState } from 'react'
import CodeEditor from './CodeEditor'

interface PracticeSectionProps {
  title?: string
  description?: string
  defaultCode?: string
  language?: string
}

export default function PracticeSection({
  title = 'Practice',
  description = 'Try out the code below:',
  defaultCode = '// Write your code here\n',
  language = 'java'
}: PracticeSectionProps) {
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)

  return (
    <div className="my-8 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
      <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">{title}</h3>
      <p className="mb-4 text-zinc-600 dark:text-zinc-400">{description}</p>

      <div className="space-y-4">
        <CodeEditor
          defaultLanguage={language}
          defaultValue={defaultCode}
          height="300px"
          theme="vs-dark"
        />

        <div className="flex justify-end">
          <button
            onClick={() => {
              // TODO: Implement code execution
              setIsRunning(true)
              setTimeout(() => {
                setOutput('// Code execution will be implemented in the next step')
                setIsRunning(false)
              }, 1000)
            }}
            disabled={isRunning}
            className="flex items-center space-x-2 rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 disabled:opacity-50 dark:bg-green-600 dark:hover:bg-green-700"
          >
            {isRunning ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Running...</span>
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Run Code</span>
              </>
            )}
          </button>
        </div>

        {output && (
          <div className="rounded-lg bg-zinc-900 p-4">
            <pre className="text-sm text-white">
              <code>{output}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}