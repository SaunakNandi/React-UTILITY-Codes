import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductComponent from './ProductComponent'

export default function HomePage() {
  const [data,setData]=useState([])
  const [products,setProducts]=useState([])

  async function fetchData() {
    const response=await fetch('https://dummyjson.com/products')
    const result=await response.json()
    const slicedProducts=result.products.slice(0,6)
    console.log(slicedProducts)
    setData(result.products)
    setProducts(slicedProducts)
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <>
      {
        products && <ProductComponent products={products}/>
      }
      <Link to='/products' state={{data:data}} >
      <button style={{width:"100%",padding:'10px'}}>See All Products</button></Link>
    </>
  )
}
