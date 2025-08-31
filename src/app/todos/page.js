'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function TodosPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState(''); // titre de la nouvelle tâche

  useEffect(() => {
    const fetchTasks = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        router.push('/login');
        return;
      }

      const currentUser = sessionData.session.user;
      setUser(currentUser);

      const { data: tasksData, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });

      if (error) console.log('Erreur récupération tâches:', error.message);
      else setTasks(tasksData);

      setLoading(false);
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask) return;

    const { data, error } = await supabase.from('tasks').insert([
      { title: newTask, user_id: user.id }
    ]);

    if (error) {
      console.log('Erreur ajout tâche:', error.message);
    } else {
      setTasks([data[0], ...tasks]); // ajoute la nouvelle tâche en haut
      setNewTask(''); // vide le champ
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-3">Mes tâches de {user?.email}</h2>

        {/* Formulaire pour ajouter une tâche */}
        <form onSubmit={handleAddTask} className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nouvelle tâche"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Ajouter
          </button>
        </form>

        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item">
              {task.title} {task.is_complete ? '(Terminé)' : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
