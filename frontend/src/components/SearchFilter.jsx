import React from 'react'

export default function SearchFilter({ value, onChange, placeholder='Search projects or tasks' }){
  return (
    <div className="card" style={{display:'flex', gap:8, alignItems:'center'}}>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} />
      <div className="small muted">Filter</div>
    </div>
  )
}
