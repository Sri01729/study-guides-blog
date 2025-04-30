import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}

const navigation: NavItem[] = [
  {
    title: 'Getting Started',
    href: '/guides/getting-started',
  },
  {
    title: 'Guides',
    href: '/guides',
    items: [
      { title: 'Java', href: '/guides/java' },
      { title: 'Projects', href: '/guides/projects' }
    ],
  },
]

function NavItems({ items, level = 0 }: { items: NavItem[]; level?: number }) {
  const router = useRouter()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggleExpanded = (href: string) => {
    setExpanded(prev => ({ ...prev, [href]: !prev[href] }))
  }

  return (
    <ul className={level === 0 ? 'space-y-2' : 'mt-2 space-y-2'}>
      {items.map((item) => (
        <li key={item.href}>
          <div className="flex items-center">
            {item.items && (
              <button
                onClick={() => toggleExpanded(item.href)}
                className="mr-2 p-1 hover:bg-zinc-100 rounded dark:hover:bg-zinc-800"
              >
                <svg
                  className={`h-4 w-4 transition-transform ${
                    expanded[item.href] ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
            <Link
              href={item.href}
              className={`block py-2 px-3 rounded-lg ${
                router.pathname === item.href
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              {item.title}
            </Link>
          </div>
          {item.items && expanded[item.href] && (
            <div className="ml-4">
              <NavItems items={item.items} level={level + 1} />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      <button
        type="button"
        className="fixed top-4 left-4 z-50 rounded-lg p-2 text-zinc-600 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      {/* Collapse button for desktop */}
      <button
        type="button"
        className="fixed bottom-4 left-4 z-50 hidden lg:block rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isCollapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7M19 19l-7-7 7-7'}
          />
        </svg>
      </button>

      <div
        className={`fixed inset-0 z-40 transform bg-zinc-900/50 backdrop-blur lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 transform overflow-y-auto border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 transition-all duration-300 ease-in-out lg:sticky lg:top-16 lg:z-0 ${
          isCollapsed ? 'w-16 px-2' : 'w-64 px-4'
        } pb-10 pt-20 lg:pt-4 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <nav className={`space-y-6 ${isCollapsed ? 'hidden lg:block' : ''}`}>
          <NavItems items={navigation} />
        </nav>
        {isCollapsed && (
          <div className="hidden lg:flex flex-col items-center space-y-4 mt-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                title={item.title}
              >
                {/* You can add icons here for each menu item */}
                <span className="text-sm">{item.title[0]}</span>
              </Link>
            ))}
          </div>
        )}
      </aside>
    </>
  )
}