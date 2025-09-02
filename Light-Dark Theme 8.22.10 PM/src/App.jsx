import { createContext, useContext, useEffect, useState } from 'react'
import './App.css'

const ThemeMode={
  light:1,
  dark:2
}

const ThemeClass={
  [ThemeMode.light]:'light',
  [ThemeMode.dark]:'dark'
}

const myCT=createContext({name:'hey'})


function App() {
  const [themeMode, setThemeMode] = useState(ThemeMode.dark)

  function addThemeClass(className,removeClassName){
    const body=document.getElementsByTagName('body')[0]
    removeThemeClassFromBody(body,removeClassName)
    body.classList.add(className)
  }
  function removeThemeClassFromBody(body,className){
    // const body=document.getElementsByTagName('body')[0]
    if(!className) return
    body.classList.remove(className)
  }
  useEffect(()=>{
    addThemeClass(ThemeClass[themeMode])
  })
  function handleToggle(){
    const newThemeMode=themeMode==ThemeMode.dark ? ThemeMode.light:ThemeMode.dark
    setThemeMode(newThemeMode)
    const removeClassName=ThemeClass[themeMode]
    addThemeClass(ThemeClass[newThemeMode],removeClassName)
  }
  return (
    <>
      <span>Hello budddy</span>
      <myCT.Provider value={{themeMode,handleToggle}}>
        <GrandParent/>
      </myCT.Provider>
    </>
  )
}

function GrandParent()
{
  return <Parent/>
}

function Parent(){
  return <Child/>
}

function Child(){
  const {themeMode,handleToggle}=useContext(myCT)
  const mode=themeMode==ThemeMode.dark?"🌑":"🌞"
  return <button className='btn' onClick={handleToggle}>{mode}</button>
}

export default App
