import { useState } from 'react'
import './App.css'
import BreadCrumbs from './components/BreadCrumbs'
import { Route, Routes } from 'react-router-dom'
import ProductListing from './components/ProductListing'
import ProductDetail from './components/ProductDetail'
import HomePage from './components/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <BreadCrumbs/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/products' element={<ProductListing/>}/>
        <Route path='/products/:id' element={<ProductDetail/>}/>
      </Routes>
    </div>
  )
}

export default App
