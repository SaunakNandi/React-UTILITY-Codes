import React from 'react'

const TextField = ({label="",placeholder="",id="",value="",error="",disabled=false,readonly=false,onChange,index,type,required,
  onBlur
}) => {
    const handleChange=(event)=>{
        onChange({id,value:event.target.value,index,type})
    }
    function handleBlur(event){
      onBlur({id,value:event.target.value,index,type})
    }
  return (
    <div className="">
        <label htmlFor={id}>{label}{required && <sup>*</sup>}</label>
        {/* disabled={disabled} readOnly={readonly} causing problem */}
        <input id={id} name={name} value={value} type="text" disabled={disabled} readOnly={readonly}
        onBlur={handleBlur}
        placeholder={'placeholder'} onChange={handleChange}/>
        {
          !!error && <span style={{color:'red'}}>{error}</span>
        }
    </div>
  )
}

export default TextField