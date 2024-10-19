import { useEffect, useState } from 'react'
import './App.css'
import ProgressBar from './components/ProgressBar'

function App() {
  const [value, setValue] = useState(0)
  const [success,setSuccess]=useState(false)

  useEffect(()=>{
    const intervalID=setInterval(() => {
      setValue(prev=>{
         if(prev>=100)
         {
            clearInterval(intervalID)
           return prev
         }
         return prev+1
      })
      return ()=>{
        clearInterval(intervalID)
      }
    }, 100);
  },[])
  return (
    <>
      <div className="App">
        <span>Progress Bar</span>
        <ProgressBar 
        value={value}
        onComplete={()=>setSuccess(true)}/>
        <span>{success? "Complete":"Loading..."}</span>
      </div>
    </>
  )
}

export default App
