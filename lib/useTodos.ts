'use client';

import { useCallback, useEffect, useState } from 'react';
import { Todo } from './types';

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/todos');
      const data: Todo[] = await res.json();
      setTodos(data);
      setError(null);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const add = useCallback(async (title: string) => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error('Failed to add');
    const todo: Todo = await res.json();
    setTodos(prev => [todo, ...prev]);
  }, []);

  const toggle = useCallback(async (id: string) => {
    const current = todos.find(t => t.id === id);
    if (!current) return;
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !current.completed }),
    });
    if (!res.ok) {
      // revert on failure
      setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: current.completed } : t));
    }
  }, [todos]);

  const remove = useCallback(async (id: string) => {
    const old = todos;
    setTodos(prev => prev.filter(t => t.id !== id));
    const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    if (!res.ok) setTodos(old); // revert
  }, [todos]);

  const clearCompleted = useCallback(async () => {
    const completed = todos.filter(t => t.completed);
    await Promise.all(completed.map(t => remove(t.id)));
  }, [todos, remove]);

  return { todos, loading, error, refresh, add, toggle, remove, clearCompleted };
}
