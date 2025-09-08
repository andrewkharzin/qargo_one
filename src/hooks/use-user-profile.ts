// hooks/use-user-profile.ts
import { useState, useEffect } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  company: string | null;
  department: string | null;
  phone: string | null;
  telegram_link: string | null;
  created_at: string;
  updated_at: string;
}

export function useUserProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const supabase = createSupabaseBrowserClient();

        const { data, error } = await supabase
          .from('user_profile')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) {
          throw error;
        }

        setProfile(data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profile, loading, error };
}
