import React, { useState } from 'react'

const InfiniteScrollDomApi = () => {
    const [data,setData]=useState([...new Array(40)])
    const [loading,setLoading]=useState(false)
    const threshold = 30 // bellow whih we will call loadMore()
    function handleScroll(event)
    {
        const scrollTop=event.target.scrollTop
        const clientHeight=event.target.clientHeight
        const scrollHeight=event.target.scrollHeight  //Total scrollable height
        const remainingScroll=scrollHeight-(scrollTop+clientHeight)
        if(remainingScroll < threshold && !loading) loadMore()
    }
    function loadMore(){
        setLoading(true)
        setTimeout(()=>{
            setData(prev=> [...prev,...new Array(10)])
            setLoading(false)
        },1000)
    }
  return (
    <div className='scroll-dom-api' onScroll={handleScroll}>
        {
            data.map((_,i)=>(
                <div className="row" key={i}>
                    {i + 1}
                </div>
            ))
        }
    </div>
  )
}

export default InfiniteScrollDomApi