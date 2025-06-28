import { useState } from 'react'
import './App.css'
import { Timer } from './component/Timer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Timer/>
    </>
  )
}

export default App
