import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { MDXProvider } from '@mdx-js/react'
import { AuthProvider } from '@/contexts/AuthContext'
import Layout from '@/components/layout/Layout'
import MDXComponents from '@/components/content/MDXComponents'
import '@/styles/globals.css'
import 'katex/dist/katex.min.css'
import 'easymde/dist/easymde.min.css'
import '@/styles/editor-dark.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class">
        <MDXProvider components={MDXComponents}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MDXProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}