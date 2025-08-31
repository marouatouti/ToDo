'use client';
import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter(); // Pour rediriger après connexion
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  // Fonction appelée quand le formulaire est soumis
  const handleLogin = async (e) => {
    e.preventDefault(); // Empêche le rechargement

    // Appel Supabase pour se connecter
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMsg(error.message); // Affiche l'erreur si ça rate
    } else {
      setMsg("Connexion réussie !");
      router.push('/todos'); // Redirige vers la page des tâches
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h2 className="mb-3">Se connecter</h2>
        <form onSubmit={handleLogin} className="vstack gap-3">
          <input 
            type="email" 
            className="form-control" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            className="form-control" 
            placeholder="Mot de passe" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
          <button className="btn btn-primary">Se connecter</button>
        </form>
        {msg && <div className="alert alert-info mt-3">{msg}</div>}
      </div>
    </div>
  );
}
