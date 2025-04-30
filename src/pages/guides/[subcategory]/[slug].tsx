import { useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { getAllPosts, getPostBySlug, getAdjacentPosts } from '@/lib/mdx'
import TableOfContents from '@/components/content/TableOfContents'
import PostNavigation from '@/components/content/PostNavigation'

interface PostProps {
  source: any
  frontMatter: {
    title: string
    description: string
    author: string
    slug: string
    category: string
    subcategory: string
  }
  prevPost: {
    title: string
    slug: string
    category: string
    subcategory: string
  } | null
  nextPost: {
    title: string
    slug: string
    category: string
    subcategory: string
  } | null
}

export default function Post({ source, frontMatter, prevPost, nextPost }: PostProps) {
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false)

  return (
    <div className="relative flex">
      <article className={`min-w-0 flex-auto px-4 py-16 lg:px-8 transition-all duration-300 ${
        isRightSidebarCollapsed ? 'lg:pr-8' : 'lg:pr-16'
      }`}>
        <header className="mb-9">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {frontMatter.title}
          </h1>
          {frontMatter.description && (
            <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
              {frontMatter.description}
            </p>
          )}
          <dl className="mt-4 space-y-2">
            {frontMatter.author && (
              <div className="flex items-center space-x-2 text-sm text-zinc-500 dark:text-zinc-400">
                <dt>Author</dt>
                <dd>{frontMatter.author}</dd>
              </div>
            )}
          </dl>
        </header>
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <MDXRemote {...source} />
        </div>
        <PostNavigation prev={prevPost} next={nextPost} />
      </article>

      {/* Collapse button for right sidebar */}
      <button
        type="button"
        className="fixed right-4 top-20 z-50 hidden xl:block rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        onClick={() => setIsRightSidebarCollapsed(!isRightSidebarCollapsed)}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isRightSidebarCollapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7M19 19l-7-7 7-7'}
          />
        </svg>
      </button>

      <div className={`hidden xl:sticky xl:top-[4.5rem] xl:block xl:h-[calc(100vh-4.5rem)] transition-all duration-300 ${
        isRightSidebarCollapsed ? 'xl:w-0 xl:opacity-0' : 'xl:w-56 xl:opacity-100'
      } xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6`}>
        <TableOfContents />
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts()
  const paths = posts
    .filter(post => post.subcategory) // Only include posts with subcategories
    .map(post => ({
      params: {
        subcategory: post.subcategory,
        slug: post.slug,
      },
    }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { subcategory, slug } = params as { subcategory: string; slug: string }
  const post = await getPostBySlug('guides', slug, subcategory)
  const { prev, next } = await getAdjacentPosts('guides', slug, subcategory)

  return {
    props: {
      ...post,
      prevPost: prev,
      nextPost: next,
    },
  }
}