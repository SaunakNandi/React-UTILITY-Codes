import React, { useEffect,useState } from 'react'

// Watch the video (frontend Master Digital clock) to understand the problems with toLocaleTimeString()
const DigitalClock = () => {
    const [count,setCount]=useState(0)
    const date=new Date()
    
    // 1st pattern
    useEffect(()=>{
        setInterval(()=>{
            setCount(prev=>prev+=1)
        },1000)
    },[])

    // 2nd Pattern
    // function getDate()
    // {
    //     const date=new Date()

    //     // creating date in 24hr format
    //     const hour=String(date.getHours()).padStart(2,'0')
    //     const minute=String(date.getMinutes()).padStart(2,'0')
    //     const seconds=String(date.getSeconds()).padStart(2,'0')

    //     return `${hour}:${minute}:${seconds}`
    // }

    // 3rd pattern
    function getDate()
    {
        const date=new Date()

        // creating date in 24hr format
        let hour=String(date.getHours()).padStart(2,'0')
        const minute=String(date.getMinutes()).padStart(2,'0')
        const seconds=String(date.getSeconds()).padStart(2,'0')

        const amORpm=hour>12?'PM':"AM"
        hour=hour%12 || 12
        return `${hour}:${minute}:${seconds} ${amORpm}`
    }
  return (
    <>
        {/* <div>{date.toLocaleTimeString()}</div> */}
        <div>{getDate()}</div>
    </>
  )
}

export default DigitalClock