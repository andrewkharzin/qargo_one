'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/components/layouts/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useUserProfile } from '@/hooks/use-user-profile';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

import { ChevronDown, LayoutDashboard, LogOut, Settings, User } from 'lucide-react';

interface UserMenuProps {
    user: any;
    className?: string;
}

export default function UserMenu({ user, className = '' }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { profile, loading } = useUserProfile(user?.id);

    const handleSignOut = async () => {
        try {
            const supabase = createSupabaseBrowserClient();
            await supabase.auth.signOut();
            router.push(ROUTES.HOME);
            router.refresh();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const getDisplayName = () => {
        if (profile?.full_name) return profile.full_name;
        if (profile?.username) return profile.username;
        return user?.email?.split('@')[0] || 'User';
    };

    const getInitials = () => {
        if (profile?.full_name) {
            return profile.full_name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
        }
        if (profile?.username) {
            return profile.username.slice(0, 2).toUpperCase();
        }
        return user?.email?.charAt(0).toUpperCase() || 'U';
    };

    return (
        <div className={`relative ${className}`}>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='ghost'
                        className='flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'>
                        <Avatar className='h-8 w-8'>
                            <AvatarImage src={profile?.avatar_url || ''} alt={getDisplayName()} />
                            <AvatarFallback className='bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-semibold text-white'>
                                {getInitials()}
                            </AvatarFallback>
                        </Avatar>
                        <div className='hidden text-left sm:block'>
                            <p className='text-sm font-medium text-gray-900 dark:text-white'>{getDisplayName()}</p>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>{user?.email}</p>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-64' align='end'>
                    <DropdownMenuLabel className='p-4'>
                        <div className='flex items-center gap-3 pb-3'>
                            <Avatar className='h-10 w-10'>
                                <AvatarImage src={profile?.avatar_url || ''} alt={getDisplayName()} />
                                <AvatarFallback className='bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
                                    {getInitials()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className='text-sm font-medium text-gray-900 dark:text-white'>{getDisplayName()}</p>
                                <p className='truncate text-xs text-gray-500 dark:text-gray-400'>{user?.email}</p>
                            </div>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Link
                                href={ROUTES.DASHBOARD}
                                className='flex w-full items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'>
                                <LayoutDashboard className='mr-3 h-4 w-4' />
                                Dashboard
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link
                                href={ROUTES.PROFILE}
                                className='flex w-full items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'>
                                <User className='mr-3 h-4 w-4' />
                                Profile
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link
                                href={ROUTES.SETTINGS}
                                className='flex w-full items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'>
                                <Settings className='mr-3 h-4 w-4' />
                                Settings
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={handleSignOut}
                        className='flex w-full items-center px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'>
                        <LogOut className='mr-3 h-4 w-4' />
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
