import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import OTP from './component/OTP'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <OTP count={4}/>
    </>
  )
}

export default App
