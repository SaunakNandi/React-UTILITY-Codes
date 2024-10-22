import React from 'react'
import { useLocation,Link } from 'react-router-dom'
import ProductComponent from './ProductComponent'

export default function ProductListing() {
    const location=useLocation()
    const {data}=location.state || null
    console.log(data)
  return (
    <>
     {
       data && <ProductComponent products={data}/>
     }
    </>
  )
}
