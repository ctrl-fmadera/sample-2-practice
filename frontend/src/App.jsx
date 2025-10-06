import { useState } from 'react'
import Registrationpage from './pages/Registrationpage'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Registrationpage />} />
      </Routes>
    </>
  )
}

export default App
