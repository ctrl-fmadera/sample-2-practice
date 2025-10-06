import React, { useState } from 'react'

export default function ProjectForm({ onCreate, disabled=false }){
  const [form, setForm] = useState({ name:'', description:'' })
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e?.preventDefault()
    setErr(null)
    if (!form.name.trim()) return setErr('Project name is required')
    setLoading(true)
    try {
      await onCreate(form)
      setForm({ name:'', description:'' })
    } catch (err) {
      setErr(err.error || err.message || 'Failed to create project')
    } finally { setLoading(false) }
  }

  return (
    <form className="card" onSubmit={submit} aria-label="Create project form">
      <h3 style={{marginTop:0}}>Create project</h3>
      {err && <div style={{color:'var(--danger)', marginBottom:8}}>{err}</div>}
      <div style={{display:'flex', flexDirection:'column', gap:8}}>
        <input placeholder="Project name" value={form.name}
          onChange={e=>setForm(s=>({ ...s, name:e.target.value }))} />
        <textarea placeholder="Description (optional)" rows="3" value={form.description}
          onChange={e=>setForm(s=>({ ...s, description:e.target.value }))} />
        <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
          <button type="button" className="btn ghost" onClick={()=>setForm({name:'',description:''})}>Clear</button>
          <button className="btn" disabled={disabled || loading}>{loading ? 'Creating...' : 'Create'}</button>
        </div>
      </div>
    </form>
  )
}
