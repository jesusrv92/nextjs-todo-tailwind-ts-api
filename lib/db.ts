import { promises as fs } from 'fs';
import path from 'path';
import { Todo } from './types';

const DB_PATH = process.env.TODO_DB_PATH || path.join(process.cwd(), 'data', 'todos.json');

async function ensureFile() {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, '[]', 'utf8');
  }
}

export async function listTodos(): Promise<Todo[]> {
  await ensureFile();
  const txt = await fs.readFile(DB_PATH, 'utf8');
  try {
    return JSON.parse(txt) as Todo[];
  } catch {
    return [];
  }
}

export async function saveTodos(todos: Todo[]): Promise<void> {
  await ensureFile();
  await fs.writeFile(DB_PATH, JSON.stringify(todos, null, 2), 'utf8');
}

export async function addTodo(title: string): Promise<Todo> {
  const todos = await listTodos();
  const todo: Todo = { id: crypto.randomUUID(), title, completed: false };
  await saveTodos([todo, ...todos]);
  return todo;
}

export async function updateTodo(id: string, patch: Partial<Todo>): Promise<Todo | null> {
  const todos = await listTodos();
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return null;
  const updated: Todo = { ...todos[idx], ...patch };
  todos[idx] = updated;
  await saveTodos(todos);
  return updated;
}

export async function deleteTodo(id: string): Promise<boolean> {
  const todos = await listTodos();
  const filtered = todos.filter(t => t.id !== id);
  const changed = filtered.length !== todos.length;
  if (changed) await saveTodos(filtered);
  return changed;
}
