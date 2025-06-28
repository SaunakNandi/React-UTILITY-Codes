import React, { useEffect,useRef } from 'react'

//  important question- Why to use transform:translate rather than changing the width

const ProgressBar = ({value,max,onComplete=()=>{},onStart=()=>{}}) => {

    // const progressStartRef=useRef(false)


    useEffect(()=>{
        console.log(value,max)
        if(value>=max)
        {
            onComplete()
        }
        // if(value)
        // {
        //     if(progressStartRef.current)
        //     {
 
        //     }
        //     else{
        //         progressStartRef.current=true
        //         onStart()  
        //     }
        // }
    },[value])
  return (
    <div className="progress-bar">
        <div style={{transform:`translateX(-${100-value}%)`}} className="progress-value"/>
    </div>
  )
}

export default ProgressBar