// ==========================
// Example usage: app/admin/page.tsx
// ==========================
import ProtectedRoute from '@/components/auth/ProtectedRoute'


export default async function AdminPage() {
return (
<ProtectedRoute role="admin">
<div className="p-6">Admin dashboard…</div>
</ProtectedRoute>
)
}