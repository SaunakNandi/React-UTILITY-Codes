import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Router } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Route path="/admin-dashboard" element={
          
        }/>
      </Router>
    </>
  )
}

export default App
