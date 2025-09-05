// ==========================
// components/auth/ProtectedRoute.tsx (Server Component wrapper)
// ==========================
import React from 'react'
import { requireAuth, requireRole } from '@/lib/auth/route-guards'


export default async function ProtectedRoute({
children,
role,
}: {
children: React.ReactNode
role?: 'guest' | 'user' | 'agent' | 'admin'
}) {
if (role) await requireRole(role)
else await requireAuth()
return <>{children}</>
}