import React, { useRef, useState } from 'react'

const OTP = ({count}) => {
    const[otps,setOtps]=useState(new Array(count).fill(""))
    const inputRef=useRef([])
    function handleKeyUp(i)
    {
        return (event)=>{
            const key=event.key
            const oldOTPs=[...otps]
            
            // handle backspace
           
            if(key=="Backspace")
            {
                oldOTPs[i]=""
                moveFocusToLeft(i)
                setOtps(oldOTPs)
                return;
            }

            if(key==='ArrowRight')
            {
                moveFocusToRight(i,oldOTPs)
                return
            }
            if(key==='ArrowLeft')
            {
                moveFocusToLeft(i)
                return
            }
            if(isNaN(key)) return

            // if there already an input present
            if(oldOTPs[i])
            {
                const ind=moveFocusToRight(i,oldOTPs)
                oldOTPs[ind]=key
                setOtps(oldOTPs)
                return
            }
            else 
                oldOTPs[i]=key
            setOtps(oldOTPs)

            // send focus to next box if available
            moveFocusToRight(i)
        }
    }

    function handleClick(i)
    {
        // when clicked in left side of a number inside the box the cursor should move to the front
        return (event)=>{
            event.target.setSelectionRange(1,1);
        }
    }
    function moveFocusToRight(i,oldOTPs){
        if(inputRef.current[i+1])
        {
            // with lastIndex there comes a bug 
            // if I am at 1st index and enter a number it will go to the last empty box. To solve that we can do like this
            if(oldOTPs)
            {
                const tempArray=[...otps]
                const trimedArray=tempArray.fill("*",0,i)
    
                // find index of next empty box
                const emptyIndex=trimedArray.indexOf("")
                inputRef.current[emptyIndex]?.focus()
                return emptyIndex
            }
            else{
                inputRef.current[i+1]?.focus()
                return i+1
            }
        }

    }

    function moveFocusToLeft(i){
        if(inputRef.current[i-1])
            inputRef.current[i-1]?.focus()
    }

    function handlePaste(i)
    {
        return (event)=>{
            // manage if for i>0
            const pastedData=event.clipboardData.getData("Text").slice(0,count)
            if(!isNaN(pastedData))
            {
                setOtps(pastedData.split(""))
            }
        }
    }
  return (
    <div>
        {
            new Array(count).fill("").map((__,i)=>{
                // inputMode='numeric' because when you open your application in mobile, for OTP the numpad should get open
                return (
                    <input key={i} 
                    ref={(el)=>inputRef.current[i]=el} 
                    type="text" 
                    onPaste={handlePaste(i)}
                    inputMode='numeric'
                    value={otps[i]??""} 
                    onKeyUp={handleKeyUp(i)}
                    onClick={handleClick(i)}/>
                )
            })
        }
    </div>
  )
}

export default OTP