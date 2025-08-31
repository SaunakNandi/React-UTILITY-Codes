import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SelectableGrid from './SelectableGrid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Selectable Grid</h1>
      <SelectableGrid row={15} column={15}/>
    </>
  )
}

export default App
