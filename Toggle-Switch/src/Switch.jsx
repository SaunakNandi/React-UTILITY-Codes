import React from 'react'

const Switch = ({isOn,setIsOn,label='Click'}) => {
  return (
    <div className='switch'>
        <label>
            <input type="checkbox" checked={isOn} onChange={()=>setIsOn(prev=>!prev)}/> 
            <span className='slider'></span>
            <span className='switch-label'>{label}</span>
        </label>
    </div>
  )
}

export default Switch