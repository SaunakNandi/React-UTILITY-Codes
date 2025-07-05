import React from 'react'

const TextField = ({label="",placeholder="",id="",value="",
    error="",disabled=false,readonly=false,type,name="",onChange,index,required,onBlur,categoryKey}) => {
    function handleChange(event)
    {
        onChange({id,index,value:event.target.value,type:'text',categoryKey})
    }

    function handleBlur(){
      onBlur({id,value:event.target.value,index,type,categoryKey})
    }
  return (
    <div className="">
      <label>{label}{required && <sup>*</sup>}</label>
      <input id={id} type='text' 
      disabled={disabled}
      readOnly={readonly}
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