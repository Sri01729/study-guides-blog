import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkSlug from 'remark-slug'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'

const contentDirectory = path.join(process.cwd(), 'src/content')

function getFilesRecursively(dir: string): { filePath: string; category: string; subcategory?: string }[] {
  const files: { filePath: string; category: string; subcategory?: string }[] = []
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const relativePath = path.relative(contentDirectory, dir)
    const category = relativePath.split(path.sep)[0]
    const subcategory = relativePath.split(path.sep)[1]

    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...getFilesRecursively(fullPath))
    } else if (item.endsWith('.mdx')) {
      files.push({
        filePath: fullPath,
        category,
        subcategory
      })
    }
  }

  return files
}

export async function getAllPosts() {
  const files = getFilesRecursively(contentDirectory)
  const posts = []

  for (const file of files) {
    const source = fs.readFileSync(file.filePath, 'utf8')
    const { data } = matter(source)
    const slug = path.basename(file.filePath).replace(/\.mdx$/, '')

    posts.push({
      ...data,
      slug,
      category: file.category,
      subcategory: file.subcategory,
    })
  }

  return posts
}

export async function getPostBySlug(category: string, slug: string, subcategory?: string) {
  const categoryPath = path.join(contentDirectory, category)
  let filePath: string | null = null

  // If subcategory is provided, look in that directory first
  if (subcategory) {
    const subcategoryPath = path.join(categoryPath, subcategory)
    const subcategoryFilePath = path.join(subcategoryPath, `${slug}.mdx`)
    if (fs.existsSync(subcategoryFilePath)) {
      filePath = subcategoryFilePath
    }
  }

  // If not found in subcategory or no subcategory provided, search everywhere
  if (!filePath) {
    const files = getFilesRecursively(categoryPath)
    const file = files.find(f => path.basename(f.filePath).replace(/\.mdx$/, '') === slug)
    if (file) {
      filePath = file.filePath
    }
  }

  if (!filePath) {
    throw new Error(`Post not found: ${category}/${subcategory || ''}/${slug}`)
  }

  const source = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(source)
  const foundSubcategory = path.relative(categoryPath, path.dirname(filePath))

  const mdxSource = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath, remarkSlug],
      rehypePlugins: [rehypeKatex, rehypeHighlight],
    },
  })

  return {
    source: mdxSource,
    frontMatter: {
      ...data,
      slug,
      category,
      subcategory: foundSubcategory || undefined,
    },
  }
}

export async function getAllPostSlugs() {
  const files = getFilesRecursively(contentDirectory)
  return files.map(file => ({
    params: {
      category: file.category,
      slug: path.basename(file.filePath).replace(/\.mdx$/, ''),
    },
  }))
}

export async function getPostsByCategory(category: string) {
  const categoryPath = path.join(contentDirectory, category)
  const files = getFilesRecursively(categoryPath)
  const posts = []

  for (const file of files) {
    const source = fs.readFileSync(file.filePath, 'utf8')
    const { data } = matter(source)
    const slug = path.basename(file.filePath).replace(/\.mdx$/, '')

    posts.push({
      ...data,
      slug,
      category: file.category,
      subcategory: file.subcategory,
    })
  }

  return posts
}

export async function getAdjacentPosts(category: string, currentSlug: string, subcategory?: string) {
  const posts = await getPostsByCategory(category)

  // Filter posts by subcategory if provided
  const filteredPosts = subcategory
    ? posts.filter(post => post.subcategory === subcategory)
    : posts

  const sortedPosts = filteredPosts.sort((a, b) => {
    // Extract the prefix (number or letter) from the slug
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

  const currentIndex = sortedPosts.findIndex(post => post.slug === currentSlug)

  return {
    prev: currentIndex > 0 ? sortedPosts[currentIndex - 1] : null,
    next: currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null
  }
}