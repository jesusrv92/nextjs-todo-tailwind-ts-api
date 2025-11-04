"use client";
import TodoItem from "./TodoItem";
import { Todo } from "../lib/types";

export default function TodoList({
  todos,
  onToggle,
  onDelete,
}: {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  if (!todos?.length) {
    return (
      <p className="text-center text-slate-500">
        Nothing here yet — add your first task!
      </p>
    );
  }
  return (
    <ul className="space-y-2">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
