import React, { useEffect } from 'react'

const Post = ({data,setPageNo}) => {
    useEffect(()=>{
        const lastImage=document.querySelector('.image-post:last-child')
        // console.log(lastImage)
        if(!lastImage) return
        const observer=new IntersectionObserver((param)=>{
            console.log("param ",param)
            if(param[0].isIntersecting)  // will be called when the last child is intersect or come into view
            {
                observer.unobserve(lastImage)
                setPageNo(prev=>prev+1)
            }
        }, //{threshold:0.5}
        ) // threshold optional. (0.5) means if the lastImage comes 50% in the view make param[0].isIntersecting = true
        observer.observe(lastImage)  // keeping an eye on lastImage

        // cleanup
        return ()=>{
            if(lastImage)
            {
                observer.unobserve(lastImage)
            }
            observer.disconnect()
        }
    },[data])
  return (
    <div className='container'>
        {
            data.map((item,i)=>(
                <img className='image-post' src={item.download_url} alt="" key={item.id}/>
            ))
        }
    </div>
  )
}

export default Post