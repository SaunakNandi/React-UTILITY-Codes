import React, { useState } from 'react'

export const Tabs = ({tabsData,onChange}) => {
    const [currentTabIndex,setCurrentTabIndex]=useState(0)
  return (
    <div className='tabs'>
        <div className="tabs_container">
            {tabsData.map((x,i)=>(
                <button className={`${currentTabIndex===i? 'active':''}`} key={i}
                onClick={()=>{
                    setCurrentTabIndex(i)
                    onChange(i)
                }}>{x.label}</button>
            ))}
        </div>
        <div className="tabs_content">
            {
                tabsData[currentTabIndxex].content
            }
        </div>
    </div>
  )
}
