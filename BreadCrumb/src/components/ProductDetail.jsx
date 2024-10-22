import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetail() {
    const {id}=useParams()
    const [item,setItem]=useState(null)
    const [isLoading,setIsLoading]=useState(true)
    async function fetchData() {
        const response=await fetch(`https://dummyjson.com/products/${id}`)
        const data=await response.json()
        setItem(data)
        setIsLoading(false)
        console.log(item)
    }
    useEffect(()=>{
        fetchData()
    },[])
  return item && (
    <div>
        <h2>{item.title}</h2>
        {
            isLoading? <div>Loading...</div> :(
                item && <div style={{display:'flex'}}>
                    <img src={item.thumbnail} alt={item.title}/>
                    <h2>{item.price}</h2>
                    <p>{item.description}</p>
                </div>
            )
        }
    </div>
  )
}
