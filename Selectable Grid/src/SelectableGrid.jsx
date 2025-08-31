import React, { useState } from 'react'

const SelectableGrid = ({row=15,column=15}) => {

    const [isMouseDown,setIsMouseDown]=useState(false)
    const [selectedBoxes,setSelectedBoxes]=useState([])

    const handleMouseUp=(boxNumber)=>{
        setIsMouseDown(false)
    }
    const handleMouseDown=(boxNumber)=>{
        setIsMouseDown(true)
        setSelectedBoxes([boxNumber])
    }
    const handleMouseEnter=(boxNumber)=>{
        if(isMouseDown)
        {
            const startBox=selectedBoxes[0]
            const endBox=boxNumber
            const startRow=Math.floor((startBox-1)/column)
            const startCol=(startBox-1)%column
            const endRow=Math.floor((endBox-1)/column)
            const endCol=(endBox-1)%column

            const selected=[]
            for(let i=startRow;i<=endRow;i++)
            {
                for(let j=startCol;j<=endCol;j++)
                    selected.push(i*column+j+1)
            }
            console.log(selected)
            setSelectedBoxes(selected)
        }
    }
  return (
    <div className="grid" style={{"--row":row,"--col":column}}
    onMouseUp={handleMouseUp}>
        {
            [...Array(row*column).keys()].map((x,i)=>{
                return (<div key={x}
                className={`box ${selectedBoxes.includes(i+1)?"selected":''}`}
                onMouseDown={()=>handleMouseDown(i+1)}
                onMouseEnter={()=>handleMouseEnter(i+1)}>{i+1}</div>)
            })
        }
    </div>
  )
}

export default SelectableGrid