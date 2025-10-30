'use client';
import { Todo } from '../lib/types';

export default function TodoItem({ todo, onToggle, onDelete } : {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2">
      <input
        id={`todo-${todo.id}`}
        type="checkbox"
        className="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <label htmlFor={`todo-${todo.id}`} className={`flex-1 ${todo.completed ? 'line-through text-slate-400' : ''}`}>
        {todo.title}
      </label>
      <button
        onClick={() => onDelete(todo.id)}
        className="btn"
        aria-label={`Delete ${todo.title}`}
        title="Delete"
      >
        ✕
      </button>
    </li>
  );
}
