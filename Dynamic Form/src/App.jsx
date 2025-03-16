import { useState } from 'react'
import './App.css'
import FormWrapper from './components/FormWrapper'

// Reffer- https://www.youtube.com/watch?v=xoli56RLn5c&list=PLQOMi2yb4hF2F4G_pA8fHSupjDG92CuU7&index=20
function App() {
  const Inputs=[
    {
        type:'text',
        label:'First Name',
        placeholder:'Enter your first name',
        value:'',
        id:'first_name',
        name:'first_name',
        error:'',
        readonly:false,
        disabled:false,
        required:true, 
    },
    {
        type:'text',
        label:'Last Name',
        placeholder:'Enter your last name',
        value:'',
        id:'last_name',
        name:'last_name',
        error:'',
        readonly:false,
        disabled:false  ,
             
    },
    {
        type:'text',
        label:'Email',
        placeholder:'Enter your email id',
        value:'',
        id:'email',
        name:'email',
        error:'',
        readonly:false,
        disabled:false    ,
        required:true, 
    },
    {
        type:'text',
        label:'Phone Number',
        placeholder:'Enter your phone number',
        value:'',
        id:'phone',
        name:'phone',
        error:'',
        readonly:false,
        required:true,
        disabled:false   
    },
    {
        type:'checkbox',
        label:'Accept T&C',
        value:'',
        id:'accept_terms',
        name:'accept_terms',
        error:'',
        readonly:false,
        disabled:false,
        checked: false,
        required:true,
    }
  ]
  const [inputs,setInputs]=useState(Inputs)
  console.log({...inputs})
  
  const onInputChange=({id,index,value,type,checked})=>{
    console.log(id,index,value,checked,type)
    const oldState=structuredClone(inputs)
    if(type==='checkbox')
    {
      console.log("Checked")
      oldState[index].checked=checked
      oldState[index].value=checked?'accept_terms':''
    }
    else
    {
      oldState[index].value=value
    }
    setInputs(oldState)
  }

  const onInputBlur=({id,index,value,type,checked})=>{
    
    const oldState=structuredClone(inputs)
    if(type==='text')
    {
      if(value.length<3)
        oldState[index].error=`Invalid Field ${oldState[index].name}`
    }
    else
    {
      oldState[index].value=value
    }
    oldState[index].error=""
    setInputs(oldState)
  }

  const handleCancel=()=>{
    setInputs(structuredClone(inputs))
  }

  function handleSubmit(){
    const params={}
    console.log("Form submitted")
    
    inputs.forEach((x)=>{
      console.log(x.value)
      if(x.type==="checkbox")
      {
        console.log(x.checked,x.value)
        if(x.checked) 
          params[x.name]=x.value
      }
      else
      {
        params[x.name]=x.value
      }
    })
    console.log(params)
  }

  function needToDisableSubmit(){
    let disable=false
    for(let input of inputs)
    {
      if(input.required  && !input.value)
      {
        disable=true
        break
      }
    }
    return disable
  } 
  const disableSubmit=needToDisableSubmit(inputs)
  return (
    <>
      <FormWrapper onInputChange={onInputChange} inputs={inputs}
      disableSubmit={disableSubmit}  // to disable submit button when required fields are not filled
      onBlur={onInputBlur}  // to handle blur event and update state when input loses focus
      onCancel={handleCancel}
      onSubmit={handleSubmit}/>
    </>
  )
}

export default App
