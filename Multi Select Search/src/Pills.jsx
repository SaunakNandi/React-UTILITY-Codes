import React from 'react'
import './App.css'
const Pills = ({image,text,onClick}) => {
  console.log("Called")
  return (
    <span className='user-pill' onClick={onClick}>
        <img src={image} alt={text}/>
        <span>{text} &times;</span>
    </span>
  )
}

export default Pills