import React, { useEffect, useRef, useState } from 'react'

const Checkout = ({steps=[]}) => {
    const [currentStep,setCurrentStep]=useState(1)
    const [isComplete,setIsComplete]=useState(false)
    const [margin,setMargins]=useState({marginLeft:0,marginRight:0})
    const stepRef=useRef([])
    useEffect(()=>{
        setMargins({
            marginLeft:stepRef.current[0].offsetWidth/2,
            marginRight:stepRef.current[steps.length-1].offsetWidth/2,
        })
    },[])

    const handleNext=()=>{
        if(currentStep+1==steps.length)
        {
            setIsComplete(true)
        }
        setCurrentStep(prev=>prev+1)
    }
    function calculateWidth()
    {
        return (currentStep-1)*100/(steps.length-1)
    }
    const ActiveComponent=steps[currentStep-1]?.Component
    return (
    <>
        <div className='stepper'>
            {
                steps.map((x,index)=>(
                    <div className={`step ${currentStep==index+1?'active':''} ${currentStep>index+1 || isComplete?'complete':''}`}
                    ref={(el)=>stepRef.current[index]=el} key={index}>
                        <div className="step-number">
                            {currentStep>index+1 || isComplete?<span>&#10003;</span>:index+1}
                        </div>
                        {x.name}
                    </div>
                ))
            }   
            <div className="progress-bar" style={{width:`calc(100% - ${margin.marginLeft + margin.marginRight}px)`,
                marginLeft:margin.marginLeft,marginRight:margin.marginRight}}>
                <div className="progress" style={{width:`${calculateWidth()}%`}}></div>
            </div>
        </div>
        <ActiveComponent/>
        {
            !isComplete && <button className="btn" onClick={handleNext}>Next</button>
        }
    </>
  )
}

export default Checkout