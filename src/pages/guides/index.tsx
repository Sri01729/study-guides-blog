import { GetStaticProps } from 'next'
import { getAllPosts } from '@/lib/mdx'
import CategoryCard from '@/components/content/CategoryCard'

interface Category {
  title: string
  description: string
  slug: string
  count: number
}

interface GuidesProps {
  categories: Category[]
}

export default function Guides({ categories }: GuidesProps) {
  return (
    <div className="py-16">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-8">
            Programming Guides
          </h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                title={category.title}
                description={category.description}
                href={`/guides/${category.slug}`}
                count={category.count}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts()

  // Group posts by subcategory
  const categoryMap = posts.reduce((acc, post) => {
    if (post.subcategory) {
      const key = post.subcategory
      if (!acc[key]) {
        acc[key] = {
          title: key.charAt(0).toUpperCase() + key.slice(1),
          description: `Learn about ${key}`,
          slug: key,
          count: 0
        }
      }
      acc[key].count++
    }
    return acc
  }, {} as Record<string, Category>)

  return {
    props: {
      categories: Object.values(categoryMap)
    }
  }
}