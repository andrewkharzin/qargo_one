'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Plane, Gauge, BarChart2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const features = [
    { name: 'Real-time Booking Management', description: 'Instant access to all flight bookings with real-time updates', icon: Gauge },
    { name: 'Flight Status Monitoring', description: 'Live tracking of all flights with delay alerts', icon: Plane },
    { name: 'Revenue Analytics', description: 'Detailed revenue reports and performance metrics', icon: BarChart2 },
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      setLoginSuccess(true)
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loginSuccess) {
      const timer1 = setTimeout(() => setShowSuccess(true), 500)
      const timer2 = setTimeout(() => router.push('/dashboard/notes'), 5000)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [loginSuccess, router])

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Left: Login Form */}
      <motion.div className="flex-1 flex items-center justify-center p-8" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center space-x-2">
            {/* <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg" /> */}
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Login</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="mt-1 w-full" />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-200">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="mt-1 w-full" />
            </div>

            <Button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account? <a href="/register" className="text-blue-600 hover:underline dark:text-blue-400">Sign up</a>
          </p>
        </div>
      </motion.div>

      {/* Right: Dashboard Info */}
      {/* Right: Dashboard Info with background effects */}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="flex-1 relative hidden lg:flex items-center justify-center p-10 bg-gradient-to-br from-slate-950 via-purple-950 to-blue-950  overflow-hidden"
>
  {/* Parallax Stars Background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="stars-far"></div>
    <div className="stars-medium"></div>
    <div className="stars-close"></div>
  </div>

       {/* Information Flow Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main Information Flow Lines */}
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 animate-flow-line"></div>
        <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30 animate-flow-line animation-delay-1000"></div>
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-35 animate-flow-line animation-delay-2000"></div>
        <div className="absolute top-2/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-25 animate-flow-line animation-delay-3000"></div>

        {/* Vertical Information Flows */}
        <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-30 animate-flow-vertical"></div>
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-25 animate-flow-vertical animation-delay-1500"></div>
        <div className="absolute top-0 left-3/4 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-20 animate-flow-vertical animation-delay-3000"></div>

        {/* Diagonal Information Flows */}
        <div className="absolute top-0 left-0 w-1 h-1 bg-gradient-to-br from-blue-400 to-transparent opacity-60 animate-flow-diagonal"></div>
        <div className="absolute top-0 right-0 w-1 h-1 bg-gradient-to-bl from-purple-400 to-transparent opacity-60 animate-flow-diagonal animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-1 h-1 bg-gradient-to-tr from-cyan-400 to-transparent opacity-60 animate-flow-diagonal animation-delay-4000"></div>
        <div className="absolute bottom-0 right-0 w-1 h-1 bg-gradient-to-tl from-indigo-400 to-transparent opacity-60 animate-flow-diagonal animation-delay-6000"></div>

        {/* Information Wave Effects */}
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 via-purple-400 to-transparent opacity-20 animate-wave-flow"></div>
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 via-cyan-400 to-transparent opacity-15 animate-wave-flow animation-delay-2000"></div>
        <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 via-indigo-400 to-transparent opacity-10 animate-wave-flow animation-delay-4000"></div>
      </div>

  {/* Dashboard Info Content */}
  <div className="relative mx-auto flex max-w-md flex-col space-y-8 text-white z-10">
    <div className="space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">AEROQ</h2>
      <h3 className="text-2xl font-semibold text-purple-300">Agent Management Dashboard</h3>
      {!showSuccess ? (
        <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Your comprehensive tool for airline booking management and customer service.
        </p>
      ) : (
        <div className="space-y-2 text-center">
          <p className="text-green-400 font-medium">Login success!</p>
          <p className="text-gray-300">{email}</p>
        </div>
      )}
    </div>

    {!showSuccess && (
      <div className="space-y-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="flex items-start space-x-4 rounded-lg bg-white/10 p-4 backdrop-blur-sm"
          >
            <div className="mt-1 rounded-md bg-purple-600/80 p-2">
              <feature.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium">{feature.name}</h4>
              <p className="text-sm text-gray-300">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    )}
  </div>
</motion.div>

    </main>
  )
}
