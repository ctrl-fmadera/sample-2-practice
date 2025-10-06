import { useState } from 'react'
import Registrationpage from './pages/Registrationpage'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Registrationpage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
