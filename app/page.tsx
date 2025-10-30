'use client';
import { useMemo } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import useTodos from '../lib/useTodos';

export default function Page() {
  const { todos, loading, error, add, toggle, remove, clearCompleted } = useTodos();
  const [filter, setFilter] = React.useState<'all' | 'active' | 'completed'>('all');

  const filtered = useMemo(() => {
    switch (filter) {
      case 'active': return todos.filter(t => !t.completed);
      case 'completed': return todos.filter(t => t.completed);
      default: return todos;
    }
  }, [todos, filter]);

  const remaining = todos.filter(t => !t.completed).length;

  return (
    <main className="space-y-6">
      <header className="text-center space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Next.js To-Do (TS)</h1>
        <p className="text-slate-600">TypeScript + Tailwind CSS • Data via Next API routes</p>
      </header>

      <section className="container-card space-y-4">
        <TodoForm onAdd={async (title) => { try { await add(title); } catch {} }} />

        <div className="flex items-center justify-between gap-2">
          <div className="space-x-2">
            <button onClick={() => setFilter('all')} className={`filter-btn ${filter==='all' ? 'filter-btn-active' : ''}`}>All</button>
            <button onClick={() => setFilter('active')} className={`filter-btn ${filter==='active' ? 'filter-btn-active' : ''}`}>Active</button>
            <button onClick={() => setFilter('completed')} className={`filter-btn ${filter==='completed' ? 'filter-btn-active' : ''}`}>Completed</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge">{remaining} left</span>
            <button onClick={clearCompleted} className="btn">Clear completed</button>
          </div>
        </div>

        {loading ? <p className="text-center text-slate-500">Loading…</p> :
         error ? <p className="text-center text-red-600">{error}</p> :
         <TodoList todos={filtered} onToggle={toggle} onDelete={remove} />}
      </section>

      <footer className="text-center text-sm text-slate-500">
        Built with Next.js App Router • API routes persist to a JSON file (server-side)
      </footer>
    </main>
  );
}
