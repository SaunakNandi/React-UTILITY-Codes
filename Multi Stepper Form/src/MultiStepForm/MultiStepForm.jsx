import React, { useState } from 'react'
import Step1 from './setp1/step1'
import { Step2 } from './step2/step2'
import { Step3 } from './step3/step3'
const Page={
    step1:1,
    step2:2,
    step3:3
}
const MultiStepForm = ({onSubmit=()=>{},onCancel}) => {
    const [currentStep,setCurrentStep] = useState(Page.step1)
    const [inputs,setInputs] = useState({
        step1:{
            firstname:'a',
            email:"a@example.com",
        },
        step2:{
            phone:'a',
            city:"a"
        },
        step3:{
            salary:'a',
            bank:"a"
        }
    })
    
    const Steps={
        [Page.step1]:Step1,
        [Page.step2]:Step2,
        [Page.step3]:Step3
    }
    const Component=Steps[currentStep]
    const submitButtonText=Page.step3===currentStep?"Save":"Next"

    function HandleBack(e){
        e.preventDefault()
        if(currentStep>1)
            setCurrentStep(currentStep-1)
    }
    function handleNext(e)
    {
        e.preventDefault()
        if(currentStep===Page.step1)
            setCurrentStep(currentStep+1)
        else if(currentStep===Page.step2)
            setCurrentStep(currentStep+1)
        else
        {
            console.log("Submit Data",inputs)
            onSubmit(inputs)
        }
    }

    function handleInputChange({stepKey,value,inputkey})
    {
        const oldInputs=structuredClone(inputs)
        oldInputs[stepKey][inputkey]=value
        setInputs(oldInputs)
    }
  return (
    <div className="multi-step-form">
        {
            currentStep>Page.step1 && <button onClick={HandleBack}>Back</button>
        }
        <form action="">
            {/* step1, step2, step3 */}
            <Component inputs={inputs[`step${currentStep}`]} onChange={handleInputChange} stepKey={`step${currentStep}`}/>
            <div>
                <button className="" onClick={onCancel} type='button'>Cancel</button>
                <button className="success" onClick={handleNext}>{submitButtonText}</button>
            </div>
        </form>
    </div>
  )
}

export default MultiStepForm