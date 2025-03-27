import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Navbar from './Navbar'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const [count, setCount] = useState(0)

  return (
        <ThemeProvider>
          {/* Navbar */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/blog' element={<Blog />} />
          </Routes>
        </ThemeProvider>
  )
}

export default App
