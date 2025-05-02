import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'
import PracticeSection from './PracticeSection'

interface Props {
  children?: ReactNode
  href?: string
  src?: string
  alt?: string
  width?: number
  height?: number
  id?: string
}

const CustomLink = ({ href, children }: Props) => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
        {children}
      </Link>
    )
  }

  return (
    <a
      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </a>
  )
}

const CustomImage = ({ src, alt, width, height }: Props) => {
  return (
    <div className="relative my-8 h-64 w-full overflow-hidden rounded-lg sm:h-96">
      <Image
        src={src || ''}
        alt={alt || ''}
        width={width || 800}
        height={height || 400}
        className="object-cover"
      />
    </div>
  )
}

const CustomPre = ({ children }: Props) => {
  return (
    <pre className="relative my-8 overflow-x-auto rounded-lg bg-zinc-800 p-4 dark:bg-zinc-900">
      {children}
    </pre>
  )
}

const CustomH1 = ({ children, id }: Props) => {
  return (
    <h1 id={id} className="mt-8 mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
      {children}
    </h1>
  )
}

const CustomH2 = ({ children, id }: Props) => {
  return (
    <h2 id={id} className="mt-8 mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
      {children}
    </h2>
  )
}

const CustomH3 = ({ children, id }: Props) => {
  return (
    <h3 id={id} className="mt-8 mb-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
      {children}
    </h3>
  )
}

const CustomP = ({ children }: Props) => {
  return (
    <p className="my-4 leading-7 text-zinc-600 dark:text-zinc-400">
      {children}
    </p>
  )
}

const CustomUl = ({ children }: Props) => {
  return (
    <ul className="my-6 ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
      {children}
    </ul>
  )
}

const CustomOl = ({ children }: Props) => {
  return (
    <ol className="my-6 ml-6 list-decimal space-y-2 text-zinc-600 dark:text-zinc-400">
      {children}
    </ol>
  )
}

const CustomLi = ({ children }: Props) => {
  return <li className="leading-7">{children}</li>
}

const CustomBlockquote = ({ children }: Props) => {
  return (
    <blockquote className="my-6 border-l-4 border-blue-500 pl-4 italic text-zinc-600 dark:text-zinc-400">
      {children}
    </blockquote>
  )
}

const MDXComponents = {
  a: CustomLink,
  img: CustomImage,
  pre: CustomPre,
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  p: CustomP,
  ul: CustomUl,
  ol: CustomOl,
  li: CustomLi,
  blockquote: CustomBlockquote,
  PracticeSection: PracticeSection,
}

export default MDXComponents