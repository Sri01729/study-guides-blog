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
        // Find the first visible heading
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) {
          // Get the heading that is most visible (highest intersection ratio)
          const mostVisible = visible.reduce((prev, current) =>
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          )
          setActiveId(mostVisible.target.id)
        }
      },
      {
        // Adjust margins to start highlighting a bit before the heading reaches the top
        rootMargin: '-80px 0px -80% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1] // More granular thresholds for smoother transitions
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
  }, [headings]) // Update when headings change

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
            className="relative"
          >
            {activeId === heading.id && (
              <div className="absolute -left-2 top-1/2 h-6 w-0.5 -translate-y-1/2 bg-blue-500 dark:bg-blue-400" />
            )}
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`block py-1 transition-all duration-200 ${
                activeId === heading.id
                  ? 'font-medium text-blue-600 dark:text-blue-400'
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