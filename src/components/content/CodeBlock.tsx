import { useState } from 'react'
import { Highlight } from 'prism-react-renderer'

interface Props {
  children: string
  language: string
  filename?: string
}

export default function CodeBlock({ children, language, filename }: Props) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children)
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
          className="absolute right-2 top-2 rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-100 opacity-0 transition-opacity hover:bg-zinc-600 group-hover:opacity-100"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <Highlight code={children.trim()} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} overflow-x-auto p-4`} style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span className="mr-4 inline-block w-4 text-right text-zinc-600">
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}