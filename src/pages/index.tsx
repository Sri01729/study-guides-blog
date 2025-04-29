import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Document {
  id: string
  title: string
  created_at: string
  user_id: string
  category: string
}

export default function Home() {
  const { user } = useAuth()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const { data, error } = await supabase
          .from('documents')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6)

        if (error) throw error
        setDocuments(data || [])
      } catch (error) {
        console.error('Error fetching documents:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  const handleCreateDocument = () => {
    if (!user) {
      router.push('/login?redirectTo=/new-document')
      return
    }
    router.push('/new-document')
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {/* Hero Section */}
        <section className="text-center py-16 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white sm:text-5xl">
            Study Docs
          </h1>
          <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Your central hub for study materials, guides, and knowledge sharing.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            {!user ? (
              <>
                <Link
                  href="/signup"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-base font-medium rounded-md text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                href="/new-document"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Create Document
              </Link>
            )}
          </div>
        </section>

        {/* Featured Guides Section */}
        <section className="py-16 border-b border-zinc-200 dark:border-zinc-800">
          <div className="sm:flex sm:items-center sm:justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Featured Guides</h2>
            <Link
              href="/guides"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm font-medium"
            >
              View all guides →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Example guide cards - replace with real data */}
            {['Java Basics', 'Python for Beginners', 'Web Development'].map((title, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6"
              >
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Comprehensive guide to help you master the fundamentals.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="py-16 border-b border-zinc-200 dark:border-zinc-800">
          <div className="sm:flex sm:items-center sm:justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Latest Articles</h2>
            <Link
              href="/articles"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm font-medium"
            >
              View all articles →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Example article cards - replace with real data */}
            {['Best Practices', 'Tips & Tricks', 'Study Techniques'].map((title, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6"
              >
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Learn from the community's experience and insights.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Documents Section */}
        <section className="py-16">
          <div className="sm:flex sm:items-center sm:justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Recent Documents</h2>
            <Link
              href="/documents"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm font-medium"
            >
              View all documents →
            </Link>
          </div>
          {loading ? (
            <p className="text-zinc-600 dark:text-zinc-400">Loading documents...</p>
          ) : documents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {documents.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/documents/${doc.id}`}
                  className="block p-6 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-white">{doc.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Created on {new Date(doc.created_at).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-white">No documents yet</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {user ? 'Create your first document' : 'Sign in to create documents'}
              </p>
            </div>
          )}
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-blue-50 dark:bg-blue-900/20 rounded-lg px-8 text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Ready to contribute?
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Join our community and start sharing your knowledge with others.
          </p>
          {!user && (
            <Link
              href="/signup"
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Create an Account
            </Link>
          )}
        </section>
      </main>
    </>
  )
}