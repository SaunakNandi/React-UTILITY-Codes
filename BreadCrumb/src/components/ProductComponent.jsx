import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductComponent({products}) {
  return (
    <>
        <div className='product-grid'>
        {
            products.map((prod)=>(
                <Link className="product-card" key={prod.id} to={`/products/${prod.id}`}>
                <img src={prod.images} alt="" />
                <p>{prod.title}</p>
                </Link>
            ))
        }
        </div>
    </>
  )
}
