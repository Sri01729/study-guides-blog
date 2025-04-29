import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

interface Post {
  title: string
  description: string
  slug: string
  category: string
  subcategory: string
}

interface SubcategoryProps {
  posts: Post[]
  subcategory: string
}

export default function Subcategory({ posts, subcategory }: SubcategoryProps) {
  return (
    <div className="py-16">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <div className="flex flex-col items-center gap-4 mb-8">
            <Link
              href="/guides"
              className="text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Back to Guides
            </Link>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white text-center">
              {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} Articles
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="relative group h-full">
                <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
                <Link href={`/guides/${post.subcategory}/${post.slug}`} className="relative z-10 h-full block">
                  <div className="h-full p-6 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 transition-shadow hover:shadow-lg flex flex-col">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 flex-grow">
                        {post.description}
                      </p>
                    )}
                    <div className="flex items-center text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mt-auto">
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
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts()
  const subcategories = [...new Set(posts.map(post => post.subcategory).filter(Boolean))]

  return {
    paths: subcategories.map(subcategory => ({
      params: { subcategory }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const subcategory = params?.subcategory as string
  const allPosts = await getAllPosts()
  const posts = allPosts.filter(post => post.subcategory === subcategory)

  // Sort posts by alphabetical order and numeric prefix
  posts.sort((a, b) => {
    // Extract the numeric prefix if it exists (e.g., "1-", "2-", "A-", "B-")
    const aPrefix = a.slug.match(/^([A-Z0-9]+)-/i)?.[1] || ''
    const bPrefix = b.slug.match(/^([A-Z0-9]+)-/i)?.[1] || ''

    // Convert to numbers if both are numeric
    const aNum = /^\d+$/.test(aPrefix) ? parseInt(aPrefix) : null
    const bNum = /^\d+$/.test(bPrefix) ? parseInt(bPrefix) : null

    if (aNum !== null && bNum !== null) {
      return aNum - bNum
    }

    // If one or both are not numeric, sort alphabetically
    return aPrefix.localeCompare(bPrefix)
  })

  return {
    props: {
      posts,
      subcategory
    }
  }
}