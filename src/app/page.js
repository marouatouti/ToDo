'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/login'); // pas connecté → redirige vers login
      } else {
        router.push('/todos'); // connecté → redirige vers todos
      }
    };
    checkUser();
  }, []);

  return null; // la page est vide, elle sert juste à rediriger
}
