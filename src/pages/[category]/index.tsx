import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { getPostsByCategory } from '@/lib/mdx'

interface Post {
  title: string
  description: string
  slug: string
  category: string
}

interface CategoryProps {
  posts: Post[]
  category: string
}

const categoryTitles: Record<string, string> = {
  guides: 'Guides',
  concepts: 'Core Concepts',
  references: 'References',
}

const categoryDescriptions: Record<string, string> = {
  guides: 'Step-by-step tutorials and how-to guides to help you get started.',
  concepts: 'Deep dives into core concepts and principles.',
  references: 'Detailed reference documentation and API guides.',
}

export default function Category({ posts, category }: CategoryProps) {
  return (
    <div className="py-16">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {categoryTitles[category]}
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          {categoryDescriptions[category]}
        </p>
      </header>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="relative group">
              <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
              <Link href={`/${category}/${post.slug}`} className="block relative z-10 h-full">
                <div className="h-full p-6 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 transition-shadow hover:shadow-lg">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                    {post.title}
                </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  {post.description}
                </p>
                  <div className="mt-auto flex items-center text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                    <span>Read article</span>
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
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { category: 'guides' } },
      { params: { category: 'concepts' } },
      { params: { category: 'references' } },
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string
  const posts = await getPostsByCategory(category)

  return {
    props: {
      posts,
      category,
    },
  }
}