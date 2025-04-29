import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { category, slug: originalSlug, content } = req.body

    // Validate inputs
    if (!category || !originalSlug || !content) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Create category directory if it doesn't exist
    const categoryDir = path.join(process.cwd(), 'src/content', category)
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true })
    }

    // Function to generate a unique slug
    const generateUniqueSlug = (baseSlug: string, attempt = 0): string => {
      const newSlug = attempt === 0 ? baseSlug : `${baseSlug}-${attempt}`
      const filePath = path.join(categoryDir, `${newSlug}.mdx`)

      if (!fs.existsSync(filePath)) {
        return newSlug
      }

      return generateUniqueSlug(baseSlug, attempt + 1)
    }

    // Get a unique slug
    const uniqueSlug = generateUniqueSlug(originalSlug)
    const filePath = path.join(categoryDir, `${uniqueSlug}.mdx`)

    // Write the file
    fs.writeFileSync(filePath, content)

    return res.status(200).json({
      message: 'Document created successfully',
      slug: uniqueSlug
    })
  } catch (error) {
    console.error('Error creating document:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}