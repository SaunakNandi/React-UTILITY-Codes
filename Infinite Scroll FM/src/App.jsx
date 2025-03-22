import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InfiniteScrollDomApi from './InfiniteScrollDomApi'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <InfiniteScrollDomApi/>
    </>
  )
}

export default App
