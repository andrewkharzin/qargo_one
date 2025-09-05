// ==========================
// middleware.ts (Edge) — auth refresh + route protection + basic RBAC
// ==========================
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'


// Configure route protection
const publicOnly = ['/login', '/register', '/forgot-password', '/reset-password']
const protectedRoutes = ['/dashboard', '/profile', '/settings', '/notes', '/booking', '/admin']


// Optional: role gates by prefix (checked if session exists)
const roleRequirements: Record<string, string[]> = {
'/admin': ['admin'],
}


export async function middleware(request: NextRequest) {
let response = NextResponse.next({
request: { headers: new Headers(request.headers) },
})


const supabase = createServerClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
{
cookies: {
get(name: string) {
return request.cookies.get(name)?.value
},
set(name: string, value: string, options: any) {
response.cookies.set({ name, value, ...options })
},
remove(name: string, options: any) {
response.cookies.set({ name, value: '', maxAge: 0, ...options })
},
},
}
)


const {
data: { session },
} = await supabase.auth.getSession()


const path = request.nextUrl.pathname
const isProtected = protectedRoutes.some((p) => path.startsWith(p))
const isPublicOnly = publicOnly.some((p) => path.startsWith(p))


// Not signed in but trying to access protected
if (isProtected && !session) {
const url = new URL('/login', request.url)
url.searchParams.set('redirectTo', path)
return NextResponse.redirect(url)
}


// Signed in but trying to access public-only (login, etc.)
if (isPublicOnly && session) {
const redirectTo = request.nextUrl.searchParams.get('redirectTo') || '/dashboard'
return NextResponse.redirect(new URL(redirectTo, request.url))
}


// Lightweight role guard using JWT claims to avoid DB calls at the edge
if (session) {
const roles: string[] =
((session.user?.app_metadata as any)?.roles as string[] | undefined) ||
((session.user?.user_metadata as any)?.roles as string[] | undefined) ||
[]


for (const [prefix, need] of Object.entries(roleRequirements)) {
if (path.startsWith(prefix)) {
const ok = need.some((r) => roles.includes(r))
if (!ok) return NextResponse.redirect(new URL('/unauthorized', request.url))
}
}
}


return response
}


export const config = {
matcher: [
// Skip static files & images
'/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
],
}