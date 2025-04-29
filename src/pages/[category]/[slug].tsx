import { GetStaticProps, GetStaticPaths } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { getAllPostSlugs, getPostBySlug } from '@/lib/mdx'
import TableOfContents from '@/components/content/TableOfContents'

interface PostProps {
  source: any
  frontMatter: {
    title: string
    description: string
    author: string
  }
}

export default function Post({ source, frontMatter }: PostProps) {
  return (
    <div className="relative flex">
      <article className="min-w-0 max-w-3xl flex-auto px-4 py-16 lg:px-8 lg:pr-16">
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
      </article>
      <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-4 xl:block xl:h-[calc(100vh-4.5rem)] xl:w-56 xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
        <TableOfContents />
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostSlugs()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category, slug } = params as { category: string; slug: string }
  const post = await getPostBySlug(category, slug)

  return {
    props: {
      ...post,
    },
  }
}