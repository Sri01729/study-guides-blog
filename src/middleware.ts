import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that don't require authentication
const PUBLIC_PATHS = ['/', '/login', '/signup']

// Routes that require authentication
const PROTECTED_PATHS = ['/new-document']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  try {
    const { data: { session }, error } = await supabase.auth.getSession()

    const path = req.nextUrl.pathname
    const isAuthPage = PUBLIC_PATHS.includes(path)
    const isProtectedPage = PROTECTED_PATHS.some(protectedPath => path.startsWith(protectedPath))

    console.log('Path:', path, 'Auth Page:', isAuthPage, 'Protected:', isProtectedPage, 'Session:', !!session)

    // Redirect to login if trying to access protected routes without auth
    if (!session && isProtectedPage) {
      const redirectUrl = new URL('/login', req.url)
      redirectUrl.searchParams.set('redirectTo', path)
      return NextResponse.redirect(redirectUrl)
    }

    // Redirect authenticated users away from auth pages
    if (session && isAuthPage) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return res
  } catch (err) {
    console.error('Middleware error:', err)
    // Only redirect to login for protected routes on error
    if (PROTECTED_PATHS.some(protectedPath => req.nextUrl.pathname.startsWith(protectedPath))) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    return res
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}