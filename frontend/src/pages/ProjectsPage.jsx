import React, { useEffect, useState } from 'react'
import { getProjects, createProject, getTasks, createTask, addTaskToProject } from '../api/api'
import ProjectForm from '../components/ProjectForm'
import ProjectList from '../components/ProjectList'
import TaskForm from '../components/TaskForm'
import SearchFilter from '../components/SearchFilter'

export default function ProjectsPage(){
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)
  const [selectedProjectForAdd, setSelectedProjectForAdd] = useState(null)

  const load = async () => {
    setLoading(true); setErr(null)
    try {
      const [pjRes, tRes] = await Promise.all([getProjects(), getTasks()])
      setProjects(pjRes.data || [])
      setTasks(tRes.data || [])
    } catch (e) {
      console.error(e); setErr(e?.error || 'Failed to load')
    } finally { setLoading(false) }
  }

  useEffect(()=>{ load() }, [])

  const handleCreateProject = async (payload) => {
    const res = await createProject(payload)
    setProjects(p => [res.data, ...p])
  }

  const handleCreateTask = async (payload) => {
    // if payload includes projectId, backend may auto-link
    const res = await createTask(payload)
    setTasks(t => [res.data, ...t])
    // optionally add to project locally if returned with project
    if (payload.projectId){
      setProjects(p => p.map(pr => pr._id === payload.projectId ? { ...pr, tasks: [res.data, ...(pr.tasks||[])] } : pr))
    }
  }

  const handleAddTaskToProject = async (project) => {
    // open small flow: choose an existing task and link it
    setSelectedProjectForAdd(project)
    const taskToAdd = tasks.find(t => !project.tasks?.some(pt=>pt._id===t._id))
    if (!taskToAdd) {
      // if none available, create one automatically (simple prototype)
      const newTask = await createTask({ title: `Task for ${project.name}`, description:'' })
      await addTaskToProject(project._id, newTask.data._id)
      setProjects(p => p.map(pr => pr._id === project._1 ? ({...pr, tasks:[newTask.data, ...pr.tasks]}) : pr))
      return load()
    }
    // add first available task
    await addTaskToProject(project._id, taskToAdd._id)
    // refresh
    await load()
    setSelectedProjectForAdd(null)
  }

  // search: check project name and task titles
  const filtered = projects.filter(p => {
    if (!query) return true
    const q = query.toLowerCase()
    if (p.name.toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q)) return true
    if ((p.tasks||[]).some(t => t.title.toLowerCase().includes(q))) return true
    return false
  })

  return (
    <div style={{display:'flex', flexDirection:'column', gap:12}}>
      <div className="grid">
        <div>
          <ProjectForm onCreate={handleCreateProject} />
          <div style={{height:12}} />
          <SearchFilter value={query} onChange={setQuery} />
          <div style={{height:12}} />
          <div className="card">
            <h3 style={{marginTop:0}}>All projects</h3>
            {loading ? <div className="small muted">Loading projects...</div> : (
              err ? <div style={{color:'var(--danger)'}}>{err}</div> :
              <ProjectList projects={filtered} onAddTaskClick={handleAddTaskToProject} />
            )}
          </div>
        </div>

        <aside>
          <TaskForm onCreate={handleCreateTask} />
          <div style={{height:12}} />
          <div className="card">
            <h4 style={{marginTop:0}}>Your tasks</h4>
            {tasks.length ? tasks.slice(0,6).map(t => (
              <div key={t._id} style={{marginBottom:8}}>
                <div style={{fontWeight:600}}>{t.title}</div>
                <div className="small muted">{t.description}</div>
              </div>
            )) : <div className="small muted">No tasks yet</div>}
          </div>
        </aside>
      </div>
    </div>
  )
}
