import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /demo/extension)
  const path = request.nextUrl.pathname

  // Check if the path starts with /demo
  if (path.startsWith('/demo')) {
    // Here you can implement your authentication check
    // For example, check for a specific token, session, or environment variable
    const isAuthenticated = process.env.NEXT_PUBLIC_ENABLE_DEMO === 'true'

    if (!isAuthenticated) {
      // Redirect to home page or show an error
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/demo/:path*',
}
