# StudyDocs Blog Generator

A modern documentation site generator for study materials, built with Next.js and MDX.

## Features

- 📝 Write content in Markdown/MDX
- 🎨 Beautiful, responsive design with dark mode support
- 🔍 Full-text search capabilities
- 📊 Automatic table of contents generation
- 🧮 Math equation support with KaTeX
- 💻 Code syntax highlighting
- 📱 Mobile-friendly interface
- 🚀 Fast page loads with Next.js
- 🎯 SEO optimized

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/study-docs-blog.git
   cd study-docs-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Create a new document:
   ```bash
   npm run new-doc
   ```

## Project Structure

```
study-docs-blog/
├── src/
│   ├── components/      # React components
│   ├── content/         # MDX content files
│   ├── lib/            # Utility functions
│   ├── pages/          # Next.js pages
│   └── styles/         # Global styles
├── public/             # Static assets
└── scripts/           # Utility scripts
```

## Writing Content

1. Run `npm run new-doc` to create a new document
2. Follow the prompts to specify:
   - Document title
   - Description
   - Category (guides/concepts/references)
   - Author
3. The script will create a new MDX file in the appropriate category folder
4. Edit the file to add your content

### Content Features

- **Math Equations**: Use LaTeX syntax between `$` for inline math or `$$` for block math
- **Code Blocks**: Use triple backticks with language identifier
- **Tables**: Standard Markdown tables are supported
- **Images**: Use standard Markdown image syntax
- **Links**: Both internal and external links are supported

## Customization

### Theme

Edit `tailwind.config.js` to customize:
- Colors
- Typography
- Spacing
- Other design tokens

### Components

Create or modify components in `src/components/` to add new functionality or change the appearance.

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

Deploy to your preferred hosting platform (Vercel, Netlify, etc.).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own study documentation needs.