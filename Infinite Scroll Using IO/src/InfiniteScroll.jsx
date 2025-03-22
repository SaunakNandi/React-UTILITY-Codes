import React, { useEffect, useState } from 'react'
import Post from './Post'

const InfiniteScroll = () => {
  const [data, setData] = useState([])
  const [pageNo,setPageNo] = useState(1)

  useEffect(()=>{
    fetch(`https://picsum.photos/v2/list?page=${pageNo}&limit=3`)
              .then((res)=>res.json())
              .then(data=>setData((prev)=>[...prev,...data]))
  },[pageNo])
  return (
    <Post data={data} setPageNo={setPageNo}/>
  )
}

export default InfiniteScroll