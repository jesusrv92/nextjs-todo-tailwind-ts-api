"use client";
import { useState } from "react";

export default function TodoForm({
  onAdd,
}: {
  onAdd: (title: string) => void;
}) {
  const [title, setTitle] = useState("");
  function submit(e: React.FormEvent) {
    e.preventDefault();
    onAdd(title);
    setTitle("");
  }
  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <input
        className="input"
        type="text"
        placeholder="Add a new task…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="New task title"
      />
      <button className="btn btn-primary" type="submit">
        Add
      </button>
    </form>
  );
}
