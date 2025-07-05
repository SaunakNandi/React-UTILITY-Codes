import { useState } from 'react' 
import './App.css'
import { FormWrapper_Array } from './components/FormWrapper_Array'

const Inputs={
  personal_details:{
    name:"Personal Details",
    inputs:[{
      type: "text",
      label: "Last Name",
      placeholder: "Enter your last name",
      value: "",
      id: "last_name",
      name: "last_name",
      error: "",
      disabled: false,
      readonly: false,
      required: false
    }]
  },
  contact_details:{
    name:'Contact Details',
    inputs:[
    {
      type: "text",
      label: "Email",
      placeholder: "Enter your email",
      value: "",
      id: "email",
      name: "email",
      error: "",
      disabled: false,
      readonly: false,
      required: true,
    },
    {
      type: "text",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      value: "",
      id: "phone",
      name: "phone",
      error: "",
      disabled: false,
      readonly: false,
      required: false
    },
    ]
  },
  extra:{
    name:"",
    inputs:[
      {
        type: "checkbox",
        label: "Accept Terms and Conditions",
        value: "accept_terms",
        id: "accept_terms",
        name: "accept_terms",
        error: "",
        disabled: false,
        readonly: false,
        checked: false,
        required: true
      }
    ]
  }
}
function App() {
  const [inputs, setInputs] = useState(structuredClone(Inputs))
  
  function onInputChange({id,index,value,checked,type,categoryKey}){
    const oldState=structuredClone(inputs)
    console.log(oldState[categoryKey].inputs,categoryKey,index)
    if(type=='checkbox')
      oldState[categoryKey].inputs[index].checked=checked
    else
      oldState[categoryKey].inputs[index].value=value
    setInputs(oldState)
  }

  function onInputBlur({id,index,value,checked,type,categoryKey})
  {
    const oldState=structuredClone(inputs)
    // console.log(value)
    if(type=='text')
    {
      if(value.length<3)
      {
        oldState[categoryKey].inputs[index].error=`Invalid Field ${oldState[categoryKey].inputs[index].label}`
      }
      else
        oldState[index].error=""
    }
    setInputs(oldState)
  }

  function handleCancel(){
    setInputs(structuredClone(Inputs))
  }

  function handleSubmit(){
    const param={}
    Object.keys(inputs).forEach((key)=>{
      inputs[key].inputs.forEach((input)=>{
        if(input.type=='checkbox')
        {
          if(input.checked) 
            param[input.name]=input.value
        }
        else
          param[input.name]=input.value
      })
    })
    console.log("param ",param)
  }

  function needToDisableSubmit(){
    let disable=false;
    // for(let input of inputs)
    // {
    //   if(input.required && !input.value)
    //   {
    //     disable=true;
    //     break
    //   }
    // }
    // disable=inputs.some(input=>!input.value)
    return disable
  }
  const disableSubmit=needToDisableSubmit(inputs)
  return (
    <>
      <FormWrapper_Array inputs={inputs} onInputChange={onInputChange} onInputBlur={onInputBlur} onCancel={handleCancel} onSubmit={handleSubmit} disableSubmit={disableSubmit}/>
    </>
  )
}

export default App
