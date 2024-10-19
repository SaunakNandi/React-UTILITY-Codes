import React, { useEffect, useState } from 'react'
import { MAX, MIN } from '../constants'

export default function ProgressBar({value,onComplete=()=>{}}) {
    const [percent,setPercent]=useState(value)
    
    console.log(value)
    console.log(percent)
    useEffect(()=>{
        setPercent(Math.min(MAX,Math.max(value,MIN)))
        if(value==MAX)
            onComplete()
    },[value])
  return (
    <div className='progress'>
        <span style={{color:percent>49?"white":"black"}}>{percent.toFixed()}%</span>

        {/* // scale value should be between 0 and 1 */}
        <div 
        // style={{width:`${percent}%`}}
        style={{transform:`scaleX(${percent/MAX})`,transformOrigin:'left'}} 
        role='progressbar'
        aria-valuemin={MIN}
        aria-valuenow={percent.toFixed()}
        aria-valuemax={MAX}></div>
    </div>
  )
}
