import { useState } from 'react'
import './App.css'
import Switch from './Switch'

function App() {
  const [isOn, setIsOn] = useState(false)
  return (
    <>
      <Switch isOn={isOn} setIsOn={setIsOn}/>
    </>
  )
}

export default App
