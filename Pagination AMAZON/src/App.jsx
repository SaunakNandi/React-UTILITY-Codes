import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Pagination from './Pagination'

function App() {
  const [currentPage,setCurrentPage]=useState(1)
  function onPageChanges(page)
  {
    setCurrentPage(page)
  }
  return (
    <>
      <Pagination visibleSlots={6} currentPage={currentPage} start={1} end={20} onPageChange={onPageChanges}/>
    </>
  )
}

export default App
