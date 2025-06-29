import React from 'react'

const TextField = ({label="",placeholder="",id="",value="",
    error="",disabled=false,readonly=false,type,name="",onChange,index,required,onBlur}) => {
    function handleChange(event)
    {
        onChange({id,index,value:event.target.value,type:'text'})
    }

    function handleBlur(){
      onBlur({id,value:event.target.value,index,type})
    }
  return (
    <div className="">
      <label>{label}{required && <sup>*</sup>}</label>
      <input id={id} type='text' 
      disabled={disabled}
      readonly={readonly}
      value={value}
      name={name}
      onBlur={handleBlur}
      placeholder={placeholder}
      onChange={handleChange}/>
      {
        !!error && <span style={{color:'red'}}>{error}</span>
      }
    </div>
  )
}

export default TextField