import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { exec } from 'child_process'
import readline from 'readline'

const execAsync = promisify(exec)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const question = (query: string): Promise<string> =>
  new Promise((resolve) => rl.question(query, resolve))

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

async function main() {
  try {
    const title = await question('Document title: ')
    const description = await question('Description: ')
    const category = await question('Category (guides/concepts/references): ')
    const author = await question('Author: ')

    const validCategories = ['guides', 'concepts', 'references']
    if (!validCategories.includes(category)) {
      throw new Error('Invalid category. Must be one of: guides, concepts, references')
    }

    const date = new Date().toISOString().split('T')[0]
    const slug = slugify(title)
    const filePath = path.join(process.cwd(), 'src/content', category, `${slug}.mdx`)

    const content = `---
title: ${title}
description: ${description}
date: ${date}
author: ${author}
---

# ${title}

${description}

## Introduction

Start writing your content here...
`

    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(filePath, content)
    console.log(`\nCreated ${filePath}`)
    console.log('\nOpening in your editor...')

    await execAsync(`code ${filePath}`)
  } catch (error) {
    console.error('Error:', String(error))
  } finally {
    rl.close()
  }
}

main()