import React, { useState } from 'react'
const StarRating = ({starCount=5}) => {
    const [starValue,setStarValue]=useState()
    const [hover,setHover]=useState(0)
  return (
    <div className="container">
        {
            new Array(starCount).fill(0).map((_,i)=>(
                <span key={i} onClick={()=>setStarValue(i)}
                className={hover===0 && i<=starValue || i<hover? 'gold':''}
                onMouseEnter={()=>setHover(i+1)}
                onMouseLeave={()=>setHover(0)}>&#9733;</span>
            ))
        }
      </div>
  )
}

export default StarRating