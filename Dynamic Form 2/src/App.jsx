import { useState } from 'react'
import './App.css'
import FormWrapper from './components/FormWrapper'

// Reffer- https://www.youtube.com/watch?v=xoli56RLn5c&list=PLQOMi2yb4hF2F4G_pA8fHSupjDG92CuU7&index=20
function App() {
  const Categories= {
    personal_details:{
      name: 'Personal details',
      inputs:[
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
            description: "should be greater than 3 characters",
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
            disabled:false,
        },
      ]
    },
    contact_details:{
      name: 'Contact details',
      inputs:[
        {
            type:'text',
            label:'Email',
            placeholder:'Enter your email id',
            value:'',
            id:'email',
            name:'email',
            error:'',
            readonly:false,
            disabled:false,
            required:true,
            description: "should be in correct email format",
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
            disabled:false,
            required:true, 
            description: "should be in correct phone number format",
        },
      ]
    },
    extra:{
      name:'',
      inputs:[
        {
          type:'checkbox',
          label:'Accept T&C',
          value:'accept_terms',
          id:'accept_terms',
          name:'accept_terms',
          error:'',
          readonly:false,
          disabled:false,
          checked: false,
      }
      ]
    }
  }
  const [inputs,setInputs]=useState(structuredClone(Categories)) // deep copy

  const onInputChange=({id,index,value,type,checked,categoryKey})=>{
    console.log(id,index,value,checked,type)
    const oldState=structuredClone(inputs)
    if(type==='checkbox')
    {
      console.log("Checked")
      oldState[categoryKey].inputs[index].checked=checked
    }
    else
    {
      oldState[categoryKey].inputs[index].value=value
    }
    oldState[categoryKey].inputs[index].error=""
    setInputs(oldState)
  }

  const onInputBlur=({id,index,value,type,checked,categoryKey})=>{
    // console.log("onInputBlur ",id,index,value,checked,type)
    const oldState=structuredClone(inputs)
    if(type==='text')
    {
      if(value.length<3)
        oldState[categoryKey].inputs[index].error=`Invalid Field ${oldState[categoryKey].inputs[index].label}`
    }
    setInputs(oldState)
  }

  const handleCancel=()=>{
    setInputs(structuredClone(inputs))
  }

  function handleSubmit(){
    const params={}
    console.log("Form submitted")
    // console.log(inputs)
    Object.keys(inputs).forEach(key=>{
      inputs[key].inputs.forEach((x)=>{
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
    })
    console.log(params)
  }

  return (
    <>
      <FormWrapper onInputChange={onInputChange} inputs={inputs}
      //disableSubmit={disableSubmit}  // to disable submit button when required fields are not filled
      onBlur={onInputBlur}  // to handle blur event and update state when input loses focus
      onCancel={handleCancel}
      onSubmit={handleSubmit}/>
    </>
  )
}

export default App
