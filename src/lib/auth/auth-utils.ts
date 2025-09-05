// src/lib/auth/auth-utils.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getSession() {
  try {
    // Получаем cookies асинхронно
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )

    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) throw error
    return session
  } catch (error) {
    console.error('Get session error:', error)
    return null
  }
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user || null
}

export async function requireAuth(redirectTo: string = '/login') {
  const session = await getSession()

  if (!session) {
    redirect(redirectTo)
  }

  return session
}

export async function requireRole(role: string, redirectTo: string = '/unauthorized') {
  const session = await requireAuth()

  // Здесь можно добавить проверку ролей из вашей БД
  const userRoles = await getUserRoles(session.user.id)

  if (!userRoles.includes(role)) {
    redirect(redirectTo)
  }

  return session
}

async function getUserRoles(userId: string): Promise<string[]> {
  // Реализация получения ролей пользователя из БД
  // Например, из таблицы user_roles
  return ['user'] // Заглушка
}