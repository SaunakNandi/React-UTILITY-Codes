import { useEffect, useState } from 'react'
import './App.css'

function AppNew() {
  const [products,setProducts]=useState([])
  const [page,setPage]=useState(1)
  const [totalPages,setTotalPages]=useState(0)
  const [cachedData,setCachedData]=useState({})

  const selectPage=(pageNo)=>{
    if(pageNo>=1 && pageNo<=totalPages && pageNo!==page)
      setPage(pageNo)
  }
  const fetchProducts=async()=>{
    // const res=await fetch("https://dummyjson.com/products?limit=100")
    if(cachedData[page])
    {
        console.log("Cached")
        setProducts(cachedData[page])
        return
    }
    const res=await fetch(`https://dummyjson.com/products?limit=20&skip=${page*10-10}`)
    const data=await res.json()
    if(data && data.products)
    {
      setProducts(data.products)
        // console.log(data.total)   // data.total=194
      setCachedData((prev)=>(
        {
          ...prev,
          [page]:data.products
        }
      ))
    }
    if(totalPages==0) setTotalPages((data.total+6) / 20)    // adding + 6 to make total pages to 200.  
  }

  useEffect(()=>{
    
    fetchProducts()
  },[page])
  return (
    <>
      <div className="App">
        {
          products.length>0 && (
            <div className="products">
              {
                products.map((x)=>(
                  <span className='products__single' key={x.id}>
                    <img src={x.thumbnail} alt={x.title} />
                    <span>{x.title}</span>
                  </span>
                ))
              }
            </div>
          )
        }
        {
            
          products.length>0 && (
            <div className="pagination">
              <span onClick={()=>selectPage(page-1)}
                className={page>1 ? "":"pagination__disable"}>`⬅️`</span>
              {
                [...Array(totalPages)].map((_,i)=>(
                  <span key={i} onClick={()=>selectPage(i+1)}
                  className={page === i+1? "pagination__selected":""}>
                    {i+1}
                  </span>
                ))
              }
              <span onClick={()=>selectPage(page+1)}
                className={page<totalPages ? "":"pagination__disable"}>➡️</span>
            </div>
          )
        }
      </div>
    </>
  )
}

export default AppNew
