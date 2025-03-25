import { Button, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React, { act, useState } from 'react'
import { useForm,FormProvider, useFormContext, Controller} from 'react-hook-form';

const BasicInformation=()=>{
    const {control, formState:{errors}}=useFormContext()
    return(
        <>
            <Controller control={control} 
            name='firstname'
            rules={{
                required:true,
                minLength:3
            }}
            render={({field})=>{
                console.log(errors.firstname)
                return(
                    <TextField
                    id='first-name'
                    label='First Name'
                    placeholder='Enter your first name'
                    margin='normal'
                    {...field}
                    fullWidth
                    variant='outlined'
                    error={!!errors.firstname}  // can aslo be done as Boolean(errors.firstname)
                    helperText={errors.firstname && "First Name is required"}/>
                )
            }}/>
            <Controller control={control}
            name='lastname'
            rules={{
                required:true,
                minLength:3
            }}
            render={({field})=>{
                console.log(errors.lastname)
                return(
                <TextField
                    id='Last-name'
                    label='Last Name'
                    placeholder='Enter your last name'
                    margin='normal'
                    fullWidth
                    {...field}
                    variant='outlined'
                    error={!!errors.lastname}
                    helperText={errors.lastname && "last Name is required"}/>
                )}}
            />
                    
                    
        </>
    )
}
const ContactInformation=()=>{
    const {control}=useFormContext()
    return(
        <>
            <Controller control={control} 
            name='email'
            rules={{
                required:true,
            }}
            render={({field})=>(
                <TextField
                    id='email'
                    label='Email'
                    placeholder='Enter your email'
                    margin='normal'
                    {...field}
                    fullWidth
                    variant='outlined'
                    error={!!errors.email}
                    helperText={errors.email && 'Email id is required'}/>
                )}/>
            
            <Controller control={control}
            name='phoneNumber'
            rules={{
                required:true,
                minLength:10
            }}
            render={({field})=>(
                <TextField
                    id='phone-number'
                    label='Phone Number'
                    placeholder='Enter your Phone Number'
                    margin='normal'
                    {...field}
                    fullWidth
                    variant='outlined'
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber && 'Phone Number is required'}/>
            )}
            />
        </>
            
    )
}
const PersonalInformation=()=>{
    const {control}=useFormContext()
    return (
        <>
            <Controller control={control}
            name='address1'
            render={({field})=>(
                <TextField
                    id='address1'
                    label='Address'
                    placeholder='Enter your Address'
                    margin='normal'
                    {...field}
                    fullWidth
                    variant='outlined'/>
            )}/>
            <Controller control={control}
            name='country'
            render={({field})=>(
                <TextField
                    id='country'
                    label='Country'
                    placeholder='Enter your country'
                    margin='normal'
                    {...field}
                    fullWidth
                    variant='outlined'/>
            )}/>
        </>
    )
}
const PaymentInformation=()=>{
    const {control}=useFormContext()
    return (
        <>
            <Controller control={control}
            name='cardNumber'
            rules={{
                required:true,
                minLength:12
            }}
            render={({field})=>(
                <TextField
                    id='cardNumber'
                    label='Card Number'
                    placeholder='Enter your card number'
                    margin='normal'
                    {...field}
                    fullWidth
                    variant='outlined'
                    error={!!errors.cardNumber}
                    helperText={errors.cardNumber && 'Card Number is required'}
                    />
            )}/>
            
            <Controller control={control}
            name='cardMonth'
            rules={{
                required:true,
                minLength:2
            }}
            render={({field})=>(
                <TextField
                    id='cardMonth'
                    label='Card Month'
                    placeholder='Enter your Card Month'
                    margin='normal'
                    {...field}
                    fullWidth
                    variant='outlined'
                    error={!!errors.cardMonth}
                    helperText={errors.cardMonth && 'Card Month is required'}
                    />
            )}/>
            <Controller control={control}
            name="cardYear"
            rules={{
                required:true,
                minLength:3
            }}
            render={({field})=>(
                <TextField
                    id="cardYear"
                    label="Card Year"
                    variant="outlined"
                    placeholder="Enter Your Card Year"
                    fullWidth
                    {...field}
                    margin="normal"
                    error={!!errors.cardYear}
                    helperText={errors.cardYear && 'Card Year is required'}/>
            )}/>
        </>
    )
}

function getSteps(step)
{
    switch(step){
        case 0:
            return <BasicInformation/>;
        case 1:
            return <ContactInformation/>;
        case 2:
            return <PersonalInformation/>;
        case 3:
            return <PaymentInformation/>
            default: return "Unknown step"
    }
}

const LinearStepper = () => {
    const [activeStep,setActiveStep] =useState(0)
    const [skippedStep,setSkippedStep]=useState([])
    const methods=useForm({
        defaultValues:{
            firstname:'',
            lastname:'',
            email:'',
            phoneNumber:'',
            address1:'',
            country:'',
            cardNumber:'',
            cardMonth:'',
            cardYear:''
        }
    })
    const isStepFailed=()=>{
        return Boolean(Object.keys(methods.formState.errors).length)
    }
    const steps=[
        "Basic information",    // 0
        "Contact information",  //1
        "Personal information",  // 2
        "Payment"               // 3
    ]
    function isStepOptional(step) {
        return step==2
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
    function HandleNext(data){
        if(isStepFailed()) return
        if(activeStep===steps.length-1)
            console.log(data)
        setSkippedStep(prev=>(prev.filter(skip=>skip!=activeStep)))
        setActiveStep((prevActiveStep)=>prevActiveStep+1);
    }
    function onSubmit(data){
        console.log(data)
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
                    if(isStepFailed() && activeStep===i)
                        labelProps.error=true
                    if(isStepSkipped(i))
                        stepProps.completed=false
                    return(
                        // You can check this in documentation 'https://mui.com/material-ui/react-stepper/'
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
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(HandleNext)}>
                        {getSteps(activeStep)}
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
                    // onClick={HandleNext} 
                    type='submit'>
                        {activeStep===steps.length-1? "Finish":"Next"}
                    </Button>
                        </form>
                </FormProvider>
                    
                </>
            )
        }
    </div>
  )
}

export default LinearStepper