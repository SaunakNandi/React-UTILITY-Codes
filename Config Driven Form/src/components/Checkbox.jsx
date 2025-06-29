import React from 'react'

const Checkbox = ({label,id,error,readOnly,name,value,checked,disabled,onChange,index}) => {
    function handleChange()
    {
        onChange({id,index,value,checked:!checked,type:'checkbox'})
    }
    
  return (
    <div>
        <input id={id} readOnly={readOnly} type="checkbox" name={name} value={value} disabled={disabled} checked={checked} onChange={handleChange}/>
        <label htmlFor={id}>{label}</label>
        {
            !!error && (
            <>
                <br/>
                <span style={{color:'red'}}>{error}</span>
            </>
            )
        }
    </div>
  )
} 

export default Checkbox