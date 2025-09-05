// ==========================
// lib/auth/roles.ts
// - Strategy: Prefer roles embedded in JWT custom claims (app_metadata.roles)
// as per Supabase custom claims hook. Falls back to a public table if needed.
// ==========================
import type { User } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '@/lib/supabase/server'


export type Role = 'guest' | 'user' | 'agent' | 'admin'


export function extractRolesFromJWT(user: User): Role[] {
const fromApp = (user.app_metadata?.roles as string[] | undefined) ?? []
const fromUser = (user.user_metadata?.roles as string[] | undefined) ?? []
const roles = Array.from(new Set([...(fromApp as string[]), ...(fromUser as string[])])).filter(Boolean)
return (roles.length ? roles : ['user']) as Role[]
}


export async function fetchRolesFromDB(userId: string): Promise<Role[]> {
const supabase = await createSupabaseServerClient()
const { data, error } = await supabase
.from('user_roles')
.select('role')
.eq('user_id', userId)


if (error) return ['user']
const roles = (data ?? []).map((r: any) => r.role)
return (roles.length ? roles : ['user']) as Role[]
}


export async function getUserRoles(user: User) {
const viaJwt = extractRolesFromJWT(user)
if (viaJwt && viaJwt.length) return viaJwt
return fetchRolesFromDB(user.id)
}