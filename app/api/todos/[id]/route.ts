import { deleteTodo, updateTodo } from "../../../../lib/db";

export const runtime = "nodejs";
type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  try {
    const body = await request.json();
    const { id } = await params;
    const updated = await updateTodo(id, body);
    if (!updated) return Response.json({ error: "not found" }, { status: 404 });
    return Response.json(updated, { status: 200 });
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = await params;

  const ok = await deleteTodo(id);
  if (!ok) return Response.json({ error: "not found" }, { status: 404 });
  return new Response(null, { status: 204 });
}
