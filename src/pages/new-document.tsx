import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import matter from 'gray-matter'
import dynamic from 'next/dynamic'
import MarkdownIt from 'markdown-it'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false })
import 'react-markdown-editor-lite/lib/index.css'

const mdParser = new MarkdownIt()

export default function NewDocument() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'guides',
    content: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    console.log('Input change:', name, value)
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleEditorChange = useCallback(({ text }: { text: string }) => {
    console.log('Editor change:', text)
    setFormData(prev => ({ ...prev, content: text }))
  }, [])

  const isFormValid = formData.title.trim() !== '' && formData.description.trim() !== '';

  useEffect(() => {
    console.log('Current form data:', formData);
    console.log('Form valid:', isFormValid);
  }, [formData, isFormValid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submit clicked, form data:', formData)

    if (!isFormValid) {
      alert('Please fill in all required fields')
      return
    }

    if (isSubmitting) return

    try {
      setIsSubmitting(true)
      const { title, description, category, content } = formData
      console.log('Form data at submit:', formData)

      if (!title.trim() || !description.trim()) {
        throw new Error('Title and description are required')
      }

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      const frontMatter = {
        title,
        description,
        date: new Date().toISOString().split('T')[0],
      }

      const mdxContent = matter.stringify(content, frontMatter)

      const response = await fetch('/api/create-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          slug,
          content: mdxContent,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push(`/${category}/${data.slug}`)
      } else {
        throw new Error(data.message || 'Failed to create document')
      }
    } catch (error) {
      console.error('Error creating document:', error)
      alert(error instanceof Error ? error.message : 'Failed to create document')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Create New Document</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-2 font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700"
            placeholder="Enter document title"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 font-medium">
            Description <span className="text-red-500">*</span>
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700"
            placeholder="Enter document description"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block mb-2 font-medium">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700"
            disabled={isSubmitting}
          >
            <option value="guides">Guides</option>
            <option value="concepts">Concepts</option>
            <option value="references">References</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Content</label>
          <MdEditor
            style={{ height: '500px' }}
            renderHTML={text => mdParser.render(text)}
            onChange={handleEditorChange}
            value={formData.content}
            view={{ menu: true, md: true, html: true }}
            canView={{ menu: true, md: true, html: true, both: false, fullScreen: true, hideMenu: true }}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg ${
            !isFormValid
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Document'}
        </button>
      </form>
    </div>
  )
}