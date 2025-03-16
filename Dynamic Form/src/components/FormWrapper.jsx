import React from 'react'
import TextField from './TextField'
import Checkbox from './Checkbox'

const FormWrapper = ({disableSubmit,inputs,onInputChange,onCancel, onSubmit, onBlur}) => {
  function handleSubmit(e){
    e.preventDefault()
    onSubmit()
  }

  console.log({...inputs})
  return (
    <form className='form-wrapper' onSubmit={handleSubmit}>
    {
        inputs.map((input,index)=>{
            if(input.type==='checkbox')
            {
                // {...input} sending everything at once
                return <Checkbox index={index} onChange={onInputChange} key={input.id} 
                        {...input}/> 
            }
            return <TextField index={index} onBlur={onBlur} onChange={onInputChange} key={input.id} {...input}/>
        })
    }
    <div className="">
      <button type='reset' onClick={onCancel}>Cancel</button>
      <button className='success' type='submit' disabled={disableSubmit}>Submit</button>
    </div>
    </form>
  )
}

export default FormWrapper