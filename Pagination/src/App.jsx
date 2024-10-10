import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products,setProducts]=useState([])
  const [page,setPage]=useState(1)

  const selectPage=(pageNo)=>{
    if(pageNo>=1 && pageNo<=products.length/10 && pageNo!==page)
    setPage(pageNo)
  }
  const fetchProducts=async()=>{
    const res=await fetch("https://dummyjson.com/products?limit=100")
    const data=await res.json()
    if(data && data.products)
      setProducts(data.products)
  }

  useEffect(()=>{
    fetchProducts()
  },[])
  return (
    <>
      <div className="App">
        {
          products.length>0 && (
            <div className="products">
              {
                products.slice(page*10-10,page*10).map((x)=>(
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
                className={page>1 ? "":"pagination__disable"}>⬅️</span>
              {
                [...Array(products.length/10)].map((_,i)=>(
                  <span key={i} onClick={()=>selectPage(i+1)}
                  className={page === i+1? "pagination__selected":""}>
                    {i+1}
                  </span>
                ))
              }
              <span onClick={()=>selectPage(page+1)}
                className={page<products.length/10 ? "":"pagination__disable"}>➡️</span>
            </div>
          )
        }
      </div>
    </>
  )
}

export default App
