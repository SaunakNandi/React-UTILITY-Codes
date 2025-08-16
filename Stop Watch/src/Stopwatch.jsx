import React, { useState,useRef, useEffect } from 'react'

const Stopwatch = ({handleAdd}) => {

    const [time,setTime]=useState(0)
    const stopwatchRef=useRef(0)
    const intervalRef=useRef(null)
    const needToResumeRef=useRef(false)
    function handleStart()
    {
        stopwatchRef.current=new Date().getTime() - time;
        intervalRef.current=setInterval(()=>{
            setTime(new Date().getTime()-stopwatchRef.current)
        },10)
    }
    function handlePause()
    {
        clearInterval(intervalRef.current)
        intervalRef.current=null
    }

    function handleReset()
    {
        clearInterval(intervalRef.current)
        intervalRef.current=null
        needToResumeRef.current=false
        stopwatchRef.current=0
        setTime(0)
    }

    useEffect(()=>{
        window.addEventListener("blur",handleBlur)
        window.addEventListener("focus",handleFocus)
        return ()=>{
            window.removeEventListener("blur",handleBlur)
            window.removeEventListener("focus",handleFocus)
        }
    },[time])

    function handleBlur()
    {
        console.log("Blur")
        needToResumeRef.current=!!intervalRef.current;
        clearInterval(intervalRef.current)
    }

    function handleFocus()
    {
        console.log("Focus")
        if(needToResumeRef.current)
        {
            needToResumeRef.current=false
            handleStart()
        }
    }

    function formatTime(){
        const ms=Math.floor((time%1000)/10).toString().padStart(2,"0")
        const sec=Math.floor((time/1000)%60).toString().padStart(2,"0")
        const min=Math.floor((time/(1000*60))%60).toString().padStart(2,"0")
        const hr=Math.floor((time/(1000*60*60))).toString().padStart(2,"0")
        return `${hr}:${min}:${sec}:${ms}`
    }

    return (
        <div className='stopwatch'>
            <span className='time'>{formatTime()}</span>
            <div>
                <button onClick={handleStart}>Start</button>
                <button onClick={handlePause}>Pause</button>
                <button onClick={handleReset}>Reset</button>
                <button onClick={handleAdd}>ADD Another Timer</button>
            </div>
        </div>
    )
}

export default Stopwatch