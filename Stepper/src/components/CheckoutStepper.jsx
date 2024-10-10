import React, { useEffect, useRef, useState } from 'react'
    
// eslint-disable-next-line react/prop-types
export const CheckoutStepper = ({steps=[]}) => {

    const [currentStep,setCurrentStep]=useState(1)
    const [isComplete,setIsComplete]=useState(false)
    const [margins,setMargins]=useState({
        marginLeft:0,
        marginRight:0
    })
    const stepRef=useRef([])

    useEffect(()=>{
        setMargins({
            marginLeft:stepRef.current[0].offsetWidth/2,
            marginRight:stepRef.current[steps.length-1].offsetWidth/2
        })
        console.log(stepRef.current[0].offsetWidth,stepRef.current[steps.length-1].offsetWidth)
    },[stepRef,steps.length-1])
    if(!steps.length)
    {
        return (
            <></>
        )
    }

    function handleNext()
    {
        setCurrentStep(prev=>{
            if(prev===steps.length)
            {
                setIsComplete(true)
                return prev
            }
            else{
                // setIsComplete(false)
                return prev+1
            }
        })
    }
    const ActiveComponent= steps[currentStep-1]?.Component

    const calculateProgressBarWidth=()=>{
        return ((currentStep-1)/(steps.length-1))*100
    }
  return (
    <>
        <div className='stepper'>
            {
                steps.map((x,ind)=>(
                    <div 
                    className={`step ${currentStep>ind+1 || 
                        isComplete?"complete":""}
                        ${currentStep===ind+1?"active":""}
                        ${currentStep===steps.length? 'complete' : ''}`} 
                        ref={el=>(stepRef.current[ind]=el)}
                        key={x.name}>
                        {
                            
                                <div className="step-number">
                                {
                                    currentStep>ind+1 || isComplete 
                                    || currentStep===steps.length? <span>&#10003;</span>:ind+1
                                }
                                </div>
                            
                        }
                        <div className="step-name">{x.name}</div>
                    </div>
                ))
            } 

            <div className="progress-bar"
            style={{
                width:`calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
                marginLeft:margins.marginLeft,
                marginRight:margins.marginRight,
            }}>
                <div className="progress"
                style={{width:`${calculateProgressBarWidth()}%`}}></div>
            </div>
        </div>
        <ActiveComponent/>
        {
            !isComplete && <button
            className='btn'
            onClick={handleNext}>{currentStep===steps.length? 'Finish':'Next'}</button>
        }
    </>
  )
}

