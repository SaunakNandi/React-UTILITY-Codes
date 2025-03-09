import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Tabs } from './Tabs'

function App() {
  const tabsData=[
    {
      label:"Profile",
      content:<div>Profile content goes here</div>
    },
    {
      label:"Dashboard",
      content:<div>Dashboard content goes here</div>
    },
    {
      label:"Settings",
      content:<div>Settings content goes here</div>
    },
    {
      label:"Help",
      content:<div>Help content goes here</div>
    },
  ]
  const onTabChangeHandler=(index)=>{
    console.log("Tab changed")
  }
  return (
    <Tabs tabsData={tabsData} onChange={onTabChangeHandler}/>
  )
}

export default App
