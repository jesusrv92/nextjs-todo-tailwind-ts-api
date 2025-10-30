import { afterEach, beforeEach, expect, test } from 'vitest'
import path from 'path'
import { promises as fs } from 'fs'
import { GET, POST } from '../app/api/todos/route'
import { DELETE as DELETE_ID, PATCH as PATCH_ID } from '../app/api/todos/[id]/route'

const TMP = path.join(process.cwd(), '.tmp-test-db.json')

beforeEach(async () => {
  process.env.TODO_DB_PATH = TMP
  await fs.writeFile(TMP, '[]', 'utf8').catch(() => {})
})

afterEach(async () => {
  await fs.rm(TMP, { force: true }).catch(() => {})
})

test('POST creates a todo and GET lists it', async () => {
  const req = new Request('http://test/api/todos', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ title: 'Write tests' }),
  })
  const res = await POST(req)
  expect(res.status).toBe(201)
  const created = await res.json()
  expect(created.title).toBe('Write tests')

  const listRes = await GET(new Request('http://test/api/todos'))
  const list = await listRes.json()
  expect(list.length).toBe(1)
})

test('PATCH toggles completed; DELETE removes', async () => {
  // create
  const create = await POST(new Request('http://test/api/todos', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ title: 'Toggle me' }),
  }))
  const todo = await create.json()

  // toggle
  const patch = await PATCH_ID(new Request('http://test/api/todos/' + todo.id, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ completed: true }),
  }), { params: { id: todo.id } })
  expect(patch.status).toBe(200)
  const updated = await patch.json()
  expect(updated.completed).toBe(true)

  // delete
  const del = await DELETE_ID(new Request('http://test/api/todos/' + todo.id, { method: 'DELETE' }), { params: { id: todo.id } })
  expect(del.status).toBe(204)
})
