import Link from 'next/link'

interface Post {
  title: string
  slug: string
  category: string
  subcategory?: string
}

interface PostNavigationProps {
  prev: Post | null
  next: Post | null
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  const getPostUrl = (post: Post) => {
    const parts = [post.category]
    if (post.subcategory) parts.push(post.subcategory)
    parts.push(post.slug)
    return `/${parts.join('/')}`
  }

  return (
    <nav className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-8 dark:border-zinc-700">
      {prev ? (
        <Link
          href={getPostUrl(prev)}
          className="group flex items-center gap-3 text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="h-4 w-4 stroke-current"
          >
            <path
              d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {prev.title}
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={getPostUrl(next)}
          className="group flex items-center gap-3 text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
        >
          {next.title}
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="h-4 w-4 stroke-current"
          >
            <path
              d="M8.75 3.75 12.25 8m0 0-3.5 3.25M12.25 8h-8.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}