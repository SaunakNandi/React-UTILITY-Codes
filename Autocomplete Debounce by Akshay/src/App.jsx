import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [input, setInput] = useState("")
  const [showResult,setShowResults]=useState(false)
  const [results,setResults]=useState([])
  const [cache,setCache]=useState({})
  const fetchData=async()=>{
    if(cache[input])
    {
      setResults(cache[input])
      return
    } 
    const data=await fetch(`https://dummyjson.com/recipes/search?q=${input}`)
    const json=await data.json()
    console.log(json)
    setResults(json?.recipes)
    setCache(prev=>({...prev,[input]:json?.recipes}))
  }
  useEffect(()=>{
    const timer=setTimeout(fetchData,350)
    return ()=>{
      clearTimeout(timer)
    };
  },[input])
  return (
    <>
      <div className="App">
        <h1>Autocomplete Search Bar</h1>
        <div className="">
          <input type="text" className='search-input' value={input}
          onChange={e=>setInput(e.target.value)}
          onFocus={()=>setShowResults((true))}
          onBlur={()=>setShowResults(false)}/>
        </div>
        <div className="results-container">
          {
            showResult && (
              <ul>
                {
                  results.map((item) => <li className='results'>{item.name}</li>)
                }
              </ul>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
