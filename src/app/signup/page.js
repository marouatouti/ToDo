'use client'; // Indique que ce composant fonctionne côté navigateur
import { useState } from 'react'; 
import { supabase } from '../../../lib/supabaseClient'; 

export default function SignupPage() {
  // State pour stocker ce que l'utilisateur tape
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null); // Message pour l'utilisateur

  // Fonction appelée quand le formulaire est soumis
  const handleSignup = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Appel Supabase pour créer un utilisateur
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMsg(error.message); // Affiche l'erreur si ça rate
    } else {
      setMsg("Inscription réussie ! Vérifie ton email."); // Message de succès
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h2 className="mb-3">Créer un compte</h2>
        <form onSubmit={handleSignup} className="vstack gap-3">
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
          <button className="btn btn-primary">S'inscrire</button>
        </form>
        {/* Affiche un message si error ou succès */}
        {msg && <div className="alert alert-info mt-3">{msg}</div>}
      </div>
    </div>
  );
}
