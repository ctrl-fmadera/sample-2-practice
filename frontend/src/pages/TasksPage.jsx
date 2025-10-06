import React, { useEffect, useState } from 'react'
import { getTasks, createTask } from '../api/api'
import TaskForm from '../components/TaskForm'

export default function TasksPage(){
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  const load = async () => {
    setLoading(true); setErr(null)
    try {
      const res = await getTasks()
      setTasks(res.data || [])
    } catch (e) { setErr(e?.error || 'Failed to fetch tasks') }
    finally { setLoading(false) }
  }

  useEffect(()=>{ load() }, [])

  const handleCreateTask = async (payload) => {
    const res = await createTask(payload)
    setTasks(t => [res.data, ...t])
  }

  return (
    <div style={{display:'flex', gap:12, flexDirection:'column'}}>
      <TaskForm onCreate={handleCreateTask} />
      <div className="card">
        <h3 style={{marginTop:0}}>All tasks</h3>
        {loading ? <div className="small muted">Loading...</div> : err ? <div style={{color:'var(--danger)'}}>{err}</div> : (
          tasks.length ? tasks.map(t => (
            <div key={t._id} style={{marginBottom:8}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <div style={{fontWeight:600}}>{t.title}</div>
                  <div className="small muted">{t.description}</div>
                </div>
                <div className="small muted">{new Date(t.createdAt || Date.now()).toLocaleDateString()}</div>
              </div>
            </div>
          )) : <div className="small muted">No tasks created yet.</div>
        )}
      </div>
    </div>
  )
}
