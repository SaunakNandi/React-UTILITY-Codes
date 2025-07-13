import React, { useRef, useState } from 'react'

const Pagination = ({visibleSlots,currentPage=1,start=1,end,onPageChange}) => {
    const buttonRef=useRef([])
    function generatePagination(start,end,visibleSlots,currentPage)
    {
        let result=[]
        if(start+visibleSlots==end-1)
        {
            for(let i=start;i<=end;i++)
                result.push(i)
            return result
        }
        let middle=Math.floor(visibleSlots/2)
        let leftPointer=Math.max((currentPage-middle),start+1)
        let rightPointer=leftPointer+visibleSlots-1
        if(rightPointer>=end)
            rightPointer=end-1
        result=[start]
        if(leftPointer>start+1)
            result.push("...")
        if(rightPointer>=end-1) 
        {
            for(let i=leftPointer-(visibleSlots-(rightPointer-leftPointer+1));i<=rightPointer;i++)
                result.push(i)
        }
        else
        {
            for(let i=leftPointer;i<=rightPointer-1;i++)
                result.push(i)
            result.push("...")
        }
        result.push(end)
        // buttonRef.current[currentPage-1]?.focus()
        console.log("result ",result,currentPage)
        return result
    }
    const pagination=generatePagination(start,end,visibleSlots-1,currentPage)
  return (
    <div className='pagination'>
        <button onClick={()=>currentPage>start && onPageChange(currentPage-1)}>⬅️</button>
        {
            pagination.map((page,i)=>(
                <button className="page_no" onClick={()=>onPageChange(page)}
                ref={(el)=>buttonRef.current[page]=el}
                style={{border:`${currentPage==page?'2px solid green':''}`}}>
                    {page}
                </button>
            ))
        }
        <button onClick={()=>currentPage<end && onPageChange(currentPage+1)}>➡️</button>
    </div>
  )
}

export default Pagination