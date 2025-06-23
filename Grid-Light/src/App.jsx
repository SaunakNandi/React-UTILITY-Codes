import { useState } from 'react'
import './App.css'
import { GridLight } from './GridLightt'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GridLight></GridLight>
    </>
  )
}

export default App
