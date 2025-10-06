const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

async function handle(res){
  const json = await res.json().catch(()=>({}))
  if (!res.ok) throw json
  return json
}

function tokenHeader(){
  const t = localStorage.getItem('token')
  return t ? { Authorization: `Bearer ${t}` } : {}
}

/* Projects */
export const getProjects = () =>
  fetch(`${BASE}/projects`, { headers: { ...tokenHeader() } }).then(handle)

export const createProject = (payload) =>
  fetch(`${BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...tokenHeader() },
    body: JSON.stringify(payload)
  }).then(handle)

/* Tasks */
export const getTasks = () =>
  fetch(`${BASE}/tasks`, { headers: { ...tokenHeader() } }).then(handle)

export const createTask = (payload) =>
  fetch(`${BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...tokenHeader() },
    body: JSON.stringify(payload)
  }).then(handle)

/* Link an existing task to a project (backend should support this)
   POST /api/projects/:projectId/tasks  with { taskId } */
export const addTaskToProject = (projectId, taskId) =>
  fetch(`${BASE}/projects/${projectId}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...tokenHeader() },
    body: JSON.stringify({ taskId })
  }).then(handle)
