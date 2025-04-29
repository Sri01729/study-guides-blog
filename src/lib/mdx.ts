import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'

const contentDirectory = path.join(process.cwd(), 'src/content')

export async function getAllPosts() {
  const categories = fs.readdirSync(contentDirectory)
  const posts = []

  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, category)
    const files = fs.readdirSync(categoryPath)

    for (const file of files) {
      if (!file.endsWith('.mdx')) continue

      const source = fs.readFileSync(path.join(categoryPath, file), 'utf8')
      const { data } = matter(source)
      const slug = file.replace(/\.mdx$/, '')

      posts.push({
        ...data,
        slug,
        category,
      })
    }
  }

  return posts
}

export async function getPostBySlug(category: string, slug: string) {
  const filePath = path.join(contentDirectory, category, `${slug}.mdx`)
  const source = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex, rehypeHighlight],
    },
  })

  return {
    source: mdxSource,
    frontMatter: {
      ...data,
      slug,
      category,
    },
  }
}

export async function getAllPostSlugs() {
  const categories = fs.readdirSync(contentDirectory)
  const paths = []

  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, category)
    const files = fs.readdirSync(categoryPath)

    for (const file of files) {
      if (!file.endsWith('.mdx')) continue

      const slug = file.replace(/\.mdx$/, '')
      paths.push({
        params: {
          category,
          slug,
        },
      })
    }
  }

  return paths
}

export async function getPostsByCategory(category: string) {
  const categoryPath = path.join(contentDirectory, category)
  const files = fs.readdirSync(categoryPath)
  const posts = []

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue

    const source = fs.readFileSync(path.join(categoryPath, file), 'utf8')
    const { data } = matter(source)
    const slug = file.replace(/\.mdx$/, '')

    posts.push({
      ...data,
      slug,
      category,
    })
  }

  return posts
}