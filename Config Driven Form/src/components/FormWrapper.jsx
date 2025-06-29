import React from 'react'
import TextField from './TextField'
import Checkbox from './Checkbox'

export const FormWrapper = ({inputs,onInputChange,onInputBlur,onCancel, onSubmit,disableSubmit}) => {
    function handleSubmit(e)
    {
        e.preventDefault()
        onSubmit()
    }
  return (
    <form className='form-wrapper' onSubmit={handleSubmit}>
    {
        inputs.map((item,i)=>{
            if(item.type=='checkbox')
                return <Checkbox key={item.id} {...item} index={i} onChange={onInputChange}/>
            return <TextField key={item.id} onBlur={onInputBlur} {...item} index={i}onChange={onInputChange}/>
        })
    }
        <div>
            <button onClick={onCancel}>Cancel</button>
            <button disabled={disableSubmit} type="submit" className='success'>Submit</button>
        </div>
    </form>
  )
}
