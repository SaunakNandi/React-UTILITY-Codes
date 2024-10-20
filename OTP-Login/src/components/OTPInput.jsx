import React, { useEffect, useRef, useState } from 'react'

export default function OTPinput({length=4,onOTPsubmit=()=>{}}) {
    const [otp,setOTP]=useState(new Array(length).fill(""))
    const inputRef=useRef([])
    // console.log(inputRef)
    useEffect(()=>{
        if(inputRef.current[0])
        {
            inputRef.current[0].focus()
        }
    },[])
    const handleChange=(i,e)=>{
        const val=e.target.value
        if(isNaN(val)) return
        const newOtp=[...otp]

        // allow only 1 input
        newOtp[i]=val.substring(val.length-1)
        setOTP(newOtp)

        // submit trigger
        const combinedOTP=newOtp.join("")
        if(combinedOTP.length==length)
            onOTPsubmit(combinedOTP)

        // Move to next input if current field is filled
        console.log(inputRef.current)
        if(val && i<length-1 && inputRef.current[i+1])
            inputRef.current[i+1].focus()
    }
    const handleClick=(i)=>{
        // in the input field if for e.g [1] and my pointer is in front of 1 and press suppose 5 the pointer will move to the next shell and 5 will not get placed on next shell. To address this problem we are doing this
        inputRef.current[i].setSelectionRange(1,1)  

        //optional -> if the previous input field is blank move focus to there
        if(i>0 && !otp[i-1])
            inputRef.current[otp.indexOf("")].focus()
    }
    const handleKeyDown=(i,e)=>{
        // Move focus to the previous input field on backspace
        console.log(otp)
        if(e.key==="Backspace" && i>0)
        {
            inputRef.current[i-1].focus()
        } 
    }
    
  return (
    <>
        <div>
            {
                otp.map((val,i)=>(
                    <input key={i} type='text' value={val}
                    ref={(input)=>{
                        // console.log(inputRef)
                        inputRef.current[i]=input
                        // console.log(input)
                    }}
                    onChange={(e)=> handleChange(i,e)}
                    onClick={()=>handleClick(i)}
                    onKeyDown={(e)=>handleKeyDown(i,e)}
                    className='otpInput'/>
                ))
            }
            <button onClick={()=>
                {
                    const finalOTP=otp.join("")
                    onOTPsubmit(finalOTP)
            }}></button>
        </div>
    </>
  )
}
