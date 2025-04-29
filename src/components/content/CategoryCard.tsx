import Link from 'next/link'

interface CategoryCardProps {
  title: string
  description: string
  href: string
  count: number
}

export default function CategoryCard({ title, description, href, count }: CategoryCardProps) {
  return (
    <article className="relative group">
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <Link href={href} className="relative z-10">
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 transition-shadow hover:shadow-lg">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {count} articles
            </span>
            <div className="flex items-center text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
              <span>View articles</span>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="ml-1 h-4 w-4 stroke-current"
              >
                <path
                  d="M6.75 5.75 9.25 8l-2.5 2.25"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}