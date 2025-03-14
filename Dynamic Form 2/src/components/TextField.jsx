import React from 'react'

const TextField = ({label="",placeholder="",id="",value="",error="",disabled=false,readonly=false,onChange,index,type,required,
  onBlur,categoryKey,description,name}) => {
    const handleChange=(event)=>{
      onChange({id,value:event.target.value,index,type,categoryKey})
    }
    function handleBlur(event){
      onBlur({id,value:event.target.value,index,type,categoryKey})
    }
  return (
    <div className="">
        <label htmlFor={id}>{label}{required && <sup style={{color:'red',marginRight:'5px'}}>*</sup>}</label>
   
        <input id={id} name={name} value={value} type="text" disabled={disabled} readOnly={readonly}
        onBlur={handleBlur} placeholder={placeholder} onChange={handleChange}/>
        { !! error && !!description && <span style={{color:'red'}}>{description}</span> }
        {/* {
          !!error && <span style={{color:'red'}}>{error}</span>
        } */}
    </div>
  )
}

export default TextField