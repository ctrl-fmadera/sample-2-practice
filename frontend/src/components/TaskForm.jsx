import React, { useState } from 'react'

export default function TaskForm({ onCreate, initialProject=null, defaultTitle='' }){
  const [form, setForm] = useState({ title: defaultTitle || '', description: '', projectId: initialProject?._id || '' })
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  const submit = async (e) => {
    e?.preventDefault()
    setErr(null)
    if (!form.title.trim()) return setErr('Title required')
    setLoading(true)
    try {
      await onCreate(form)
      setForm({ title:'', description:'', projectId: initialProject?._id || '' })
    } catch (err) {
      setErr(err?.error || err?.message || 'Failed to create task')
    } finally { setLoading(false) }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h3 style={{marginTop:0}}>Create task</h3>
      {err && <div style={{color:'var(--danger)', marginBottom:8}}>{err}</div>}
      <input placeholder="Task title" value={form.title}
        onChange={e=>setForm(s=>({...s, title:e.target.value}))} />
      <textarea placeholder="Description (optional)" rows="2" value={form.description}
        onChange={e=>setForm(s=>({...s, description:e.target.value}))} />
      {/* optional project select */}
      <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
        <button type="button" className="btn ghost" onClick={()=>setForm({ title:'', description:'', projectId: initialProject?._id || '' })}>Clear</button>
        <button className="btn">{loading ? 'Saving...' : 'Create Task'}</button>
      </div>
    </form>
  )
}
