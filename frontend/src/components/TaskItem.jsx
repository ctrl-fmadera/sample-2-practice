import React from 'react'

export default function TaskItem({ task }){
  return (
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, padding:10, borderRadius:8, background:'#fafafa'}}>
      <div>
        <div style={{fontWeight:600}}>{task.title}</div>
        {task.description && <div className="small muted">{task.description}</div>}
      </div>
      <div className="small muted">{new Date(task.createdAt || task.updatedAt || Date.now()).toLocaleDateString()}</div>
    </div>
  )
}
