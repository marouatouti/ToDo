//importer la fonction pour la connexion à Supabase
import { createClient } from '@supabase/supabase-js';

// récupèrer les infos depuis .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// crée un "client" Supabase qu’on peut utiliser dans l’app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
