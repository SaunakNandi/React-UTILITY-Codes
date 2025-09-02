import React from 'react'

const Control = ({dataLeft,dataRight,handleChange,shiftAllLeft,shiftAllRight,shiftSelectedRight,shiftSelectedLeft}) => {
  return (
    <div className="main">
        <div className="left">
            {
                dataLeft.map((item)=>{
                    return(
                        <label>
                            <input key={item.id} type="checkbox" checked={item.checked}
                            onChange={()=>handleChange("left",item.id)}
                             name={item.label}/>
                             {item.label}
                        </label>
                    )
                })
            }
        </div>
        <div className="control-panel">
            <button onClick={shiftAllLeft}>⏪</button>
            <button onClick={shiftSelectedLeft}>◀️</button>
            <button onClick={shiftSelectedRight}>▶️</button>
            <button onClick={shiftAllRight}>⏩</button>
        </div>
        <div className="right">
            {
                dataRight.map((item)=>{
                    return(
                        <label>
                            <input key={item.id} type="checkbox" checked={item.checked}
                            onChange={()=>handleChange("right",item.id)}
                            value={item.label} name={item.label}/>
                            {item.label}
                        </label>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Control