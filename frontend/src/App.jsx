import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProjectsPage from './pages/ProjectsPage'
import TasksPage from './pages/TasksPage'

function App(){
  const token = localStorage.getItem('token') // prototype: store token in localStorage

  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="*" element={<div style={{padding:20}}>Page not found</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
