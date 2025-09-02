import { useState } from 'react'
import './App.css'
import Control from './Control'

function App() {
  const [dataLeft, setDataLeft] = useState([
    {
      label: "HTML",
      checked: false,
      id: 1
    },
    {
      label: "JavaScript",
      checked: false,
      id: 2
    },
    {
      label: "TypeScript",
      checked: false,
      id: 3
    },
    {
      label: "CSS",
      checked: false,
      id: 4
    }
  ])
  const [dataRight, setDataRight] = useState([
    {
      label: "React",
      checked: false,
      id: 5
    },
    {
      label: "Angular",
      checked: false,
      id: 6
    },
    {
      label: "Vue",
      checked: false,
      id: 7
    },
    {
      label: "Servlet",
      checked: false,
      id: 8
    }
  ])
  function handleChange(str, id) {
    if (str == "left") {
      setDataLeft((prev) => {
        const data = prev.map((item) => {
          return item.id == id ? { ...item, checked: !item.checked } : item
        })
        return data
      })
    }
    else {
      setDataRight((prev) => {
        const data = prev.map((item) => {
          return item.id == id ? { ...item, checked: !item.checked } : item
        })
        return data
      })
    }
  }
  function shiftAllLeft() {
    if (dataRight.length == 0)
      return
    setDataLeft((prev) => {
      return (
        [...prev, ...dataRight]
      )
    })
    setDataRight([])
  }
  function shiftAllRight() {
    if (dataLeft.length == 0)
      return
    setDataRight((prev) => {
      return (
        [...prev, ...dataLeft]
      )
    })
    setDataLeft([])
  }

  const shiftSelectedLeft=()=>{
    const checkedData=dataRight.filter((x)=>x.checked==true)
    setDataRight((prev)=>{
      return prev.filter((item)=>!item.checked)
    })
    setDataLeft((prev)=> [...prev,...checkedData])
  }

  const shiftSelectedRight=()=>{
    const checkedData=dataLeft.filter((x)=>x.checked==true)
    setDataLeft((prev)=>{
      return prev.filter((item)=>!item.checked)
    })
    setDataRight((prev)=> [...prev,...checkedData])
  }
  return (
    <>
      <Control dataLeft={dataLeft} dataRight={dataRight} handleChange={handleChange}
        shiftAllLeft={shiftAllLeft} shiftAllRight={shiftAllRight} shiftSelectedLeft={shiftSelectedLeft} shiftSelectedRight={shiftSelectedRight}/>
    </>
  )
}

export default App
