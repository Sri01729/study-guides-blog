import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-white">
              StudyDocs
            </Link>
            <p className="text-base text-zinc-500 dark:text-zinc-400">
              A modern documentation site for your study materials.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Content</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/guides" className="text-base text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link href="/concepts" className="text-base text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                      Concepts
                    </Link>
                  </li>
                  <li>
                    <Link href="/references" className="text-base text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                      References
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/about" className="text-base text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-base text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-base text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} StudyDocs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}