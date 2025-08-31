'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav className="navbar navbar-dark bg-dark p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand text-white" href="/">To-do App</a>
        <div>
          {user ? (
            <>
              <span className="text-white me-3">{user.email}</span>
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <a className="btn btn-outline-light me-2" href="/login">Connexion</a>
              <a className="btn btn-outline-light" href="/signup">Inscription</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
