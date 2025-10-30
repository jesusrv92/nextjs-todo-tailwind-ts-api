import { render, screen, fireEvent } from '@testing-library/react'
import TodoItem from '../components/TodoItem'
import { describe, expect, test, vi } from 'vitest'

describe('TodoItem', () => {
  test('calls onToggle and onDelete', () => {
    const todo = { id: '1', title: 'Hello', completed: false }
    const onToggle = vi.fn()
    const onDelete = vi.fn()
    render(<TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />)

    // toggle checkbox
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(onToggle).toHaveBeenCalledWith('1')

    // delete button
    const btn = screen.getByRole('button', { name: /delete/i })
    fireEvent.click(btn)
    expect(onDelete).toHaveBeenCalledWith('1')
  })
})
