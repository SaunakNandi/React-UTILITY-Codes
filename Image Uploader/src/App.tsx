import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CardMenu } from './CardMenu'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CardMenu/>
    </>
  )
}

export default App
