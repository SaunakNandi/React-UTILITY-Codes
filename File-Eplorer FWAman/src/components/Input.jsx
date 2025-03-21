import React, { useState } from 'react'

const Input = ({name="",id,submit,cancel}) => {
    const [value,setValue]=useState(name)
    const addHandle=()=>{
        submit(id,value)
        cancel()
    }
  return (
    <>
        <input value={value} onChange={(e)=>setValue(e.target.value)} type='text'/>
        <span onClick={addHandle}>✔️</span>
        <span onClick={cancel}>❌</span>
    </>
  )
}

export default Input