import { useRef, useEffect, useState } from 'react'
import Editor, { Monaco } from '@monaco-editor/react'

interface CodeEditorProps {
  defaultLanguage?: string
  defaultValue?: string
  height?: string
  theme?: 'vs-dark' | 'light'
}

export default function CodeEditor({
  defaultLanguage = 'java',
  defaultValue = '// Write your code here\n',
  height = '400px',
  theme = 'vs-dark'
}: CodeEditorProps) {
  const [isEditorReady, setIsEditorReady] = useState(false)
  const editorRef = useRef(null)

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor
    setIsEditorReady(true)

    // Configure editor settings
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      lineNumbers: 'on',
      roundedSelection: true,
      automaticLayout: true,
      wordWrap: 'on'
    })
  }

  return (
    <div className="relative rounded-lg border border-zinc-200 dark:border-zinc-700">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            {defaultLanguage.toUpperCase()}
          </span>
        </div>
        {isEditorReady && (
          <button
            onClick={() => {
              if (editorRef.current) {
                const editor = editorRef.current as any
                editor.getAction('editor.action.formatDocument').run()
              }
            }}
            className="rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Format Code
          </button>
        )}
      </div>
      <Editor
        height={height}
        defaultLanguage={defaultLanguage}
        defaultValue={defaultValue}
        theme={theme}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          roundedSelection: true,
          automaticLayout: true,
          wordWrap: 'on'
        }}
      />
    </div>
  )
}