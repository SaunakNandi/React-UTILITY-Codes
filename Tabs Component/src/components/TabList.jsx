import React, { useState } from 'react'
import { Button } from './Button'

export const TabList = ({tabs}) => {
    const [activeIndex,setActiveIndex]=useState(0)
    const activeComponent=tabs[activeIndex]
    return (
        <>
            <div className="" style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                {
                    tabs.map((tab,index)=>(
                        <Button label={tab.label} onClick={()=>setActiveIndex(index)}
                        data-selected={index==activeIndex}/>
                    ))
                }
            </div>
                {
                    <activeComponent.Component/>
                }
        </>
    )
}
