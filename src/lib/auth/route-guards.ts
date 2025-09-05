// ==========================
// lib/auth/route-guards.ts (server-only helpers for RSC + actions)
// ==========================
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/supabase/server'
import { getUserRoles, type Role } from '@/lib/auth/roles'


export async function requireAuth(redirectTo: string = '/login') {
const session = await getSession()
if (!session) redirect(`${redirectTo}`)
return session
}


export async function requireRole(required: Role | Role[], fallback = '/unauthorized') {
const session = await requireAuth()
const have = await getUserRoles(session.user)
const need = Array.isArray(required) ? required : [required]
const ok = need.some((r) => have.includes(r))
if (!ok) redirect(fallback)
return session
}