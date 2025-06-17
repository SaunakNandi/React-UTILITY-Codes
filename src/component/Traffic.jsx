import React, { useEffect, useState } from 'react'

const Traffic = ({lightData}) => {
    const dataToShow = sortDisplayOrder(lightData)
    const lightToShow = sortLightOrder(lightData)
    const [lightOrder,setLightOrder]=useState(dataToShow)
    const [displayOrder,setDisplayOrder]=useState(lightToShow)
    const [activeLight,setActiveLight]=useState(lightToShow[0])
    function sortDisplayOrder(lightData)
    {
      return lightData.toSorted((a,b)=>a.display_order-b.display_order)
    }
    function sortLightOrder()
    {
      return lightData.toSorted((a,b)=>a.order-b.order)
    }
    useEffect(()=>{
      setTimeout(()=>{
        const currenctActiveIndex=lightData.findIndex(x=>(x.color==activeLight.color))
        const nextIndex=currenctActiveIndex+1
        const newActiveLight=lightOrder[nextIndex] ?? lightOrder[0]  // if lightOrder[nextIndex] is undefined then lightOrder[0] will be considered
        setActiveLight(newActiveLight)
      },activeLight.time)
    },[activeLight])
  return lightOrder && displayOrder && (
    <div className='traffic-light'>
      {
        displayOrder.map((item)=>(
          <Light key={item.order} color={item.color} activeLight={activeLight.color}/>
        ))
      }
    </div>
  )
}

export default Traffic


const Light=({color,activeLight})=>{
  const opacity=activeLight===color? 1:0.2;
  console.log(opacity,activeLight,color)
    return (
        <div className='light' style={{backgroundColor:color,opacity:opacity}}></div>
    )
}