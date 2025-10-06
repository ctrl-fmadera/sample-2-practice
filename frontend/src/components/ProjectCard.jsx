import React from 'react'
import TaskItem from './TaskItem'

export default function ProjectCard({project, onAddTaskClick}){
  return (
    <div className="card" aria-labelledby={`proj-${project._id}`}>
      <div className="project-header">
        <div>
          <h4 id={`proj-${project._id}`} style={{margin:0}}>{project.name}</h4>
          <div className="small muted">{project.description}</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn ghost" onClick={()=>onAddTaskClick(project)}>Add task</button>
        </div>
      </div>

      <div className="project-tasks">
        {project.tasks?.length ? project.tasks.map(t => (
          <TaskItem key={t._id} task={t} />
        )) : <div className="small muted">No tasks yet</div>}
      </div>
    </div>
  )
}
