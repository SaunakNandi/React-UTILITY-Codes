import { useEffect, useState } from 'react'
import ProgressBar from './component/progress/progress'
import './App.css'
import Progress_pro from './component/progress/Progress_pro'

function App() {
  const [value,setValue]=useState(10)

  useEffect(()=>{
    let id=setInterval(()=>{
      setValue((prev)=>prev+10)
    },1000)
    return ()=>{
      clearInterval(id)
    }
  },[])
  function onStart()
  {

  }

  function onComplete()
  {

  }
  return (
    <>
      <ProgressBar value={value} max={100} onStart={onStart} onComplete={onComplete}/>
      {/* <Progress_pro value={value} max={100} onStart={onStart} onComplete={onComplete}/> */}
    </>
  )
}

export default App
