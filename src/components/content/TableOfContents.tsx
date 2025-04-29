import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    // Function to get all headings and their IDs
    const getHeadings = () => {
      const elements = Array.from(document.querySelectorAll('h2, h3, h4'))
        .filter(element => element.id) // Only include headings with IDs
        .map((element) => ({
          id: element.id,
          text: element.textContent || '',
          level: Number(element.tagName.charAt(1)),
        }))
      setHeadings(elements)
    }

    // Initial load of headings
    getHeadings()

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 1.0
      }
    )

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, []) // Empty dependency array since we only want this to run once

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveId(id)
      // Update URL hash without scrolling
      window.history.pushState(null, '', `#${id}`)
    }
  }

  if (headings.length === 0) return null

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">
        On this page
      </h4>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`block py-1 transition-colors duration-200 ${
                activeId === heading.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}