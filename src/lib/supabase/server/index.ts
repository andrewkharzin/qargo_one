// ==========================
import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'


export async function createSupabaseServerClient() {
const cookieStore = await cookies()


return createServerClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
{
cookies: {
get(name: string) {
return cookieStore.get(name)?.value
},
set(name: string, value: string, options: CookieOptions) {
try {
cookieStore.set({ name, value, ...options })
} catch {
// Server Components can't set cookies during render; middleware handles refresh
}
},
remove(name: string, options: CookieOptions) {
try {
cookieStore.set({ name, value: '', maxAge: 0, ...options })
} catch {
// no-op
}
},
},
}
)
}


export async function getSession() {
const supabase = await createSupabaseServerClient()
const {
data: { session },
} = await supabase.auth.getSession()
return session
}


export async function getCurrentUser() {
const session = await getSession()
return session?.user ?? null
}