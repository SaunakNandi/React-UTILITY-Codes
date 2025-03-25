import { Button, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function getSteps(step)
{
    switch(step){
        case 0:
            return (
                <>
                    <TextField
                    id='first-name'
                    label='First Name'
                    placeholder='Enter your first name'
                    margin='normal'
                    name='firstname'
                    fullWidth
                    variant='outlined'/>
                    <TextField
                    id='first-name'
                    label='First Name'
                    placeholder='Enter your first name'
                    margin='normal'
                    name='firstname'
                    fullWidth
                    variant='outlined'/>
                    
                </>
            );
        case 1:
            return(
                <>
                    <TextField
                    id='email'
                    label='Email'
                    placeholder='Enter your email'
                    margin='normal'
                    name='email'
                    fullWidth
                    variant='outlined'/>
                    <TextField
                    id='phone-number'
                    label='Phone Number'
                    placeholder='Enter your Phone Number'
                    margin='normal'
                    name='phoneNumber'
                    fullWidth
                    variant='outlined'/>
                </>
            );
        case 2:
            return (
                <>
                <TextField
                    id='address1'
                    label='Address'
                    placeholder='Enter your Address'
                    margin='normal'
                    name='address1'
                    fullWidth
                    variant='outlined'/>
                    <TextField
                    id='country'
                    label='Country'
                    placeholder='Enter your country'
                    margin='normal'
                    name='country'
                    fullWidth
                    variant='outlined'/>
                </>
            );
        case 3:
            return (
                <>
                    <TextField
                    id='cardNumber'
                    label='Card Number'
                    placeholder='Enter your card number'
                    margin='normal'
                    name='cardNumber'
                    fullWidth
                    variant='outlined'/>
                    <TextField
                    id='cardMonth'
                    label='Card Month'
                    placeholder='Enter your Card Month'
                    margin='normal'
                    name='cardMonth'
                    fullWidth
                    variant='outlined'/>
                    <TextField
                        id="cardYear"
                        label="Card Year"
                        variant="outlined"
                        placeholder="Enter Your Card Year"
                        fullWidth
                        margin="normal"
                        name="cardYear"
                    />
                </>
            )
            default: return "Unknown step"
    }
}

const LinearStepper = () => {
    const [activeStep,setActiveStep] =useState(0)
    const [skippedStep,setSkippedStep]=useState([])
    const steps=[
        "Basic information",    // 0
        "Contact information",  //1
        "Personal information",  // 2
        "Payment"               // 3
    ]
    function isStepOptional(step) {
        return step==1 || step==2
    }
    function isStepSkipped(step){
        return skippedStep.includes(step)
    }
    function HandleBack(){
        setActiveStep(prev=>prev-1)
    }
    function HandleSkip(){
        if(!isStepSkipped(activeStep))
            setSkippedStep(prev=>[...prev,activeStep])
        setActiveStep((prevActiveStep)=>prevActiveStep+1)
    }
    function HandleNext(){
        setSkippedStep(prev=>(prev.filter(skip=>skip!=activeStep)))
        setActiveStep((prevActiveStep)=>prevActiveStep+1);
    }
  return (
    <div>
        {/* Stepper Part */}
        <Stepper alternativeLabel activeStep={activeStep}>
            {
                steps.map((step,i)=>{
                    let labelProps={}
                    let stepProps={}
                    if(isStepOptional(i))
                    {
                        labelProps.optional=(
                            <Typography variant='caption'
                            align='center'
                            style={{display:'block'}}>
                                Optional
                            </Typography>
                        )
                    }
                    if(isStepSkipped(i))
                        stepProps.completed=false
                    return(
                        <Step {...stepProps} key={i}>
                            <StepLabel {...labelProps}>{step}</StepLabel>
                        </Step>
                    )
                })
            }
        </Stepper>
        {
            activeStep==steps.length?(
                <Typography variant='h3' align='center'>
                    Thank You
                </Typography>
            ):(
                <>
                    <form>
                        {getSteps(activeStep)}
                    </form>
                    <Button disabled={activeStep===0} 
                    onClick={HandleBack}>
                        Back
                    </Button>
                    {
                        isStepOptional(activeStep) && (
                            <Button variant='contained'
                            color='primary'
                            onClick={HandleSkip}>Skip</Button>
                        )
                    }
                    <Button variant='contained' color='primary'
                    onClick={HandleNext}>
                        {activeStep===steps.length-1? "Finish":"Next"}
                    </Button>
                </>
            )
        }
    </div>
  )
}

export default LinearStepper