"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronDown, LayoutDashboard, LogOut, Settings, User } from "lucide-react"
import { ROUTES } from "@/components/layouts/constants"
import { useUserProfile } from "@/hooks/use-user-profile"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { motion } from "framer-motion"

interface UserMenuProps {
  user: any
  className?: string
}

export default function UserMenu({ user, className = "" }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { profile } = useUserProfile(user?.id)

  const handleSignOut = async () => {
    try {
      const supabase = createSupabaseBrowserClient()
      await supabase.auth.signOut()
      router.push(ROUTES.HOME)
      router.refresh()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const getDisplayName = () => {
    if (profile?.full_name) return profile.full_name
    if (profile?.username) return profile.username
    return user?.email?.split("@")[0] || "User"
  }

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    if (profile?.username) return profile.username.slice(0, 2).toUpperCase()
    return user?.email?.charAt(0).toUpperCase() || "U"
  }

  return (
    <div className={`relative ${className}`}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 rounded-full px-3 py-2 transition-all hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20"
          >
            <Avatar className="h-9 w-9 ring-2 ring-purple-500/30">
              <AvatarImage src={profile?.avatar_url || ""} alt={getDisplayName()} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-semibold text-white">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {getDisplayName()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </Button>
        </DropdownMenuTrigger>

        {/* Animated Dropdown with glassmorphism */}
        <DropdownMenuContent
          asChild
          align="end"
          className="border-0 bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="w-72"
          >
            <DropdownMenuLabel className="p-4 border-b border-white/10 dark:border-gray-800/40">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 ring-2 ring-purple-500/40">
                  <AvatarImage src={profile?.avatar_url || ""} alt={getDisplayName()} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{getDisplayName()}</p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href={ROUTES.DASHBOARD}
                  className="flex w-full items-center px-4 py-2 text-sm font-medium hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20"
                >
                  <LayoutDashboard className="mr-3 h-4 w-4 text-purple-500" />
                  Dashboard
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href={ROUTES.PROFILE}
                  className="flex w-full items-center px-4 py-2 text-sm font-medium hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20"
                >
                  <User className="mr-3 h-4 w-4 text-blue-500" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href={ROUTES.SETTINGS}
                  className="flex w-full items-center px-4 py-2 text-sm font-medium hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20"
                >
                  <Settings className="mr-3 h-4 w-4 text-indigo-500" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleSignOut}
              className="flex w-full items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
            >
              <LogOut className="mr-3 h-4 w-4 text-red-500" />
              Sign Out
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
