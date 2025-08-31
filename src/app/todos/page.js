'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function TodosPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/login'); // pas connecté → redirige vers login
      } else {
        setUser(data.session.user);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-3">Mes tâches de {user?.email}</h2>
        <ul className="list-group">
          {/* Ici on mettra les vraies tâches plus tard */}
        </ul>
      </div>
    </div>
  );
}
