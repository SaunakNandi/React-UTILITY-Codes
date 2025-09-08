import { useState } from 'react'
import './App.css'
import { useQuery } from './useQuery'

function App() {
  async function apiCall(){
    return [{id:1,text:"Hello"}]
  }
  const [count, setCount] = useState(0)
  const {data,loading,error}=useQuery(async()=>{
    const response=await apiCall()
    return response
  },[count])
  return (
    <>
      
    </>
  )
}

export default App
