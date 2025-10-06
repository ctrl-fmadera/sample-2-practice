import React from 'react'
import ProjectCard from './ProjectCard'

export default function ProjectList({projects, onAddTaskClick}){
  if (!projects?.length) return <div className="card small muted">No projects found.</div>

  return (
    <div style={{display:'flex', flexDirection:'column', gap:12}}>
      {projects.map(p => (
        <ProjectCard key={p._id} project={p} onAddTaskClick={onAddTaskClick} />
      ))}
    </div>
  )
}
