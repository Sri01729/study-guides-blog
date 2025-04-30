import React, { useState } from 'react'
import { Highlight } from 'prism-react-renderer'
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline'

interface Props {
  children: string | React.ReactNode
  language: string
  filename?: string
}

export default function CodeBlock({ children, language, filename }: Props) {
  const [copied, setCopied] = useState(false)

  // Convert children to string, handling different types
  const getCodeString = (children: string | React.ReactNode): string => {
    if (typeof children === 'string') {
      return children
    }
    if (React.isValidElement(children) && children.props.children) {
      return children.props.children
    }
    return ''
  }

  const codeString = getCodeString(children)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative my-6 rounded-lg bg-zinc-800 dark:bg-zinc-900">
      {filename && (
        <div className="flex items-center justify-between rounded-t-lg border-b border-zinc-700 bg-zinc-800 px-4 py-2 dark:border-zinc-600 dark:bg-zinc-900">
          <span className="text-sm text-zinc-400">{filename}</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute right-4 top-4 rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-zinc-400 transition-all hover:bg-zinc-700 hover:text-zinc-200 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          title="Copy code"
        >
          {copied ? (
            <CheckIcon className="h-5 w-5 text-green-500" />
          ) : (
            <ClipboardIcon className="h-5 w-5" />
          )}
        </button>
        <Highlight code={codeString.trim()} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} overflow-x-auto p-4`} style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="table-row">
                  <span className="table-cell pr-4 text-right text-sm text-zinc-500 select-none">
                    {i + 1}
                  </span>
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}