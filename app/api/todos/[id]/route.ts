import { deleteTodo, updateTodo } from '../../../../lib/db';

export const runtime = 'nodejs';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updated = await updateTodo(params.id, body);
    if (!updated) return Response.json({ error: 'not found' }, { status: 404 });
    return Response.json(updated, { status: 200 });
  } catch {
    return Response.json({ error: 'invalid json' }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const ok = await deleteTodo(params.id);
  if (!ok) return Response.json({ error: 'not found' }, { status: 404 });
  return new Response(null, { status: 204 });
}
