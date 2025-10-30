import { addTodo, listTodos } from '../../../lib/db';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const todos = await listTodos();
  return Response.json(todos, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = String(body?.title || '').trim();
    if (!title) {
      return Response.json({ error: 'title required' }, { status: 400 });
    }
    const todo = await addTodo(title);
    return Response.json(todo, { status: 201 });
  } catch {
    return Response.json({ error: 'invalid json' }, { status: 400 });
  }
}
