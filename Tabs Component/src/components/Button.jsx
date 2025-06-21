import React from 'react'

export const Button = ({label,onClick=()=>{},...rest}) => {
  return (
    <div className="">
        <button onClick={onClick} {...rest}>{label}</button>
    </div>
  )
}
