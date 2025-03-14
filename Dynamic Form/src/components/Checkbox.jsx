import React, { useState } from 'react'

const Checkbox = ({label,id,error,name,value,checked,disabled=false,readonly=false,onChange,index,type}) => {
    
    const handleChange=()=>{
        console.log(value,checked,type)
        onChange({id,value,checked: !checked,index,type})
    }
    return (
        <div>
            {/* readOnly={readonly} disabled={disabled}  */}
            <input type='checkbox' name={name} value={value} checked={checked} id={id} 
            disabled={disabled} readOnly={readonly} onChange={handleChange}/>
            
            {
          !!error && <>
          <br/>
          <span style={{color:'red'}}>{error}</span>
          </>
        }
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export default Checkbox