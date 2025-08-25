import React, { useState } from 'react'

const Item = React.memo(({todo,handleComplete,handleDelete,handleUpdate}) => {
    const [isEditting,setIsEditting]=useState(false)
    const [updateValue,setUpdateValue]=useState(todo.value)
    return (
        <div className="">
            {
                isEditting? <input type='text' value={updateValue} 
                onChange={(e)=>setUpdateValue(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key=='Enter'){
                        handleUpdate(todo.id,updateValue)
                        setIsEditting(false)
                    }
                }}/> : <span style={{ textDecoration: `${todo.isCompleted ? 'line-through' : 'none'}` }}>{todo.value}</span>
            }
            <span style={{ marginRight: '0.5rem' }}
                onClick={() => handleComplete(todo.id)}>✔️</span>
            <span onClick={() => handleDelete(todo.id)}>❌</span>
            { !isEditting && <span onClick={() => setIsEditting(true)} >✍🏼</span>}
        </div>
    )
})

export default Item