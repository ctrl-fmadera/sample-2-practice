import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Navbar(){
  const nav = useNavigate()
  const token = localStorage.getItem('token')

  const logout = () => {
    localStorage.removeItem('token')
    nav('/projects')
  }

  return (
    <header className="navbar">
      <div className="inner" style={{alignItems:'center'}}>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <div className="brand">TaskFlow</div>
          <div className="small muted">Projects & Tasks</div>
        </div>

        <nav className="navlinks" aria-label="Main navigation">
          <NavLink to="/projects" className={({isActive})=> isActive ? 'active' : ''}>Projects</NavLink>
          <NavLink to="/tasks" className={({isActive})=> isActive ? 'active' : ''}>Tasks</NavLink>
          {token ? <button className="btn ghost" onClick={logout}>Logout</button> : <></>}
        </nav>
      </div>
    </header>
  )
}
